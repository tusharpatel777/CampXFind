// server/controllers/claimController.js
import asyncHandler from 'express-async-handler';
import Claim from '../models/Claim.js';
import Item from '../models/Item.js';
import Notification from '../models/Notification.js';
import User from '../models/User.js'; // Just for email later, no direct use here yet

// @desc    Create a new claim for a found item
// @route   POST /api/claims
// @access  Private (Requires authentication)
const createClaim = asyncHandler(async (req, res) => {
  const { found_item_id, proof_answer, lost_item_reported_by_claimer_id } = req.body;
  const claimer_id = req.user._id;

  // 1. Validate Found Item
  const foundItem = await Item.findById(found_item_id);
  if (!foundItem) {
    res.status(404);
    throw new Error('Found item not found.');
  }
  if (foundItem.type !== 'FOUND') {
    res.status(400);
    throw new Error('You can only claim items that are marked as "FOUND".');
  }
  if (foundItem.finder_id.toString() === claimer_id.toString()) {
    res.status(400);
    throw new Error('You cannot claim an item you reported as found.');
  }
  if (foundItem.status !== 'OPEN') {
    res.status(400);
    throw new Error(`This item is not available for claiming (status: ${foundItem.status}).`);
  }

  // 2. Check for existing PENDING claim by this user on this item
  const existingClaim = await Claim.findOne({
    found_item: found_item_id,
    claimer: claimer_id,
    status: 'PENDING',
  });
  if (existingClaim) {
    res.status(400);
    throw new Error('You already have a pending claim for this item.');
  }

  // 3. Create the claim
  const claim = await Claim.create({
    found_item: found_item_id,
    claimer: claimer_id,
    lost_item_reported_by_claimer: lost_item_reported_by_claimer_id || null,
    proof_answer,
    status: 'PENDING',
  });

  if (claim) {
    // 4. Update found item's status to PENDING_CLAIM
    foundItem.status = 'PENDING_CLAIM';
    await foundItem.save();

    // 5. Create a notification for the item's finder
    await Notification.create({
      user: foundItem.finder_id,
      item: foundItem._id, // The item being claimed
      matchItem: claim._id, // Reference to the claim itself
      type: 'CLAIM_REQUEST',
      message: `Someone has requested to claim your found item "${foundItem.title}". Review their claim.`,
      metadata: { claimId: claim._id, claimerName: req.user.name },
    });

    res.status(201).json({ message: 'Claim submitted successfully!', claim });
  } else {
    res.status(400);
    throw new Error('Invalid claim data');
  }
});


// @desc    Get all claims made by the logged-in user
// @route   GET /api/claims/my
// @access  Private (Requires authentication)
const getMyClaims = asyncHandler(async (req, res) => {
  const claims = await Claim.find({ claimer: req.user._id })
    .populate('found_item', 'title images type status proof_question') // Populate found item details
    .populate('lost_item_reported_by_claimer', 'title images type') // Populate optional lost item details
    .sort({ createdAt: -1 });

  res.json(claims);
});


const getClaimsOnMyFoundItems = asyncHandler(async (req, res) => {
  // Find all FOUND items owned by the current user
  const myFoundItems = await Item.find({ finder_id: req.user._id, type: 'FOUND' }).select('_id');
  const myFoundItemIds = myFoundItems.map(item => item._id);

  // Find claims associated with these items
  const claims = await Claim.find({ found_item: { $in: myFoundItemIds } })
    .populate('found_item', 'title images type status proof_question')
    .populate('claimer', 'name email karma_points') // Populate claimer's contact info and karma
    .populate('lost_item_reported_by_claimer', 'title images type')
    .sort({ createdAt: -1 });

  res.json(claims);
});


// @desc    Update the status of a claim (Approve/Reject)
// @route   PUT /api/claims/:id/status
// @access  Private (Only item finder can update status)
const updateClaimStatus = asyncHandler(async (req, res) => {
  const { status } = req.body; // Expected: 'APPROVED' or 'REJECTED'
  const claimId = req.params.id;
  const finder_id = req.user._id;

  const claim = await Claim.findById(claimId).populate('found_item', 'finder_id title');

  if (!claim) {
    res.status(404);
    throw new Error('Claim not found');
  }

  // Check if the logged-in user is the finder of the item being claimed
  if (claim.found_item.finder_id.toString() !== finder_id.toString()) {
    res.status(401);
    throw new Error('Not authorized to update this claim status');
  }

  // Ensure status update is valid
  if (!['APPROVED', 'REJECTED'].includes(status)) {
    res.status(400);
    throw new Error('Invalid status. Only "APPROVED" or "REJECTED" are allowed.');
  }
  if (claim.status !== 'PENDING') {
      res.status(400);
      throw new Error('Claim is no longer pending and cannot be updated.');
  }

  claim.status = status;
  await claim.save();

  // --- Handle Karma Points & Item Status Update ---
  const foundItem = await Item.findById(claim.found_item._id);

  if (status === 'APPROVED') {
    // Increment finder's karma points
    await User.findByIdAndUpdate(finder_id, { $inc: { karma_points: 10 } }, { new: true });
    console.log(`Karma points awarded to finder ${finder_id} for approving claim.`);

    // Mark item as CLAIMED/RESOLVED
    foundItem.status = 'CLAIMED'; // Or 'RESOLVED' if we consider it fully resolved on approval
    await foundItem.save();

    // Prevent other pending claims on this item if approved
    await Claim.updateMany(
        { found_item: claim.found_item._id, status: 'PENDING', _id: { $ne: claim._id } },
        { status: 'REJECTED', $set: { reason_rejected: 'Another claim was approved' } } // Optional: add reason field to claim
    );


    // Create notification for claimer (Claim Approved)
    await Notification.create({
      user: claim.claimer._id,
      item: claim.found_item._id,
      matchItem: claim._id, // Reference to the claim
      type: 'CLAIM_APPROVED',
      message: `Your claim for "${foundItem.title}" has been approved! Contact the finder to arrange handover.`,
      metadata: {
        claimId: claim._id,
        finderEmail: req.user.email, // Pass finder's email for direct contact
        finderName: req.user.name,
      },
    });
    console.log(`Notification (CLAIM_APPROVED) sent to claimer ${claim.claimer._id}`);

  } else if (status === 'REJECTED') {
    // If claim is rejected, and there are no other PENDING claims, set item back to OPEN
    const otherPendingClaims = await Claim.countDocuments({
        found_item: claim.found_item._id,
        status: 'PENDING',
        _id: { $ne: claim._id }
    });

    if (otherPendingClaims === 0) {
        foundItem.status = 'OPEN'; // No other pending claims, so item is open again
        await foundItem.save();
    }

    // Create notification for claimer (Claim Rejected)
    await Notification.create({
      user: claim.claimer._id,
      item: claim.found_item._id,
      matchItem: claim._id, // Reference to the claim
      type: 'CLAIM_REJECTED', // Add 'CLAIM_REJECTED' to Notification enum later
      message: `Your claim for "${foundItem.title}" has been rejected.`,
      metadata: { claimId: claim._id },
    });
    console.log(`Notification (CLAIM_REJECTED) sent to claimer ${claim.claimer._id}`);
  }

  res.json(claim);
});


const withdrawClaim = asyncHandler(async (req, res) => {
  const claimId = req.params.id;
  const claimer_id = req.user._id;

  const claim = await Claim.findById(claimId).populate('found_item', 'title status');

  if (!claim) {
    res.status(404);
    throw new Error('Claim not found');
  }

  // Check if the logged-in user is the actual claimer
  if (claim.claimer.toString() !== claimer_id.toString()) {
    res.status(401);
    throw new Error('Not authorized to withdraw this claim');
  }

  // Only allow withdrawal if the claim is PENDING
  if (claim.status !== 'PENDING') {
    res.status(400);
    throw new Error(`Cannot withdraw a claim with status: ${claim.status}. Only PENDING claims can be withdrawn.`);
  }

  claim.status = 'WITHDRAWN';
  await claim.save();

  // If the found item's status was PENDING_CLAIM and this was the only pending claim,
  // revert the item's status to OPEN.
  const foundItem = await Item.findById(claim.found_item._id);
  if (foundItem.status === 'PENDING_CLAIM') {
    const otherPendingClaims = await Claim.countDocuments({
      found_item: claim.found_item._id,
      status: 'PENDING',
      _id: { $ne: claim._id } // Exclude the current claim (which is now WITHDRAWN)
    });

    if (otherPendingClaims === 0) {
      foundItem.status = 'OPEN';
      await foundItem.save();
      console.log(`Item "${foundItem.title}" status reverted to OPEN after claim withdrawal.`);
    }
  }

  // Optional: Notify the finder that the claim has been withdrawn
  await Notification.create({
    user: foundItem.finder_id,
    item: foundItem._id,
    matchItem: claim._id,
    type: 'CLAIM_WITHDRAWN', // Needs to be added to Notification enum
    message: `A claim for your found item "${foundItem.title}" has been withdrawn by the claimer.`,
    metadata: { claimId: claim._id, claimerName: req.user.name },
  });
  console.log(`Notification (CLAIM_WITHDRAWN) sent to finder ${foundItem.finder_id}.`);


  res.json(claim);
});
 

export { createClaim, getMyClaims, getClaimsOnMyFoundItems, updateClaimStatus, withdrawClaim };
// export { createClaim, getMyClaims, getClaimsOnMyFoundItems, updateClaimStatus };
// export { createClaim, getMyClaims };
// server/utils/matchEngine.js
import Item from '../models/Item.js';
import Notification from '../models/Notification.js';
import { findPotentialMatches } from './geminiAI.js';
import User from '../models/User.js'; // To send emails (optional, will add Nodemailer later)

const MIN_CONFIDENCE_SCORE = 75; // Threshold for considering a match significant

const runProactiveMatching = async (newItemId) => {
  try {
    const newItem = await Item.findById(newItemId).populate('finder_id', 'email');
    if (!newItem) {
      console.error(`Match engine: New item with ID ${newItemId} not found.`);
      return;
    }

    console.log(`Match engine: Running proactive matching for new ${newItem.type} item: ${newItem.title}`);

    let targetItems = [];
    if (newItem.type === 'LOST') {
      // If a LOST item is posted, look for FOUND items
      targetItems = await Item.find({ type: 'FOUND', status: 'OPEN', _id: { $ne: newItemId } });
    } else if (newItem.type === 'FOUND') {
      // If a FOUND item is posted, look for LOST items
      targetItems = await Item.find({ type: 'LOST', status: 'OPEN', _id: { $ne: newItemId } });
    }

    for (const targetItem of targetItems) {
      // Basic filter: Check if categories are somewhat related (can be improved with Gemini)
      if (newItem.category !== targetItem.category &&
         !(newItem.category === 'Other' || targetItem.category === 'Other')) {
         // Skip if categories are explicitly different and not 'Other'
         continue;
      }

      // Use Gemini AI for semantic matching
      const matchResult = await findPotentialMatches(newItem.description, targetItem.description);
      console.log(`Match result for "${newItem.title}" vs "${targetItem.title}":`, matchResult);

      if (matchResult.isMatch && matchResult.confidenceScore >= MIN_CONFIDENCE_SCORE) {
        console.log(`Match found with ${matchResult.confidenceScore}% confidence between ${newItem.title} (${newItem.type}) and ${targetItem.title} (${targetItem.type})`);

        // Create notification for the owner of the LOST item
        let lostItem, foundItem;
        if (newItem.type === 'LOST') {
          lostItem = newItem;
          foundItem = targetItem;
        } else { // newItem.type === 'FOUND'
          lostItem = targetItem;
          foundItem = newItem;
        }

        // Notify the owner of the LOST item
        const notification = await Notification.create({
          user: lostItem.finder_id._id,
          item: lostItem._id,
          matchItem: foundItem._id,
          type: 'MATCH_FOUND',
          message: `Potential match found for your lost item "${lostItem.title}"! Check out this found item: "${foundItem.title}".`,
          metadata: {
            confidenceScore: matchResult.confidenceScore,
            reason: matchResult.reason,
          },
        });
        console.log(`Notification created for ${lostItem.finder_id.email} regarding "${lostItem.title}".`);

        // TODO: Implement actual email sending using Nodemailer here later
        // For now, console log it.
        // const userEmail = lostItem.finder_id.email;
        // sendEmail(userEmail, 'Potential Match for Your Lost Item', notification.message);
      }
    }
  } catch (error) {
    console.error('Error in runProactiveMatching:', error);
  }
};

export { runProactiveMatching };
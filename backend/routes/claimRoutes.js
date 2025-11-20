// // server/routes/claimRoutes.js
// import express from 'express';
// const router = express.Router();
// import { createClaim, getMyClaims } from '../controllers/claimController.js';
// import { protect } from '../middleware/authMiddleware.js';

// router.route('/')
//   .post(protect, createClaim); // Submit a new claim

// router.route('/my')
//   .get(protect, getMyClaims); // Get claims made by the current user

// export default router;
// server/routes/claimRoutes.js
import express from 'express';
const router = express.Router();
import {
  createClaim,
  getMyClaims,
  getClaimsOnMyFoundItems, // Import new functions
  updateClaimStatus, // Import new functions
  withdrawClaim
} from '../controllers/claimController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/')
  .post(protect, createClaim); // Submit a new claim

router.route('/my')
  .get(protect, getMyClaims); // Get claims made by the current user

router.route('/on-my-items') // New route for finder to see claims on their items
  .get(protect, getClaimsOnMyFoundItems);

router.route('/:id/status') // New route to update a claim's status
  .put(protect, updateClaimStatus);


router.route('/:id/withdraw') // New route to withdraw a claim
  .put(protect, withdrawClaim);
export default router;
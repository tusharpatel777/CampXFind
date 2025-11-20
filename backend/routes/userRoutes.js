// server/routes/userRoutes.js
import express from 'express';
const router = express.Router();
import { registerUser, loginUser, getUserProfile } from '../controllers/userController.js'; // Import getUserProfile
import { protect } from '../middleware/authMiddleware.js'; // Import protect middleware

router.post('/register', registerUser);
router.post('/login', loginUser);

// Profile routes (protected)
router.route('/profile')
  .get(protect, getUserProfile); // Protected route to get user's own profile

export default router;
// server/routes/notificationRoutes.js
import express from 'express';
const router = express.Router();
import { getMyNotifications, markNotificationAsRead } from '../controllers/notificationController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/')
  .get(protect, getMyNotifications); // Get notifications for logged-in user

router.route('/:id/read')
  .put(protect, markNotificationAsRead); // Mark specific notification as read

export default router;
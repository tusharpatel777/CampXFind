// server/models/Notification.js
import mongoose from 'mongoose';

const notificationSchema = mongoose.Schema({
  user: { // The user who should receive the notification
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  item: { // The item related to the notification (e.g., the lost item that found a match)
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true,
  },
  matchItem: { // The item that caused the match (e.g., the found item)
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
  },
   type: { // Type of notification
    type: String,
    required: true,
    enum: ['MATCH_FOUND', 'CLAIM_REQUEST', 'CLAIM_APPROVED', 'CLAIM_REJECTED','CLAIM_WITHDRAWN', 'NEW_FOUND_ITEM_NEARBY'], // Added CLAIM_REJECTED
  },
  message: {
    type: String,
    required: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
  metadata: { // Additional data pertinent to the notification
    type: Object,
  },
}, {
  timestamps: true,
});

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;
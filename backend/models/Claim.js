// server/models/Claim.js
import mongoose from 'mongoose';

const claimSchema = mongoose.Schema({
  found_item: { // The item that is being claimed (must be a 'FOUND' item)
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true,
  },
  claimer: { // The user who is making the claim
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // Optional: Reference to a 'LOST' item if the claimer reported it
  lost_item_reported_by_claimer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
  },
  proof_answer: { // The answer provided by the claimer to the finder's question
    type: String,
    required: true,
  },
  status: { // Status of the claim
    type: String,
    enum: ['PENDING', 'APPROVED', 'REJECTED', 'WITHDRAWN'],
    default: 'PENDING',
  },
  finder_contact_revealed: { // Flag to indicate if finder's contact was revealed to claimer
    type: Boolean,
    default: false,
  },
  // Optional: For internal chat/message ID once approved
  // chat_session_id: { type: String },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

// Ensure a user can only make one PENDING claim per item
claimSchema.index({ found_item: 1, claimer: 1 }, { unique: true, partialFilterExpression: { status: 'PENDING' } });


const Claim = mongoose.model('Claim', claimSchema);

export default Claim;
// // server/models/Item.js
// import mongoose from 'mongoose';

// const itemSchema = mongoose.Schema({
//   finder_id: { // The user who found and reported the item (or lost it)
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   type: { // Whether the item is LOST or FOUND
//     type: String,
//     enum: ['LOST', 'FOUND'],
//     required: true,
//   },
//   title: { // Short, AI-generated title, can be user edited
//     type: String,
//     required: true,
//     trim: true,
//   },
//   description: { // Detailed visual description, AI generated + user edited
//     type: String,
//     required: true,
//   },
//   category: { // AI-generated category
//     type: String,
//     required: true,
//   },
//   images: [{ // Array of image URLs and public_ids from Cloudinary
//     url: { type: String, required: true },
//     public_id: { type: String, required: true },
//     isBlurred: { type: Boolean, default: false } // To track if PII was blurred
//   }],
//   location: { // Geo-tagging and Campus Mapping
//     campus: {
//       type: String,
//       required: true,
//       enum: ['DTU', 'NSUT', 'IIIT', 'Other'] // Extend as needed
//     },
//     specific_spot: { // E.g., "Library Reading Room", "MicMac Canteen"
//       type: String,
//       required: true,
//     },
//   },
//   ai_metadata: { // Data extracted by Gemini AI
//     tags: [{ type: String }],
//     brand: String,
//     color: String,
//     has_PII: { type: Boolean, default: false }, // Flag if Gemini detected PII
//   },
//   status: { // Item lifecycle status
//     type: String,
//     enum: ['OPEN', 'CLAIMED', 'RESOLVED'],
//     default: 'OPEN',
//   },
// }, {
//   timestamps: true, // Adds createdAt and updatedAt fields
// });

// const Item = mongoose.model('Item', itemSchema);

// export default Item;
// server/models/Item.js
import mongoose from 'mongoose';

const itemSchema = mongoose.Schema({
  finder_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['LOST', 'FOUND'],
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  images: [{
    url: { type: String, required: true },
    public_id: { type: String, required: true },
    isBlurred: { type: Boolean, default: false }
  }],
  location: {
    campus: {
      type: String,
      required: true,
      enum: ['DTU', 'NSUT', 'IIIT', 'Other']
    },
    specific_spot: {
      type: String,
      required: true,
    },
  },
  proof_question: { // New field for the finder to set a question
    type: String,
    default: 'What is a unique feature or detail of this item?', // Default question
  },
  ai_metadata: {
    tags: [{ type: String }],
    brand: String,
    color: String,
    has_PII: { type: Boolean, default: false },
  },
  status: {
    type: String,
    enum: ['OPEN', 'PENDING_CLAIM', 'CLAIMED', 'RESOLVED'], // Added PENDING_CLAIM
    default: 'OPEN',
  },
}, {
  timestamps: true,
});

const Item = mongoose.model('Item', itemSchema);

export default Item;
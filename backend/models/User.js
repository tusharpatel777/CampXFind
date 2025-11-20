// server/models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^[a-zA-Z0-9._%+-]+@(dtu|nsut|iiit)\.ac\.in$/, 'Please use a valid college email from DTU, NSUT, or IIIT'] // Campus-Locked Auth
  },
  password: {
    type: String,
    required: true,
  },
  karma_points: {
    type: Number,
    default: 0,
  },
  items_reported: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }] // We'll add 'Item' model later
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

// --- Mongoose Middleware to Hash Password Before Saving ---
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next(); // If password is not modified, move to the next middleware/save operation
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// --- Method to Compare Entered Password with Hashed Password ---
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
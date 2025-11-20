// server/routes/itemRoutes.js
import express from 'express';
const router = express.Router();
import {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
  searchItems,
  getMyItems,
  analyzeAndUploadImage // Import new function
} from '../controllers/itemController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

// Routes for all items and creating a new item
router.route('/')
  .get(getItems)
  .post(protect, createItem); // We will remove image upload from here, images are pre-uploaded

// Semantic search route
router.get('/search', searchItems);

// Route to get items reported by the current user
router.route('/my')
  .get(protect, getMyItems);

// New route for AI analysis and image upload (temporary)
router.post('/analyze-image', protect, upload.array('images', 5), analyzeAndUploadImage);


// Routes for specific item by ID
router.route('/:id')
  .get(getItemById)
  .put(protect, updateItem) // Update won't handle image changes directly for simplicity
  .delete(protect, deleteItem);

export default router;
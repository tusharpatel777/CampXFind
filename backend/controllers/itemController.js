// // server/controllers/itemController.js
// import asyncHandler from 'express-async-handler';
// import Item from '../models/Item.js';
// import User from '../models/User.js'; // To update items_reported in User model

// // @desc    Create a new item (Lost or Found)
// // @route   POST /api/items
// // @access  Private (Requires authentication)
// const createItem = asyncHandler(async (req, res) => {
//   // req.user is available due to protect middleware
//   const { type, title, description, category, campus, specific_spot, ai_metadata } = req.body;

//   // req.files will contain the uploaded images from multer
//   const uploadedImages = req.files;

//   if (!uploadedImages || uploadedImages.length === 0) {
//     res.status(400);
//     throw new Error('Please upload at least one image for the item.');
//   }

//   // Format images for storage in MongoDB
//   const images = uploadedImages.map(file => ({
//     url: file.path, // Cloudinary provides `path` which is the URL
//     public_id: file.filename, // Cloudinary provides `filename` which is the public_id
//   }));

//   // Basic validation for required fields
//   if (!type || !title || !description || !category || !campus || !specific_spot) {
//     res.status(400);
//     throw new Error('Please provide all required fields: type, title, description, category, campus, specific_spot.');
//   }

//   const item = await Item.create({
//     finder_id: req.user._id, // User from auth middleware
//     type,
//     title,
//     description,
//     category,
//     images,
//     location: {
//       campus,
//       specific_spot,
//     },
//     ai_metadata: ai_metadata ? JSON.parse(ai_metadata) : {}, // Parse if AI metadata is sent as string
//   });

//   if (item) {
//     // Optional: Update the user's reported items array
//     await User.findByIdAndUpdate(req.user._id, {
//       $push: { items_reported: item._id }
//     }, { new: true, useFindAndModify: false });

//     res.status(201).json(item); // 201 Created
//   } else {
//     res.status(400);
//     throw new Error('Invalid item data provided');
//   }
// });

// export { createItem };
// server/controllers/itemController.js
// import asyncHandler from 'express-async-handler';
// import Item from '../models/Item.js';
// import User from '../models/User.js';
// import { cloudinary } from '../config/cloudinaryConfig.js'; // Import cloudinary instance
// import { analyzeImageWithGemini, analyzeSearchQueryWithGemini } from '../utils/geminiAI.js'; // Import new search utility
// import { runProactiveMatching } from '../utils/matchEngine.js'; // Import match engine

import asyncHandler from 'express-async-handler';
import Item from '../models/Item.js';
import User from '../models/User.js';
import { cloudinary } from '../config/cloudinaryConfig.js';
import { analyzeImageWithGemini, analyzeSearchQueryWithGemini, findPotentialMatches } from '../utils/geminiAI.js';
import { runProactiveMatching } from '../utils/matchEngine.js';
// @desc    Create a new item (Lost or Found)
// @route   POST /api/items
// @access  Private (Requires authentication)
// const createItem = asyncHandler(async (req, res) => {
//   // req.user is available due to protect middleware
//   const { type, title, description, category, campus, specific_spot, ai_metadata } = req.body;

//   // req.files will contain the uploaded images from multer
//   const uploadedImages = req.files;

//   if (!uploadedImages || uploadedImages.length === 0) {
//     res.status(400);
//     throw new Error('Please upload at least one image for the item.');
//   }

//   // Format images for storage in MongoDB
//   const images = uploadedImages.map(file => ({
//     url: file.path, // Cloudinary provides `path` which is the URL
//     public_id: file.filename, // Cloudinary provides `filename` which is the public_id
//   }));

//   // Basic validation for required fields
//   if (!type || !title || !description || !category || !campus || !specific_spot) {
//     res.status(400);
//     throw new Error('Please provide all required fields: type, title, description, category, campus, specific_spot.');
//   }

//   const item = await Item.create({
//     finder_id: req.user._id, // User from auth middleware
//     type,
//     title,
//     description,
//     category,
//     images,
//     location: {
//       campus,
//       specific_spot,
//     },
//     ai_metadata: ai_metadata ? JSON.parse(ai_metadata) : {}, // Parse if AI metadata is sent as string
//   });

//   if (item) {
//     // Optional: Update the user's reported items array
//     await User.findByIdAndUpdate(req.user._id, {
//       $push: { items_reported: item._id }
//     }, { new: true, useFindAndModify: false });

//     res.status(201).json(item); // 201 Created
//   } else {
//     res.status(400);
//     throw new Error('Invalid item data provided');
//   }
// });
// const createItem = asyncHandler(async (req, res) => {
//   // req.user is available due to protect middleware
//   const { type, title: userTitle, description: userDescription, category: userCategory, campus, specific_spot } = req.body;

//   // req.files will contain the uploaded images from multer
//   const uploadedFiles = req.files;

//   if (!uploadedFiles || uploadedFiles.length === 0) {
//     res.status(400);
//     throw new Error('Please upload at least one image for the item.');
//   }

//   // --- Gemini AI Analysis on the FIRST image (for auto-filling) ---
//   let aiAnalysisResult = {};
//   let finalImagesForDB = [];

//   try {
//     // We'll analyze the first uploaded image for generating initial metadata
//     // For production, you might analyze all, or pick the best one.
//     const primaryImageUrl = uploadedFiles[0].path; // Cloudinary URL of the first image
//     aiAnalysisResult = await analyzeImageWithGemini(primaryImageUrl);
//     console.log("Gemini AI Analysis Result:", aiAnalysisResult);

//     // Process images based on AI analysis
//     for (const file of uploadedFiles) {
//       let imageUrl = file.path;
//       let publicId = file.filename;
//       let isBlurred = false;

//       // If Gemini detected PII for the primary image, we'll apply blur to ALL images for safety
//       // Or, you could analyze each image individually if PII is per-image
//       if (aiAnalysisResult.has_PII) {
//         // Request a blurred version from Cloudinary
//         const blurredUrl = cloudinary.url(publicId, {
//           quality: "auto",
//           fetch_format: "auto",
//           transformation: [
//             { effect: "blur:1000" }, // Apply strong blur
//             { quality: "auto", fetch_format: "auto" } // Re-optimize after blur
//           ]
//         });
//         imageUrl = blurredUrl;
//         isBlurred = true;
//       }

//       finalImagesForDB.push({
//         url: imageUrl,
//         public_id: publicId,
//         isBlurred: isBlurred,
//       });
//     }

//   } catch (aiError) {
//     console.warn('Gemini AI analysis failed, proceeding with user-provided data:', aiError.message);
//     // Fallback: If AI fails, use dummy or user-provided AI metadata
//     aiAnalysisResult = {
//       tags: ['unknown'], brand: 'N/A', color: 'N/A', condition: 'Unknown', has_PII: false,
//       title: 'Unidentified Item', description: 'Could not automatically describe item.'
//     };

//     // If AI fails, still process images normally without blurring unless explicitly specified
//     for (const file of uploadedFiles) {
//       finalImagesForDB.push({
//         url: file.path,
//         public_id: file.filename,
//         isBlurred: false,
//       });
//     }
//   }

//   // --- Use AI-generated data, but allow user overrides ---
//   const finalTitle = userTitle || aiAnalysisResult.title;
//   const finalDescription = userDescription || aiAnalysisResult.description;
//   const finalCategory = userCategory || aiAnalysisResult.category;
//   const finalAiMetadata = {
//     tags: aiAnalysisResult.tags || [],
//     brand: aiAnalysisResult.brand || 'N/A',
//     color: aiAnalysisResult.color || 'N/A',
//     condition: aiAnalysisResult.condition || 'Unknown',
//     has_PII: aiAnalysisResult.has_PII || false,
//   };

//   // Basic validation for required fields (after AI and user input combined)
//   if (!type || !finalTitle || !finalDescription || !finalCategory || !campus || !specific_spot) {
//     res.status(400);
//     throw new Error('Please provide all required fields: type, title, description, category, campus, specific_spot.');
//   }


// //   const item = await Item.create({
// //     finder_id: req.user._id, // User from auth middleware
// //     type,
// //     title: finalTitle,
// //     description: finalDescription,
// //     category: finalCategory,
// //     images: finalImagesForDB,
// //     location: {
// //       campus,
// //       specific_spot,
// //     },
// //     ai_metadata: finalAiMetadata,
// //   });

// //   if (item) {
// //     // Optional: Update the user's reported items array
// //     await User.findByIdAndUpdate(req.user._id, {
// //       $push: { items_reported: item._id }
// //     }, { new: true, useFindAndModify: false });

// //     res.status(201).json(item); // 201 Created
// //   } else {
// //     res.status(400);
// //     throw new Error('Invalid item data provided');
// //   }
// const item = await Item.create({
//     finder_id: req.user._id,
//     type,
//     title: finalTitle,
//     description: finalDescription,
//     category: finalCategory,
//     images: finalImagesForDB,
//     location: {
//       campus,
//       specific_spot,
//     },
//     ai_metadata: finalAiMetadata,
//   });

//   if (item) {
//     // Optional: Update the user's reported items array
//     await User.findByIdAndUpdate(req.user._id, {
//       $push: { items_reported: item._id }
//     }, { new: true, useFindAndModify: false });

//     // --- Trigger proactive matching after item creation ---
//     runProactiveMatching(item._id);

//     res.status(201).json(item);
//   } else {
//     res.status(400);
//     throw new Error('Invalid item data provided');
//   }
// });
const createItem = asyncHandler(async (req, res) => {
  // req.user is available due to protect middleware
  const {
    type,
    title,
    description,
    category,
    campus,
    specific_spot,
    ai_metadata, // This will now come from frontend, based on AI suggestions + user edits
    images: frontendImages // Expecting an array of { url, public_id, isBlurred } from frontend
  } = req.body;


  if (!frontendImages || frontendImages.length === 0) {
    res.status(400);
    throw new Error('Image information is missing. Please upload images first.');
  }

  // Basic validation for required fields
  if (!type || !title || !description || !category || !campus || !specific_spot || !ai_metadata) {
    res.status(400);
    throw new Error('Please provide all required fields: type, title, description, category, campus, specific_spot, AI metadata, and image info.');
  }

  const item = await Item.create({
    finder_id: req.user._id, // User from auth middleware
    type,
    title,
    description,
    category,
    images: frontendImages, // Use the image info passed from the frontend
    location: {
      campus,
      specific_spot,
    },
    ai_metadata: ai_metadata, // Use the AI metadata (potentially user-edited) from the frontend
  });

  if (item) {
    // Optional: Update the user's reported items array
    await User.findByIdAndUpdate(req.user._id, {
      $push: { items_reported: item._id }
    }, { new: true, useFindAndModify: false });

    // --- Trigger proactive matching after item creation ---
    runProactiveMatching(item._id);

    res.status(201).json(item); // 201 Created
  } else {
    res.status(400);
    throw new Error('Invalid item data provided');
  }
});
// @desc    Fetch all items (Lost and Found)
// @route   GET /api/items
// @access  Public
const getItems = asyncHandler(async (req, res) => {
  // Add filtering, searching, pagination later if needed
  const items = await Item.find({}).populate('finder_id', 'name email'); // Populate finder's name and email
  res.json(items);
});

// @desc    Fetch single item by ID
// @route   GET /api/items/:id
// @access  Public
const getItemById = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id).populate('finder_id', 'name email');

  if (item) {
    res.json(item);
  } else {
    res.status(404);
    throw new Error('Item not found');
  }
});

// @desc    Update an item
// @route   PUT /api/items/:id
// @access  Private (Only finder can update)

const updateItem = asyncHandler(async (req, res) => {
  const {
    type,
    title,
    description,
    category,
    campus,
    specific_spot,
    ai_metadata,
    status,
    proof_question // Added proof_question
  } = req.body;
  const item = await Item.findById(req.params.id);

  if (item) {
    // Check if the logged-in user is the finder of the item
    if (item.finder_id.toString() !== req.user._id.toString()) {
      res.status(401); // Unauthorized
      throw new Error('Not authorized to update this item');
    }

    // Prevent updating item type once set (e.g., from FOUND to LOST)
    if (type && item.type !== type) {
      res.status(400);
      throw new Error('Item type cannot be changed after creation.');
    }

    // Only allow status change to RESOLVED if it's currently CLAIMED or PENDING_CLAIM
    if (status && status === 'RESOLVED' && !['CLAIMED', 'PENDING_CLAIM'].includes(item.status)) {
        res.status(400);
        throw new Error(`Item status can only be set to RESOLVED from CLAIMED or PENDING_CLAIM, current status: ${item.status}`);
    }
    // Also prevent changing status from APPROVED/REJECTED/WITHDRAWN back to OPEN manually
    if (status && ['APPROVED', 'REJECTED', 'WITHDRAWN'].includes(item.status) && status === 'OPEN') {
        res.status(400);
        throw new Error(`Cannot revert item status from ${item.status} to OPEN manually.`);
    }


    item.title = title || item.title;
    item.description = description || item.description;
    item.category = category || item.category;
    item.location.campus = campus || item.location.campus;
    item.location.specific_spot = specific_spot || item.location.specific_spot;
    item.status = status || item.status;
    item.proof_question = proof_question !== undefined ? proof_question : item.proof_question; // Update proof_question


    if (ai_metadata) {
      // Merge AI metadata to allow partial updates, or replace if full object is sent
      item.ai_metadata = { ...item.ai_metadata, ...ai_metadata };
    }

    // For simplicity, image updates are not handled via this PUT endpoint.
    // A dedicated image update route would be needed for that.

    const updatedItem = await item.save();
    res.json(updatedItem);

  } else {
    res.status(404);
    throw new Error('Item not found');
  }
});


// const updateItem = asyncHandler(async (req, res) => {
//   const { type, title, description, category, campus, specific_spot, ai_metadata, status } = req.body;
//   const item = await Item.findById(req.params.id);

//   if (item) {
//     // Check if the logged-in user is the finder of the item
//     if (item.finder_id.toString() !== req.user._id.toString()) {
//       res.status(401); // Unauthorized
//       throw new Error('Not authorized to update this item');
//     }

//     item.type = type || item.type;
//     item.title = title || item.title;
//     item.description = description || item.description;
//     item.category = category || item.category;
//     item.location.campus = campus || item.location.campus;
//     item.location.specific_spot = specific_spot || item.location.specific_spot;
//     item.status = status || item.status;

//     if (ai_metadata) {
//       item.ai_metadata = JSON.parse(ai_metadata);
//     }

//     // Handle image updates (if new images are uploaded, or existing ones are removed)
//     // For simplicity in this step, we'll assume image updates require a separate endpoint
//     // or a more complex form-data handling. For now, this update won't change images.

//     const updatedItem = await item.save();
//     res.json(updatedItem);

//   } else {
//     res.status(404);
//     throw new Error('Item not found');
//   }
// });

// @desc    Delete an item
// @route   DELETE /api/items/:id
// @access  Private (Only finder can delete)
const deleteItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (item) {
    // Check if the logged-in user is the finder of the item
    if (item.finder_id.toString() !== req.user._id.toString()) {
      res.status(401); // Unauthorized
      throw new Error('Not authorized to delete this item');
    }

    // Delete images from Cloudinary before deleting item from DB
    if (item.images && item.images.length > 0) {
      for (const image of item.images) {
        await cloudinary.uploader.destroy(image.public_id);
      }
    }

    // Optional: Remove item reference from the user's reported_items array
    await User.findByIdAndUpdate(item.finder_id, {
      $pull: { items_reported: item._id }
    });

    await Item.deleteOne({ _id: item._id }); // Use deleteOne() for Mongoose 6+
    res.json({ message: 'Item removed' });
  } else {
    res.status(404);
    throw new Error('Item not found');
  }
});

const searchItems = asyncHandler(async (req, res) => {
  const { query } = req.query; // Expecting query parameter like /api/items/search?query=red+nike+shoes

  if (!query) {
    res.status(400);
    throw new Error('Search query is required');
  }

  let geminiSearchInsights = {};
  try {
    geminiSearchInsights = await analyzeSearchQueryWithGemini(query);
    console.log("Gemini Search Insights:", geminiSearchInsights);
  } catch (aiError) {
    console.warn('Gemini AI failed for search query, using original query for basic search:', aiError.message);
    geminiSearchInsights = {
      originalQuery: query,
      keywords: [query], // Fallback to original query as keyword
      category: null,
      itemType: null,
      color: null,
      brand: null,
    };
  }

  // Build MongoDB query based on Gemini's insights
  const dbQuery = {
    $or: [
      { title: { $regex: query, $options: 'i' } }, // Always include original query for basic match
      { description: { $regex: query, $options: 'i' } },
    ]
  };

  // Add keywords from Gemini
  if (geminiSearchInsights.keywords && geminiSearchInsights.keywords.length > 0) {
    const keywordRegex = geminiSearchInsights.keywords.map(k => ({
      $or: [
        { 'ai_metadata.tags': { $regex: k, $options: 'i' } },
        { title: { $regex: k, $options: 'i' } },
        { description: { $regex: k, $options: 'i' } },
      ]
    }));
    dbQuery.$or.push(...keywordRegex);
  }

  // Add category filter
  if (geminiSearchInsights.category && geminiSearchInsights.category !== 'null') {
    dbQuery.category = geminiSearchInsights.category;
  }

  // Add item type filter
  if (geminiSearchInsights.itemType && geminiSearchInsights.itemType !== 'null') {
    dbQuery.type = geminiSearchInsights.itemType;
  }

  // Add brand filter
  if (geminiSearchInsights.brand && geminiSearchInsights.brand !== 'null') {
    dbQuery['ai_metadata.brand'] = { $regex: geminiSearchInsights.brand, $options: 'i' };
  }

  // Add color filter
  if (geminiSearchInsights.color && geminiSearchInsights.color !== 'null') {
    dbQuery['ai_metadata.color'] = { $regex: geminiSearchInsights.color, $options: 'i' };
  }

  // Fetch items from DB
  const items = await Item.find(dbQuery).populate('finder_id', 'name email');
  res.json(items);
});

const getMyItems = asyncHandler(async (req, res) => {
  // req.user._id is available from the protect middleware
  const myItems = await Item.find({ finder_id: req.user._id })
    .populate('finder_id', 'name email') // Populate finder details (optional here, as it's the current user)
    .sort({ createdAt: -1 }); // Sort by newest first
  res.json(myItems);
});

const analyzeAndUploadImage = asyncHandler(async (req, res) => {
  const uploadedFiles = req.files;

  if (!uploadedFiles || uploadedFiles.length === 0) {
    res.status(400);
    throw new Error('Please upload at least one image.');
  }

  let aiAnalysisResult = {};
  let tempImagesInfo = [];

  try {
    const primaryImageUrl = uploadedFiles[0].path;
    aiAnalysisResult = await analyzeImageWithGemini(primaryImageUrl);
    console.log("Gemini AI Analysis Result (for analyze-image endpoint):", aiAnalysisResult);

    for (const file of uploadedFiles) {
      let imageUrl = file.path;
      let publicId = file.filename;
      let isBlurred = false;

      if (aiAnalysisResult.has_PII) {
        const blurredUrl = cloudinary.url(publicId, {
          quality: "auto",
          fetch_format: "auto",
          transformation: [{ effect: "blur:1000" }, { quality: "auto", fetch_format: "auto" }]
        });
        imageUrl = blurredUrl;
        isBlurred = true;
      }

      tempImagesInfo.push({
        url: imageUrl,
        public_id: publicId,
        isBlurred: isBlurred,
      });
    }

    res.json({
      aiSuggestions: {
        title: aiAnalysisResult.title,
        description: aiAnalysisResult.description,
        category: aiAnalysisResult.category,
        brand: aiAnalysisResult.brand,
        color: aiAnalysisResult.color,
        condition: aiAnalysisResult.condition,
        tags: aiAnalysisResult.tags,
        has_PII: aiAnalysisResult.has_PII,
      },
      uploadedImages: tempImagesInfo,
    });

  } catch (aiError) {
    console.warn('Gemini AI analysis failed for /analyze-image, returning partial info:', aiError.message);
    // If AI fails, still return uploaded image info and a basic error
    res.status(200).json({
      aiSuggestions: {
        title: "Unidentified Item",
        description: "AI could not generate detailed description.",
        category: "Other",
        brand: "N/A", color: "N/A", condition: "Unknown", tags: ["unknown"], has_PII: false,
      },
      uploadedImages: uploadedFiles.map(file => ({
        url: file.path,
        public_id: file.filename,
        isBlurred: false,
      })),
      message: `AI analysis partially failed: ${aiError.message}. Please fill details manually.`,
    });
  }
});

export {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
  searchItems,
  getMyItems,
  analyzeAndUploadImage // Export the new function
};
// export { createItem, getItems, getItemById, updateItem, deleteItem, searchItems, getMyItems };
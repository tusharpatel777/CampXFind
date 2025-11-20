// // server/utils/geminiAI.js
// import { GoogleGenerativeAI } from '@google/generative-ai';
// import dotenv from 'dotenv';
// import axios from 'axios'; // To fetch image as buffer
// import mime from 'mime-types'; // To determine image MIME type

// dotenv.config();

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// // const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
// const visionModel = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
// const textModel = genAI.getGenerativeModel({ model: "gemini-pro" }); // For text analysis (search)

// // Helper function to fetch image from URL and convert to GoogleGenerativeMediaPart
// async function urlToGenerativePart(url) {
//   try {
//     const response = await axios.get(url, { responseType: 'arraybuffer' });
//     const mimeType = mime.lookup(url) || response.headers['content-type']; // Try to determine MIME type

//     if (!mimeType || !mimeType.startsWith('image/')) {
//         console.warn(`Could not determine valid image MIME type for URL: ${url}. Found: ${mimeType}`);
//         // Fallback to a common image type or throw error
//         throw new Error(`Invalid or unknown image MIME type for ${url}`);
//     }

//     return {
//       inlineData: {
//         data: Buffer.from(response.data).toString('base64'),
//         mimeType: mimeType,
//       },
//     };
//   } catch (error) {
//     console.error(`Error fetching or converting image from URL: ${url}`, error);
//     throw new Error(`Failed to process image from URL: ${error.message}`);
//   }
// }


// // Function to analyze an image using Gemini Vision model
// const analyzeImageWithGemini = async (imageUrl) => {
//   try {
//     const imagePart = await urlToGenerativePart(imageUrl);

//     // The Gemini 2.5 Flash "Vision" Prompt from your blueprint
//     const prompt = `You are an AI assistant for the 'FindIt' application at DTU. Analyze the uploaded image of the found item.
//     Identify the item category (Electronics, Stationary, Clothing, ID/Docs, Keys, Other).
//     Extract key visual details: Brand, Color, Condition (e.g., scratched, new), and distinctive features.
//     Safety Check: Analyze if the image contains Personally Identifiable Information (PII) such as phone numbers, Aadhar numbers, Student Roll Numbers, QR codes that might link to PII, or clear images of faces that could be tied to an ID. Be very strict about PII detection.
    
//     Output Format: Return strictly a JSON object:
//     { "title": "Short Title (e.g., Red Nike T-Shirt, Black Wallet)", "description": "Detailed visual description (e.g., 'A red Nike t-shirt, size M, slightly faded, with a small tear on the left sleeve.', 'A black leather wallet, worn, with an embossed logo, containing a few cards visible but illegible.')", "category": "CategoryString", "tags": ["tag1", "tag2"], "brand": "BrandName or N/A", "color": "MainColor", "condition": "ConditionText (e.g., new, used, scratched, torn)", "has_PII": boolean }`;

//     const result = await model.generateContent([prompt, imagePart]);
//     const response = await result.response;
//     const text = response.text();

//     // Attempt to parse the JSON output from Gemini
//     let geminiOutput;
//     try {
//       // Gemini sometimes includes markdown fences (```json...```)
//       const jsonString = text.replace(/```json\n|\n```/g, '');
//       geminiOutput = JSON.parse(jsonString);
//     } catch (jsonParseError) {
//       console.error("Failed to parse Gemini JSON output, attempting regex fallback:", jsonParseError);
//       console.log("Raw Gemini text output:", text);

//       // Fallback parsing for common fields if JSON fails
//       const fallbackData = {
//           title: text.match(/"title":\s*"(.*?)"/)?.[1] || "Unidentified Item",
//           description: text.match(/"description":\s*"(.*?)"/)?.[1] || "Could not generate detailed description.",
//           category: text.match(/"category":\s*"(.*?)"/)?.[1] || "Other",
//           tags: text.match(/"tags":\s*\[(.*?)\]/)?.[1]?.split(',').map(tag => tag.trim().replace(/"/g, '')) || [],
//           brand: text.match(/"brand":\s*"(.*?)"/)?.[1] || "N/A",
//           color: text.match(/"color":\s*"(.*?)"/)?.[1] || "N/A",
//           condition: text.match(/"condition":\s*"(.*?)"/)?.[1] || "Unknown",
//           has_PII: text.includes('"has_PII": true') || false, // Simple check for PII
//       };
//       geminiOutput = fallbackData;
//     }

//     return geminiOutput;

//   } catch (error) {
//     console.error('Error calling Gemini API:', error);
//     throw new Error(`Gemini AI analysis failed: ${error.message}`);
//   }
// };

// const analyzeSearchQueryWithGemini = async (query) => {
//   try {
//     const prompt = `You are an AI assistant for a lost and found application. A user has provided a search query. Your task is to extract key entities, categories, and potential synonyms or related terms from this query to facilitate a comprehensive search. Also, identify if the user is looking for a 'LOST' or 'FOUND' item if explicitly mentioned.

//     User query: "${query}"

//     Output Format: Return strictly a JSON object:
//     {
//       "originalQuery": "User query",
//       "keywords": ["keyword1", "keyword2", "synonym1"],
//       "category": "SuggestedCategory (e.g., Electronics, Stationary, Clothing, ID/Docs, Keys, Other, or null if not clear)",
//       "itemType": "LOST or FOUND or null if not specified",
//       "color": "DetectedColor or null",
//       "brand": "DetectedBrand or null"
//     }`;

//     const result = await textModel.generateContent(prompt);
//     const response = await result.response;
//     const text = response.text();

//     let geminiOutput;
//     try {
//       const jsonString = text.replace(/```json\n|\n```/g, '');
//       geminiOutput = JSON.parse(jsonString);
//     } catch (jsonParseError) {
//       console.error("Failed to parse Gemini JSON output for search query, attempting regex fallback:", jsonParseError);
//       console.log("Raw Gemini search text output:", text);
//       // Fallback parsing for common fields if JSON fails
//       geminiOutput = {
//         originalQuery: query,
//         keywords: text.match(/"keywords":\s*\[(.*?)\]/)?.[1]?.split(',').map(tag => tag.trim().replace(/"/g, '')) || [query],
//         category: text.match(/"category":\s*"(.*?)"/)?.[1] || null,
//         itemType: text.match(/"itemType":\s*"(.*?)"/)?.[1] || null,
//         color: text.match(/"color":\s*"(.*?)"/)?.[1] || null,
//         brand: text.match(/"brand":\s*"(.*?)"/)?.[1] || null,
//       };
//     }

//     return geminiOutput;

//   } catch (error) {
//     console.error('Error calling Gemini API for search query:', error);
//     throw new Error(`Gemini AI search analysis failed: ${error.message}`);
//   }
// };


// export { analyzeImageWithGemini, analyzeSearchQueryWithGemini };

// // export { analyzeImageWithGemini };
// server/utils/geminiAI.js
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import axios from 'axios';
import mime from 'mime-types';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Using gemini-2.5-flash for both vision and text tasks as requested
const geminiFlashModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });


// Helper function to fetch image from URL and convert to GoogleGenerativeMediaPart
async function urlToGenerativePart(url) {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const mimeType = mime.lookup(url) || response.headers['content-type'];

    if (!mimeType || !mimeType.startsWith('image/')) {
        console.warn(`Could not determine valid image MIME type for URL: ${url}. Found: ${mimeType}`);
        throw new Error(`Invalid or unknown image MIME type for ${url}`);
    }

    return {
      inlineData: {
        data: Buffer.from(response.data).toString('base64'),
        mimeType: mimeType,
      },
    };
  } catch (error) {
    console.error(`Error fetching or converting image from URL: ${url}`, error);
    throw new Error(`Failed to process image from URL: ${error.message}`);
  }
}


// Function to analyze an image using Gemini Vision model
const analyzeImageWithGemini = async (imageUrl) => {
  try {
    const imagePart = await urlToGenerativePart(imageUrl);

    const prompt = `You are an AI assistant for the 'FindIt' application at DTU. Analyze the uploaded image of the found item.
    Identify the item category (Electronics, Stationary, Clothing, ID/Docs, Keys, Other).
    Extract key visual details: Brand, Color, Condition (e.g., scratched, new), and distinctive features.
    Safety Check: Analyze if the image contains Personally Identifiable Information (PII) such as phone numbers, Aadhar numbers, Student Roll Numbers, QR codes that might link to PII, or clear images of faces that could be tied to an ID. Be very strict about PII detection.
    
    Output Format: Return strictly a JSON object:
    { "title": "Short Title (e.g., Red Nike T-Shirt, Black Wallet)", "description": "Detailed visual description (e.g., 'A red Nike t-shirt, size M, slightly faded, with a small tear on the left sleeve.', 'A black leather wallet, worn, with an embossed logo, containing a few cards visible but illegible.')", "category": "CategoryString", "tags": ["tag1", "tag2"], "brand": "BrandName or N/A", "color": "MainColor", "condition": "ConditionText (e.g., new, used, scratched, torn)", "has_PII": boolean }`;

    // Use geminiFlashModel for vision tasks
    const result = await geminiFlashModel.generateContent([prompt, imagePart]);
    const response = await result.response;
    const text = response.text();

    let geminiOutput;
    try {
      const jsonString = text.replace(/```json\n|\n```/g, '');
      geminiOutput = JSON.parse(jsonString);
    } catch (jsonParseError) {
      console.error("Failed to parse Gemini JSON output, attempting regex fallback:", jsonParseError);
      console.log("Raw Gemini text output:", text);

      const fallbackData = {
          title: text.match(/"title":\s*"(.*?)"/)?.[1] || "Unidentified Item",
          description: text.match(/"description":\s*"(.*?)"/)?.[1] || "Could not generate detailed description.",
          category: text.match(/"category":\s*"(.*?)"/)?.[1] || "Other",
          tags: text.match(/"tags":\s*\[(.*?)\]/)?.[1]?.split(',').map(tag => tag.trim().replace(/"/g, '')) || [],
          brand: text.match(/"brand":\s*"(.*?)"/)?.[1] || "N/A",
          color: text.match(/"color":\s*"(.*?)"/)?.[1] || "N/A",
          condition: text.match(/"condition":\s*"(.*?)"/)?.[1] || "Unknown",
          has_PII: text.includes('"has_PII": true') || false,
      };
      geminiOutput = fallbackData;
    }

    return geminiOutput;

  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw new Error(`Gemini AI analysis failed: ${error.message}`);
  }
};


// Function to process search query using Gemini Flash model
const analyzeSearchQueryWithGemini = async (query) => {
  try {
    const prompt = `You are an AI assistant for a lost and found application. A user has provided a search query. Your task is to extract key entities, categories, and potential synonyms or related terms from this query to facilitate a comprehensive search. Also, identify if the user is looking for a 'LOST' or 'FOUND' item if explicitly mentioned.

    User query: "${query}"

    Output Format: Return strictly a JSON object:
    {
      "originalQuery": "User query",
      "keywords": ["keyword1", "keyword2", "synonym1"],
      "category": "SuggestedCategory (e.g., Electronics, Stationary, Clothing, ID/Docs, Keys, Other, or null if not clear)",
      "itemType": "LOST or FOUND or null if not specified",
      "color": "DetectedColor or null",
      "brand": "DetectedBrand or null"
    }`;

    // Use geminiFlashModel for text tasks
    const result = await geminiFlashModel.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    let geminiOutput;
    try {
      const jsonString = text.replace(/```json\n|\n```/g, '');
      geminiOutput = JSON.parse(jsonString);
    } catch (jsonParseError) {
      console.error("Failed to parse Gemini JSON output for search query, attempting regex fallback:", jsonParseError);
      console.log("Raw Gemini search text output:", text);
      geminiOutput = {
        originalQuery: query,
        keywords: text.match(/"keywords":\s*\[(.*?)\]/)?.[1]?.split(',').map(tag => tag.trim().replace(/"/g, '')) || [query],
        category: text.match(/"category":\s*"(.*?)"/)?.[1] || null,
        itemType: text.match(/"itemType":\s*"(.*?)"/)?.[1] || null,
        color: text.match(/"color":\s*"(.*?)"/)?.[1] || null,
        brand: text.match(/"brand":\s*"(.*?)"/)?.[1] || null,
      };
    }

    return geminiOutput;

  } catch (error) {
    console.error('Error calling Gemini API for search query:', error);
    throw new Error(`Gemini AI search analysis failed: ${error.message}`);
  }
};


const findPotentialMatches = async (lostItemDescription, foundItemDescription) => {
  try {
    const prompt = `You are an AI assistant tasked with matching lost and found items for a campus application.
    You need to compare two item descriptions and determine if they describe the same or a highly similar item.
    Consider categories, brands, colors, distinctive features, and general context.
    Provide a confidence score (0-100) and a brief reason.

    Lost Item Description: "${lostItemDescription}"
    Found Item Description: "${foundItemDescription}"

    Output Format: Return strictly a JSON object:
    { "isMatch": boolean, "confidenceScore": number (0-100), "reason": "string explaining the match or mismatch" }`;

    const result = await geminiFlashModel.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    let geminiOutput;
    try {
      const jsonString = text.replace(/```json\n|\n```/g, '');
      geminiOutput = JSON.parse(jsonString);
    } catch (jsonParseError) {
      console.error("Failed to parse Gemini JSON output for matching, attempting fallback:", jsonParseError);
      console.log("Raw Gemini matching text output:", text);
      // Fallback if parsing fails
      geminiOutput = {
        isMatch: false,
        confidenceScore: 0,
        reason: "AI matching failed to parse output, cannot determine match."
      };
    }

    return geminiOutput;

  } catch (error) {
    console.error('Error calling Gemini API for matching:', error);
    throw new Error(`Gemini AI matching failed: ${error.message}`);
  }
};


export { analyzeImageWithGemini, analyzeSearchQueryWithGemini, findPotentialMatches};
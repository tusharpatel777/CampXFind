// // // // // // // client/src/pages/ItemDetailPage.jsx
// // // // // // import React, { useEffect, useState } from 'react';
// // // // // // import axios from 'axios';
// // // // // // import { useParams, useNavigate } from 'react-router-dom';
// // // // // // import { useAuth } from '../context/AuthContext';

// // // // // // const ItemDetailPage = () => {
// // // // // //   const { id } = useParams(); // Get item ID from URL
// // // // // //   const navigate = useNavigate();
// // // // // //   const [item, setItem] = useState(null);
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const [error, setError] = useState('');
// // // // // //   const { user, API_BASE_URL } = useAuth(); // Get logged-in user and API_BASE_URL

// // // // // //   useEffect(() => {
// // // // // //     const fetchItem = async () => {
// // // // // //       try {
// // // // // //         const { data } = await axios.get(`${API_BASE_URL}/items/${id}`);
// // // // // //         setItem(data);
// // // // // //         setLoading(false);
// // // // // //       } catch (err) {
// // // // // //         setError('Failed to fetch item. Item might not exist or network error.');
// // // // // //         setLoading(false);
// // // // // //         console.error(err);
// // // // // //       }
// // // // // //     };

// // // // // //     fetchItem();
// // // // // //   }, [id, API_BASE_URL]);

// // // // // //   const handleDelete = async () => {
// // // // // //     if (window.confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
// // // // // //       try {
// // // // // //         const config = {
// // // // // //           headers: {
// // // // // //             Authorization: `Bearer ${user.token}`,
// // // // // //           },
// // // // // //         };
// // // // // //         await axios.delete(`${API_BASE_URL}/items/${id}`, config);
// // // // // //         alert('Item deleted successfully!');
// // // // // //         navigate('/items'); // Redirect to item list after deletion
// // // // // //       } catch (err) {
// // // // // //         setError('Failed to delete item. You might not be authorized or network error.');
// // // // // //         console.error(err);
// // // // // //       }
// // // // // //     }
// // // // // //   };

// // // // // //   if (loading) {
// // // // // //     return (
// // // // // //       <div className="min-h-screen flex items-center justify-center text-xl text-gray-600">
// // // // // //         Loading item details...
// // // // // //       </div>
// // // // // //     );
// // // // // //   }

// // // // // //   if (error) {
// // // // // //     return (
// // // // // //       <div className="min-h-screen flex items-center justify-center text-red-600 text-xl">
// // // // // //         {error}
// // // // // //       </div>
// // // // // //     );
// // // // // //   }

// // // // // //   if (!item) {
// // // // // //     return (
// // // // // //       <div className="min-h-screen flex items-center justify-center text-gray-600 text-xl">
// // // // // //         Item not found.
// // // // // //       </div>
// // // // // //     );
// // // // // //   }

// // // // // //   const isFinder = user && item.finder_id?._id === user._id;

// // // // // //   return (
// // // // // //     <div className="container mx-auto p-4 py-8">
// // // // // //       <div className="bg-white rounded-lg shadow-xl overflow-hidden md:flex">
// // // // // //         <div className="md:w-1/2">
// // // // // //           {item.images && item.images.length > 0 && (
// // // // // //             <img
// // // // // //               src={item.images[0].url}
// // // // // //               alt={item.title}
// // // // // //               className="w-full h-full object-cover"
// // // // // //             />
// // // // // //           )}
// // // // // //           {(!item.images || item.images.length === 0) && (
// // // // // //             <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
// // // // // //               No Image Available
// // // // // //             </div>
// // // // // //           )}
// // // // // //         </div>
// // // // // //         <div className="md:w-1/2 p-6">
// // // // // //           <h1 className="text-4xl font-bold text-gray-800 mb-3">{item.title}</h1>
// // // // // //           <span className={`px-3 py-1 rounded-full text-sm font-semibold mr-2 ${
// // // // // //             item.type === 'LOST' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
// // // // // //           }`}>
// // // // // //             {item.type}
// // // // // //           </span>
// // // // // //           <span className="text-gray-600 text-md">{item.category}</span>

// // // // // //           <p className="text-gray-700 text-lg my-4">{item.description}</p>

// // // // // //           <div className="mb-4">
// // // // // //             <p className="text-gray-600"><span className="font-semibold">Campus:</span> {item.location.campus}</p>
// // // // // //             <p className="text-gray-600"><span className="font-semibold">Specific Spot:</span> {item.location.specific_spot}</p>
// // // // // //           </div>

// // // // // //           <div className="mb-4">
// // // // // //             <p className="text-gray-600"><span className="font-semibold">Brand:</span> {item.ai_metadata?.brand || 'N/A'}</p>
// // // // // //             <p className="text-gray-600"><span className="font-semibold">Color:</span> {item.ai_metadata?.color || 'N/A'}</p>
// // // // // //             <p className="text-gray-600"><span className="font-semibold">Tags:</span> {item.ai_metadata?.tags?.join(', ') || 'N/A'}</p>
// // // // // //             {item.ai_metadata?.has_PII && (
// // // // // //               <p className="text-red-500 font-semibold mt-2">
// // // // // //                 <i className="fas fa-exclamation-triangle mr-2"></i>Sensitive Information Detected (Blur Applied)
// // // // // //               </p>
// // // // // //             )}
// // // // // //           </div>

// // // // // //           <p className="text-sm text-gray-500">
// // // // // //             Reported by: <span className="font-semibold">{item.finder_id?.name || 'N/A'}</span> on {new Date(item.createdAt).toLocaleDateString()}
// // // // // //           </p>
// // // // // //           <p className="text-sm text-gray-500">
// // // // // //             Status: <span className="font-semibold text-blue-600">{item.status}</span>
// // // // // //           </p>

// // // // // //           {/* Action buttons for finder */}
// // // // // //           {isFinder && (
// // // // // //             <div className="mt-6 flex space-x-4">
// // // // // //               <button
// // // // // //                 onClick={() => navigate(`/items/${item._id}/edit`)} // Will implement Edit page later
// // // // // //                 className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
// // // // // //               >
// // // // // //                 Edit Item
// // // // // //               </button>
// // // // // //               <button
// // // // // //                 onClick={handleDelete}
// // // // // //                 className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
// // // // // //               >
// // // // // //                 Delete Item
// // // // // //               </button>
// // // // // //             </div>
// // // // // //           )}

// // // // // //           {/* Claims & Verification Flow (Future Feature Placeholder) */}
// // // // // //           {!isFinder && user && item.type === 'FOUND' && item.status === 'OPEN' && (
// // // // // //             <div className="mt-6">
// // // // // //               <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
// // // // // //                 Claim This Item
// // // // // //               </button>
// // // // // //             </div>
// // // // // //           )}

// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default ItemDetailPage;
// // // // // // client/src/pages/ItemDetailPage.jsx
// // // // // import React, { useEffect, useState } from 'react';
// // // // // import axios from 'axios';
// // // // // import { useParams, useNavigate } from 'react-router-dom';
// // // // // import { useAuth } from '../context/AuthContext';

// // // // // const ItemDetailPage = () => {
// // // // //   const { id } = useParams();
// // // // //   const navigate = useNavigate();
// // // // //   const [item, setItem] = useState(null);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [error, setError] = useState('');
// // // // //   const { user, API_BASE_URL } = useAuth();

// // // // //   useEffect(() => {
// // // // //     const fetchItem = async () => {
// // // // //       try {
// // // // //         const { data } = await axios.get(`${API_BASE_URL}/items/${id}`);
// // // // //         setItem(data);
// // // // //         setLoading(false);
// // // // //       } catch (err) {
// // // // //         setError('Failed to fetch item. Item might not exist or network error.');
// // // // //         setLoading(false);
// // // // //         console.error(err);
// // // // //       }
// // // // //     };

// // // // //     fetchItem();
// // // // //   }, [id, API_BASE_URL]);

// // // // //   const handleDelete = async () => {
// // // // //     if (window.confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
// // // // //       try {
// // // // //         const config = {
// // // // //           headers: {
// // // // //             Authorization: `Bearer ${user.token}`,
// // // // //           },
// // // // //         };
// // // // //         await axios.delete(`${API_BASE_URL}/items/${id}`, config);
// // // // //         alert('Item deleted successfully!');
// // // // //         navigate('/items');
// // // // //       } catch (err) {
// // // // //         setError('Failed to delete item. You might not be authorized or network error.');
// // // // //         console.error(err);
// // // // //       }
// // // // //     }
// // // // //   };

// // // // //   if (loading) {
// // // // //     return (
// // // // //       <div className="min-h-screen flex items-center justify-center text-xl text-gray-600">
// // // // //         Loading item details...
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   if (error) {
// // // // //     return (
// // // // //       <div className="min-h-screen flex items-center justify-center text-red-600 text-xl">
// // // // //         {error}
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   if (!item) {
// // // // //     return (
// // // // //       <div className="min-h-screen flex items-center justify-center text-gray-600 text-xl">
// // // // //         Item not found.
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   const isFinder = user && item.finder_id?._id === user._id;

// // // // //   // Determine image URL to display (blurred or original)
// // // // //   const imageUrlToDisplay = item.images[0]?.isBlurred
// // // // //     ? cloudinaryUrlWithBlur(item.images[0].public_id) // We'll create this helper function
// // // // //     : item.images[0]?.url;

// // // // //   return (
// // // // //     <div className="container mx-auto p-4 py-8">
// // // // //       <div className="bg-white rounded-lg shadow-xl overflow-hidden md:flex">
// // // // //         <div className="md:w-1/2">
// // // // //           {item.images && item.images.length > 0 && (
// // // // //             <img
// // // // //               src={imageUrlToDisplay || 'https://via.placeholder.com/400x300?text=No+Image'}
// // // // //               alt={item.title}
// // // // //               className="w-full h-full object-cover"
// // // // //             />
// // // // //           )}
// // // // //           {(!item.images || item.images.length === 0) && (
// // // // //             <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
// // // // //               No Image Available
// // // // //             </div>
// // // // //           )}
// // // // //         </div>
// // // // //         <div className="md:w-1/2 p-6">
// // // // //           <h1 className="text-4xl font-bold text-gray-800 mb-3">{item.title}</h1>
// // // // //           <span className={`px-3 py-1 rounded-full text-sm font-semibold mr-2 ${
// // // // //             item.type === 'LOST' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
// // // // //           }`}>
// // // // //             {item.type}
// // // // //           </span>
// // // // //           <span className="text-gray-600 text-md">{item.category}</span>

// // // // //           <p className="text-gray-700 text-lg my-4">{item.description}</p>

// // // // //           <div className="mb-4">
// // // // //             <p className="text-gray-600"><span className="font-semibold">Campus:</span> {item.location.campus}</p>
// // // // //             <p className="text-gray-600"><span className="font-semibold">Specific Spot:</span> {item.location.specific_spot}</p>
// // // // //           </div>

// // // // //           {/* Displaying AI Metadata */}
// // // // //           <div className="mb-4 border-t pt-4 mt-4 border-gray-200">
// // // // //             <h3 className="text-xl font-semibold text-gray-700 mb-2">AI Insights:</h3>
// // // // //             <p className="text-gray-600"><span className="font-semibold">Brand:</span> {item.ai_metadata?.brand || 'N/A'}</p>
// // // // //             <p className="text-gray-600"><span className="font-semibold">Color:</span> {item.ai_metadata?.color || 'N/A'}</p>
// // // // //             <p className="text-gray-600"><span className="font-semibold">Condition:</span> {item.ai_metadata?.condition || 'N/A'}</p>
// // // // //             <p className="text-gray-600"><span className="font-semibold">Tags:</span> {item.ai_metadata?.tags?.join(', ') || 'N/A'}</p>
// // // // //             {item.ai_metadata?.has_PII && (
// // // // //               <p className="text-red-500 font-semibold mt-2">
// // // // //                 <i className="fas fa-exclamation-triangle mr-2"></i>Sensitive Information Detected. Image is blurred for privacy.
// // // // //               </p>
// // // // //             )}
// // // // //           </div>

// // // // //           <p className="text-sm text-gray-500">
// // // // //             Reported by: <span className="font-semibold">{item.finder_id?.name || 'N/A'}</span> on {new Date(item.createdAt).toLocaleDateString()}
// // // // //           </p>
// // // // //           <p className="text-sm text-gray-500">
// // // // //             Status: <span className="font-semibold text-blue-600">{item.status}</span>
// // // // //           </p>

// // // // //           {/* Action buttons for finder */}
// // // // //           {isFinder && (
// // // // //             <div className="mt-6 flex space-x-4">
// // // // //               <button
// // // // //                 onClick={() => navigate(`/items/${item._id}/edit`)} // Will implement Edit page later
// // // // //                 className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
// // // // //               >
// // // // //                 Edit Item
// // // // //               </button>
// // // // //               <button
// // // // //                 onClick={handleDelete}
// // // // //                 className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
// // // // //               >
// // // // //                 Delete Item
// // // // //               </button>
// // // // //             </div>
// // // // //           )}

// // // // //           {/* Claims & Verification Flow (Future Feature Placeholder) */}
// // // // //           {!isFinder && user && item.type === 'FOUND' && item.status === 'OPEN' && (
// // // // //             <div className="mt-6">
// // // // //               <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
// // // // //                 Claim This Item
// // // // //               </button>
// // // // //             </div>
// // // // //           )}

// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default ItemDetailPage;

// // // // // // Helper function to generate Cloudinary blurred URL (client-side)
// // // // // // In a real app, you'd pull cloud name from .env or a config
// // // // // const cloudinaryUrlWithBlur = (publicId) => {
// // // // //   const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME; // Need to add this to client .env
// // // // //   if (!CLOUDINARY_CLOUD_NAME) {
// // // // //       console.error("Cloudinary Cloud Name not set in client-side .env!");
// // // // //       return `https://res.cloudinary.com/dummy/image/upload/e_blur:1000/${publicId}.webp`; // Fallback
// // // // //   }
// // // // //   return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/e_blur:1000,f_auto,q_auto/${publicId}.webp`;
// // // // // };
// // // // // client/src/pages/ItemDetailPage.jsx
// // // // import React, { useEffect, useState } from 'react';
// // // // import axios from 'axios';
// // // // import { useParams, useNavigate } from 'react-router-dom';
// // // // import { useAuth } from '../context/AuthContext';

// // // // const ItemDetailPage = () => {
// // // //   const { id } = useParams();
// // // //   const navigate = useNavigate();
// // // //   const [item, setItem] = useState(null);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [error, setError] = useState('');
// // // //   const { user, API_BASE_URL } = useAuth();

// // // //   useEffect(() => {
// // // //     const fetchItem = async () => {
// // // //       try {
// // // //         const { data } = await axios.get(`${API_BASE_URL}/items/${id}`);
// // // //         setItem(data);
// // // //         setLoading(false);
// // // //       } catch (err) {
// // // //         setError('Failed to fetch item. Item might not exist or network error.');
// // // //         setLoading(false);
// // // //         console.error(err);
// // // //       }
// // // //     };

// // // //     fetchItem();
// // // //   }, [id, API_BASE_URL]);

// // // //   const handleDelete = async () => {
// // // //     if (window.confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
// // // //       try {
// // // //         const config = {
// // // //           headers: {
// // // //             Authorization: `Bearer ${user.token}`,
// // // //           },
// // // //         };
// // // //         await axios.delete(`${API_BASE_URL}/items/${id}`, config);
// // // //         alert('Item deleted successfully!');
// // // //         navigate('/items');
// // // //       } catch (err) {
// // // //         setError('Failed to delete item. You might not be authorized or network error.');
// // // //         console.error(err);
// // // //       }
// // // //     }
// // // //   };

// // // //   if (loading) {
// // // //     return (
// // // //       <div className="min-h-screen flex items-center justify-center text-xl text-gray-600">
// // // //         Loading item details...
// // // //       </div>
// // // //     );
// // // //   }

// // // //   if (error) {
// // // //     return (
// // // //       <div className="min-h-screen flex items-center justify-center text-red-600 text-xl">
// // // //         {error}
// // // //       </div>
// // // //     );
// // // //   }

// // // //   if (!item) {
// // // //     return (
// // // //       <div className="min-h-screen flex items-center justify-center text-gray-600 text-xl">
// // // //         Item not found.
// // // //       </div>
// // // //     );
// // // //   }

// // // //   const isFinder = user && item.finder_id?._id === user._id;

// // // //   // Helper to generate Cloudinary blurred URL (client-side)
// // // //   // This function needs access to the CLOUDINARY_CLOUD_NAME.
// // // //   const cloudinaryUrlWithBlur = (publicId) => {
// // // //     const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
// // // //     if (!CLOUDINARY_CLOUD_NAME) {
// // // //         console.error("Cloudinary Cloud Name not set in client-side .env!");
// // // //         // Fallback: If cloud name is missing, just return the original URL from the item object.
// // // //         // This might mean a non-blurred image is shown, which is not ideal but avoids breakage.
// // // //         return item.images.find(img => img.public_id === publicId)?.url;
// // // //     }
// // // //     return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/e_blur:1000,f_auto,q_auto/${publicId}.webp`;
// // // //   };

// // // //   // Determine image URL to display (blurred or original)
// // // //   const imageUrlToDisplay = item.images[0]?.isBlurred
// // // //     ? cloudinaryUrlWithBlur(item.images[0].public_id)
// // // //     : item.images[0]?.url;


// // // //   return (
// // // //     <div className="container mx-auto p-4 py-8">
// // // //       <div className="bg-white rounded-lg shadow-xl overflow-hidden md:flex">
// // // //         <div className="md:w-1/2 flex items-center justify-center bg-gray-100 p-4"> {/* Added flex for centering */}
// // // //           {item.images && item.images.length > 0 ? (
// // // //             <img
// // // //               src={imageUrlToDisplay}
// // // //               alt={item.title}
// // // //               className="max-w-full max-h-96 object-contain rounded-lg shadow-md" // Adjusted image sizing
// // // //             />
// // // //           ) : (
// // // //             <div className="w-full h-full min-h-[300px] flex items-center justify-center bg-gray-200 text-gray-500 rounded-lg">
// // // //               No Image Available
// // // //             </div>
// // // //           )}
// // // //         </div>
// // // //         <div className="md:w-1/2 p-6">
// // // //           <h1 className="text-4xl font-bold text-gray-800 mb-3">{item.title}</h1>
// // // //           <span className={`px-3 py-1 rounded-full text-sm font-semibold mr-2 ${
// // // //             item.type === 'LOST' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
// // // //           }`}>
// // // //             {item.type}
// // // //           </span>
// // // //           <span className="text-gray-600 text-md">{item.category}</span>

// // // //           <p className="text-gray-700 text-lg my-4">{item.description}</p>

// // // //           <div className="mb-4">
// // // //             <p className="text-gray-600"><span className="font-semibold">Campus:</span> {item.location.campus}</p>
// // // //             <p className="text-gray-600"><span className="font-semibold">Specific Spot:</span> {item.location.specific_spot}</p>
// // // //           </div>

// // // //           {/* Displaying AI Metadata - improved conditional rendering */}
// // // //           <div className="mb-4 border-t pt-4 mt-4 border-gray-200">
// // // //             <h3 className="text-xl font-semibold text-gray-700 mb-2">AI Insights:</h3>
// // // //             {item.ai_metadata?.brand && item.ai_metadata.brand !== 'N/A' && <p className="text-gray-600"><span className="font-semibold">Brand:</span> {item.ai_metadata.brand}</p>}
// // // //             {item.ai_metadata?.color && item.ai_metadata.color !== 'N/A' && <p className="text-gray-600"><span className="font-semibold">Color:</span> {item.ai_metadata.color}</p>}
// // // //             {item.ai_metadata?.condition && item.ai_metadata.condition !== 'Unknown' && <p className="text-gray-600"><span className="font-semibold">Condition:</span> {item.ai_metadata.condition}</p>}
// // // //             {item.ai_metadata?.tags && item.ai_metadata.tags.length > 0 && item.ai_metadata.tags[0] !== 'unknown' && <p className="text-gray-600"><span className="font-semibold">Tags:</span> {item.ai_metadata.tags.join(', ')}</p>}
// // // //             {item.ai_metadata?.has_PII && (
// // // //               <p className="text-red-500 font-semibold mt-2">
// // // //                 <i className="fas fa-exclamation-triangle mr-2"></i>Sensitive Information Detected. Image is blurred for privacy.
// // // //               </p>
// // // //             )}
// // // //             {/* Fallback message if no specific AI insights are available */}
// // // //             {(!item.ai_metadata?.brand || item.ai_metadata.brand === 'N/A') &&
// // // //              (!item.ai_metadata?.color || item.ai_metadata.color === 'N/A') &&
// // // //              (!item.ai_metadata?.condition || item.ai_metadata.condition === 'Unknown') &&
// // // //              (!item.ai_metadata?.tags || item.ai_metadata.tags.length === 0 || item.ai_metadata.tags[0] === 'unknown') && (
// // // //                 <p className="text-gray-600 italic">No specific AI insights available.</p>
// // // //              )}
// // // //           </div>

// // // //           <p className="text-sm text-gray-500">
// // // //             Reported by: <span className="font-semibold">{item.finder_id?.name || 'N/A'}</span> on {new Date(item.createdAt).toLocaleDateString()}
// // // //           </p>
// // // //           {/* Display uploader's email here */}
// // // //           {item.finder_id?.email && (
// // // //             <p className="text-sm text-gray-500 mt-1">
// // // //               Contact: <a href={`mailto:${item.finder_id.email}`} className="text-indigo-600 hover:underline">
// // // //                 {item.finder_id.email}
// // // //               </a>
// // // //             </p>
// // // //           )}
// // // //           <p className="text-sm text-gray-500">
// // // //             Status: <span className="font-semibold text-blue-600">{item.status}</span>
// // // //           </p>

// // // //           {/* Action buttons for finder */}
// // // //           {isFinder && (
// // // //             <div className="mt-6 flex space-x-4">
// // // //               <button
// // // //                 onClick={() => navigate(`/items/${item._id}/edit`)} // Will implement Edit page later
// // // //                 className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
// // // //               >
// // // //                 Edit Item
// // // //               </button>
// // // //               <button
// // // //                 onClick={handleDelete}
// // // //                 className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
// // // //               >
// // // //                 Delete Item
// // // //               </button>
// // // //             </div>
// // // //           )}

// // // //           {/* Claims & Verification Flow (Future Feature Placeholder) */}
// // // //           {!isFinder && user && item.type === 'FOUND' && item.status === 'OPEN' && (
// // // //             <div className="mt-6">
// // // //               <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
// // // //                 Claim This Item
// // // //               </button>
// // // //             </div>
// // // //           )}

// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default ItemDetailPage;
// // // // client/src/pages/ItemDetailPage.jsx
// // // import React, { useEffect, useState } from 'react';
// // // import axios from 'axios';
// // // import { useParams, useNavigate, Link } from 'react-router-dom'; // Import Link
// // // import { useAuth } from '../context/AuthContext';
// // // import Modal from '../components/Modal'; // Import Modal component

// // // const ItemDetailPage = () => {
// // //   const { id } = useParams();
// // //   const navigate = useNavigate();
// // //   const [item, setItem] = useState(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState('');
// // //   const { user, API_BASE_URL } = useAuth();

// // //   const [showClaimModal, setShowClaimModal] = useState(false); // State for modal visibility
// // //   const [claimProofAnswer, setClaimProofAnswer] = useState('');
// // //   const [claimSubmissionError, setClaimSubmissionError] = useState('');
// // //   const [claimSubmissionLoading, setClaimSubmissionLoading] = useState(false);
// // //   const [userAlreadyClaimed, setUserAlreadyClaimed] = useState(false); // To prevent multiple claims

// // //   // Helper to generate Cloudinary blurred URL (client-side)
// // //   const cloudinaryUrlWithBlur = (publicId) => {
// // //     const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
// // //     if (!CLOUDINARY_CLOUD_NAME) {
// // //         console.error("Cloudinary Cloud Name not set in client-side .env!");
// // //         return item.images.find(img => img.public_id === publicId)?.url;
// // //     }
// // //     return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/e_blur:1000,f_auto,q_auto/${publicId}.webp`;
// // //   };

// // //   useEffect(() => {
// // //     const fetchItemAndCheckClaim = async () => {
// // //       try {
// // //         const { data } = await axios.get(`${API_BASE_URL}/items/${id}`);
// // //         setItem(data);
// // //         setLoading(false);

// // //         // Check if user already has a pending claim for this item
// // //         if (user && data.type === 'FOUND' && data.status === 'OPEN' && data.finder_id?._id !== user._id) {
// // //             const config = { headers: { Authorization: `Bearer ${user.token}` } };
// // //             const { data: myClaims } = await axios.get(`${API_BASE_URL}/claims/my`, config);
// // //             const hasPendingClaim = myClaims.some(claim =>
// // //                 claim.found_item?._id === data._id && claim.status === 'PENDING'
// // //             );
// // //             setUserAlreadyClaimed(hasPendingClaim);
// // //         }
// // //       } catch (err) {
// // //         setError('Failed to fetch item. Item might not exist or network error.');
// // //         setLoading(false);
// // //         console.error(err);
// // //       }
// // //     };

// // //     fetchItemAndCheckClaim();
// // //   }, [id, user, API_BASE_URL]);


// // //   const handleDelete = async () => {
// // //     if (window.confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
// // //       try {
// // //         const config = {
// // //           headers: {
// // //             Authorization: `Bearer ${user.token}`,
// // //           },
// // //         };
// // //         await axios.delete(`${API_BASE_URL}/items/${id}`, config);
// // //         alert('Item deleted successfully!');
// // //         navigate('/items');
// // //       } catch (err) {
// // //         setError('Failed to delete item. You might not be authorized or network error.');
// // //         console.error(err);
// // //       }
// // //     }
// // //   };

// // //   const handleClaimSubmit = async (e) => {
// // //     e.preventDefault();
// // //     setClaimSubmissionError('');
// // //     setClaimSubmissionLoading(true);

// // //     if (!claimProofAnswer.trim()) {
// // //       setClaimSubmissionError('Please provide an answer to the proof question.');
// // //       setClaimSubmissionLoading(false);
// // //       return;
// // //     }

// // //     try {
// // //       const config = {
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //           Authorization: `Bearer ${user.token}`,
// // //         },
// // //       };
// // //       const claimData = {
// // //         found_item_id: item._id,
// // //         proof_answer: claimProofAnswer,
// // //         // lost_item_reported_by_claimer_id: null // Can add this later if we implement pre-matching
// // //       };

// // //       await axios.post(`${API_BASE_URL}/claims`, claimData, config);
// // //       alert('Claim submitted successfully! The finder has been notified.');
// // //       setShowClaimModal(false);
// // //       setClaimProofAnswer('');
// // //       setUserAlreadyClaimed(true); // Mark as claimed locally to update UI
// // //       navigate('/my-claims'); // Redirect to user's claims page
// // //     } catch (err) {
// // //       setClaimSubmissionError(err.response?.data?.message || 'Failed to submit claim.');
// // //       console.error(err);
// // //     } finally {
// // //       setClaimSubmissionLoading(false);
// // //     }
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <div className="min-h-screen flex items-center justify-center text-xl text-gray-600">
// // //         Loading item details...
// // //       </div>
// // //     );
// // //   }

// // //   if (error) {
// // //     return (
// // //       <div className="min-h-screen flex items-center justify-center text-red-600 text-xl">
// // //         {error}
// // //       </div>
// // //     );
// // //   }

// // //   if (!item) {
// // //     return (
// // //       <div className="min-h-screen flex items-center justify-center text-gray-600 text-xl">
// // //         Item not found.
// // //       </div>
// // //     );
// // //   }

// // //   const isFinder = user && item.finder_id?._id === user._id;
// // //   const imageUrlToDisplay = item.images[0]?.isBlurred
// // //     ? cloudinaryUrlWithBlur(item.images[0].public_id)
// // //     : item.images[0]?.url;

// // //   const canClaim = user && item.type === 'FOUND' && item.status === 'OPEN' && !isFinder && !userAlreadyClaimed;


// // //   return (
// // //     <div className="container mx-auto p-4 py-8">
// // //       <div className="bg-white rounded-lg shadow-xl overflow-hidden md:flex">
// // //         <div className="md:w-1/2 flex items-center justify-center bg-gray-100 p-4">
// // //           {item.images && item.images.length > 0 ? (
// // //             <img
// // //               src={imageUrlToDisplay}
// // //               alt={item.title}
// // //               className="max-w-full max-h-96 object-contain rounded-lg shadow-md"
// // //             />
// // //           ) : (
// // //             <div className="w-full h-full min-h-[300px] flex items-center justify-center bg-gray-200 text-gray-500 rounded-lg">
// // //               No Image Available
// // //             </div>
// // //           )}
// // //         </div>
// // //         <div className="md:w-1/2 p-6">
// // //           <h1 className="text-4xl font-bold text-gray-800 mb-3">{item.title}</h1>
// // //           <span className={`px-3 py-1 rounded-full text-sm font-semibold mr-2 ${
// // //             item.type === 'LOST' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
// // //           }`}>
// // //             {item.type}
// // //           </span>
// // //           <span className="text-gray-600 text-md">{item.category}</span>

// // //           <p className="text-gray-700 text-lg my-4">{item.description}</p>

// // //           <div className="mb-4">
// // //             <p className="text-gray-600"><span className="font-semibold">Campus:</span> {item.location.campus}</p>
// // //             <p className="text-gray-600"><span className="font-semibold">Specific Spot:</span> {item.location.specific_spot}</p>
// // //           </div>

// // //           <div className="mb-4 border-t pt-4 mt-4 border-gray-200">
// // //             <h3 className="text-xl font-semibold text-gray-700 mb-2">AI Insights:</h3>
// // //             {item.ai_metadata?.brand && item.ai_metadata.brand !== 'N/A' && <p className="text-gray-600"><span className="font-semibold">Brand:</span> {item.ai_metadata.brand}</p>}
// // //             {item.ai_metadata?.color && item.ai_metadata.color !== 'N/A' && <p className="text-gray-600"><span className="font-semibold">Color:</span> {item.ai_metadata.color}</p>}
// // //             {item.ai_metadata?.condition && item.ai_metadata.condition !== 'Unknown' && <p className="text-gray-600"><span className="font-semibold">Condition:</span> {item.ai_metadata.condition}</p>}
// // //             {item.ai_metadata?.tags && item.ai_metadata.tags.length > 0 && item.ai_metadata.tags[0] !== 'unknown' && <p className="text-gray-600"><span className="font-semibold">Tags:</span> {item.ai_metadata.tags.join(', ')}</p>}
// // //             {item.ai_metadata?.has_PII && (
// // //               <p className="text-red-500 font-semibold mt-2">
// // //                 <i className="fas fa-exclamation-triangle mr-2"></i>Sensitive Information Detected. Image is blurred for privacy.
// // //               </p>
// // //             )}
// // //             {(!item.ai_metadata?.brand || item.ai_metadata.brand === 'N/A') &&
// // //              (!item.ai_metadata?.color || item.ai_metadata.color === 'N/A') &&
// // //              (!item.ai_metadata?.condition || item.ai_metadata.condition === 'Unknown') &&
// // //              (!item.ai_metadata?.tags || item.ai_metadata.tags.length === 0 || item.ai_metadata.tags[0] === 'unknown') && (
// // //                 <p className="text-gray-600 italic">No specific AI insights available.</p>
// // //              )}
// // //           </div>

// // //           <p className="text-sm text-gray-500">
// // //             Reported by: <span className="font-semibold">{item.finder_id?.name || 'N/A'}</span> on {new Date(item.createdAt).toLocaleDateString()}
// // //           </p>
// // //           {item.finder_id?.email && (
// // //             <p className="text-sm text-gray-500 mt-1">
// // //               Contact: <a href={`mailto:${item.finder_id.email}`} className="text-indigo-600 hover:underline">
// // //                 {item.finder_id.email}
// // //               </a>
// // //             </p>
// // //           )}
// // //           <p className="text-sm text-gray-500">
// // //             Status: <span className="font-semibold text-blue-600">{item.status}</span>
// // //           </p>

// // //           {/* Action buttons for finder */}
// // //           {isFinder && (
// // //             <div className="mt-6 flex space-x-4">
// // //               <button
// // //                 onClick={() => navigate(`/items/${item._id}/edit`)} // Will implement Edit page later
// // //                 className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
// // //               >
// // //                 Edit Item
// // //               </button>
// // //               <button
// // //                 onClick={handleDelete}
// // //                 className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
// // //               >
// // //                 Delete Item
// // //               </button>
// // //             </div>
// // //           )}

// // //           {/* Claims & Verification Flow - Claim Button */}
// // //           {canClaim && (
// // //             <div className="mt-6">
// // //               <button
// // //                 onClick={() => setShowClaimModal(true)}
// // //                 className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
// // //               >
// // //                 Claim This Item
// // //               </button>
// // //             </div>
// // //           )}
// // //           {userAlreadyClaimed && (
// // //              <p className="mt-6 text-orange-600 font-medium">You have a pending claim for this item.</p>
// // //           )}
// // //           {!user && item.type === 'FOUND' && item.status === 'OPEN' && (
// // //             <p className="mt-6 text-gray-600">
// // //               <Link to="/login" className="text-indigo-600 hover:underline">Log in</Link> to claim this item.
// // //             </p>
// // //           )}


// // //         </div>
// // //       </div>

// // //       {/* Claim Item Modal */}
// // //       <Modal isOpen={showClaimModal} onClose={() => setShowClaimModal(false)} title={`Claim for "${item.title}"`}>
// // //         <form onSubmit={handleClaimSubmit}>
// // //           <p className="mb-4 text-gray-700">To claim this item, please answer the finder's proof question:</p>
// // //           <p className="font-semibold text-indigo-700 mb-3">{item.proof_question}</p>
// // //           <div className="mb-4">
// // //             <label htmlFor="proofAnswer" className="block text-gray-700 text-sm font-bold mb-2">
// // //               Your Answer:
// // //             </label>
// // //             <textarea
// // //               id="proofAnswer"
// // //               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
// // //               rows="4"
// // //               value={claimProofAnswer}
// // //               onChange={(e) => setClaimProofAnswer(e.target.value)}
// // //               required
// // //             ></textarea>
// // //           </div>
// // //           {claimSubmissionError && (
// // //             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
// // //               {claimSubmissionError}
// // //             </div>
// // //           )}
// // //           <div className="flex justify-end space-x-2">
// // //             <button
// // //               type="button"
// // //               onClick={() => setShowClaimModal(false)}
// // //               className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition duration-300"
// // //               disabled={claimSubmissionLoading}
// // //             >
// // //               Cancel
// // //             </button>
// // //             <button
// // //               type="submit"
// // //               className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
// // //               disabled={claimSubmissionLoading}
// // //             >
// // //               {claimSubmissionLoading ? 'Submitting...' : 'Submit Claim'}
// // //             </button>
// // //           </div>
// // //         </form>
// // //       </Modal>
// // //     </div>
// // //   );
// // // };

// // // export default ItemDetailPage;
// // // client/src/pages/ItemDetailPage.jsx
// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import { useParams, useNavigate, Link } from 'react-router-dom';
// // import { useAuth } from '../context/AuthContext';
// // import Modal from '../components/Modal';

// // // Local fallback image (uploaded earlier)
// // const FALLBACK_IMAGE = '/mnt/data/f2880d50-58f3-4e9e-a7b5-99c69577b08c.png';

// // const ItemDetailPage = () => {
// //   const { id } = useParams();
// //   const navigate = useNavigate();
// //   const [item, setItem] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState('');
// //   const { user, API_BASE_URL } = useAuth();

// //   // Claim modal state
// //   const [showClaimModal, setShowClaimModal] = useState(false);
// //   const [claimProofAnswer, setClaimProofAnswer] = useState('');
// //   const [claimSubmissionError, setClaimSubmissionError] = useState('');
// //   const [claimSubmissionLoading, setClaimSubmissionLoading] = useState(false);
// //   const [userAlreadyClaimed, setUserAlreadyClaimed] = useState(false);

// //   // Helper: Cloudinary blurred URL (client-side)
// //   const cloudinaryUrlWithBlur = (publicId) => {
// //     const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
// //     if (!CLOUDINARY_CLOUD_NAME) {
// //       // fallback to original url in item.images (if present)
// //       return item?.images?.find(img => img.public_id === publicId)?.url || FALLBACK_IMAGE;
// //     }
// //     return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/e_blur:1000,f_auto,q_auto/${publicId}.webp`;
// //   };

// //   useEffect(() => {
// //     const fetchItemAndCheckClaim = async () => {
// //       try {
// //         setLoading(true);
// //         const { data } = await axios.get(`${API_BASE_URL}/items/${id}`);
// //         setItem(data);
// //         setLoading(false);

// //         // Check if user already has a pending claim for this item
// //         if (user && data.type === 'FOUND' && data.status === 'OPEN' && data.finder_id?._id !== user._id) {
// //           const config = { headers: { Authorization: `Bearer ${user.token}` } };
// //           const { data: myClaims } = await axios.get(`${API_BASE_URL}/claims/my`, config);
// //           const hasPendingClaim = myClaims.some(claim =>
// //             claim.found_item?._id === data._id && claim.status === 'PENDING'
// //           );
// //           setUserAlreadyClaimed(hasPendingClaim);
// //         }
// //       } catch (err) {
// //         setError('Failed to fetch item. Item might not exist or network error.');
// //         setLoading(false);
// //         console.error(err);
// //       }
// //     };

// //     fetchItemAndCheckClaim();
// //   }, [id, user, API_BASE_URL]);

// //   const handleDelete = async () => {
// //     if (!window.confirm('Delete this item? This cannot be undone.')) return;
// //     try {
// //       const config = { headers: { Authorization: `Bearer ${user.token}` } };
// //       await axios.delete(`${API_BASE_URL}/items/${id}`, config);
// //       alert('Item deleted successfully.');
// //       navigate('/items');
// //     } catch (err) {
// //       setError('Failed to delete item. You might not be authorized or network error.');
// //       console.error(err);
// //     }
// //   };

// //   const handleClaimSubmit = async (e) => {
// //     e.preventDefault();
// //     setClaimSubmissionError('');
// //     setClaimSubmissionLoading(true);

// //     if (!claimProofAnswer.trim()) {
// //       setClaimSubmissionError('Please provide an answer to the proof question.');
// //       setClaimSubmissionLoading(false);
// //       return;
// //     }

// //     try {
// //       const config = {
// //         headers: {
// //           'Content-Type': 'application/json',
// //           Authorization: `Bearer ${user.token}`,
// //         },
// //       };
// //       const claimData = {
// //         found_item_id: item._id,
// //         proof_answer: claimProofAnswer,
// //       };

// //       await axios.post(`${API_BASE_URL}/claims`, claimData, config);
// //       alert('Claim submitted successfully! Finder has been notified.');
// //       setShowClaimModal(false);
// //       setClaimProofAnswer('');
// //       setUserAlreadyClaimed(true);
// //       navigate('/my-claims');
// //     } catch (err) {
// //       setClaimSubmissionError(err.response?.data?.message || 'Failed to submit claim.');
// //       console.error(err);
// //     } finally {
// //       setClaimSubmissionLoading(false);
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-black text-gray-300">
// //         <div className="text-center space-y-4">
// //           <div className="w-20 h-20 rounded-full animate-pulse bg-gradient-to-r from-blue-600 to-purple-600/60 shadow-2xl mx-auto"></div>
// //           <p className="text-lg">Loading item details...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-black">
// //         <p className="text-red-400 text-lg">{error}</p>
// //       </div>
// //     );
// //   }

// //   if (!item) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-black">
// //         <p className="text-gray-300 text-lg">Item not found.</p>
// //       </div>
// //     );
// //   }

// //   const isFinder = user && item.finder_id?._id === user._id;
// //   const imageUrlToDisplay = item.images?.[0]?.isBlurred
// //     ? cloudinaryUrlWithBlur(item.images[0].public_id)
// //     : item.images?.[0]?.url || FALLBACK_IMAGE;

// //   const canClaim = user && item.type === 'FOUND' && item.status === 'OPEN' && !isFinder && !userAlreadyClaimed;

// //   return (
// //     <div className="min-h-screen bg-black text-white relative overflow-hidden pb-20">

// //       {/* Animated gradient blobs (premium neon glow) */}
// //       <div className="pointer-events-none fixed inset-0 -z-10">
// //         <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.18),transparent)] blur-3xl animate-slowSpin opacity-80"></div>
// //         <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.14),transparent)] blur-3xl animate-slowSpinDelay opacity-80"></div>
// //       </div>

// //       <div className="container mx-auto px-6 lg:px-12 py-12">
// //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

// //           {/* LEFT: Image / Visual */}
// //           <div className="lg:col-span-1">
// //             <div className="relative rounded-2xl overflow-hidden border border-white/6 bg-gradient-to-b from-white/3 to-white/2 p-1 shadow-[0_10px_40px_rgba(59,130,246,0.06)]">
// //               {/* Neon frame */}
// //               <div className="absolute inset-0 pointer-events-none rounded-2xl -z-10" />
// //               <div className="bg-black/40 p-2 rounded-xl">
// //                 <div className="relative rounded-xl overflow-hidden">
// //                   <img
// //                     src={imageUrlToDisplay}
// //                     alt={item.title}
// //                     className="w-full h-96 object-contain bg-black rounded-lg transform transition duration-700 hover:scale-[1.02]"
// //                   />

// //                   {/* small badge if blurred */}
// //                   {item.images?.[0]?.isBlurred && (
// //                     <div className="absolute top-3 left-3 bg-black/50 px-3 py-1 rounded-full text-xs text-purple-300 border border-purple-400/20">
// //                       Blurred for privacy
// //                     </div>
// //                   )}

// //                   {/* Neon edge bottom */}
// //                   <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-blue-400 to-purple-400 opacity-60 blur-sm"></div>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Quick Actions */}
// //             <div className="mt-5 flex gap-3">
// //               <Link
// //                 to="/items"
// //                 className="flex-1 text-center py-2 rounded-lg bg-white/5 border border-white/6 hover:bg-white/8 transition font-semibold"
// //               >
// //                 Back to listings
// //               </Link>
// //               {isFinder && (
// //                 <button
// //                   onClick={() => navigate(`/items/${item._id}/edit`)}
// //                   className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 transition font-semibold"
// //                 >
// //                   Edit
// //                 </button>
// //               )}
// //             </div>
// //           </div>

// //           {/* CENTER + RIGHT: Details + AI Insights */}
// //           <div className="lg:col-span-2 space-y-6">

// //             {/* Title Card */}
// //             <div className="rounded-2xl p-6 bg-white/4 backdrop-blur-xl border border-white/8 shadow-xl">
// //               <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
// //                 <div>
// //                   <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
// //                     {item.title}
// //                   </h1>
// //                   <div className="mt-2 flex items-center gap-3">
// //                     <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
// //                       item.type === 'LOST' ? 'bg-red-600/20 text-red-300' : 'bg-green-600/20 text-green-300'
// //                     }`}>
// //                       {item.type}
// //                     </span>
// //                     <span className="text-sm text-gray-300">{item.category}</span>
// //                   </div>
// //                 </div>

// //                 <div className="flex items-center gap-3">
// //                   <p className="text-sm text-gray-400">Status:</p>
// //                   <span className="text-sm font-semibold text-white/90">{item.status}</span>
// //                 </div>
// //               </div>

// //               <p className="mt-5 text-gray-200 text-lg leading-relaxed">
// //                 {item.description}
// //               </p>

// //               <div className="mt-6 flex flex-wrap gap-4">
// //                 <div className="text-sm text-gray-300">
// //                   <span className="font-semibold text-white">Campus:</span> {item.location.campus}
// //                 </div>
// //                 <div className="text-sm text-gray-300">
// //                   <span className="font-semibold text-white">Spot:</span> {item.location.specific_spot}
// //                 </div>
// //                 <div className="text-sm text-gray-300">
// //                   <span className="font-semibold text-white">Reported:</span> {new Date(item.createdAt).toLocaleDateString()}
// //                 </div>
// //               </div>

// //               <div className="mt-6 flex items-center gap-4">
// //                 {/* Finder contact (if present) */}
// //                 {item.finder_id?.email && (
// //                   <a
// //                     href={`mailto:${item.finder_id.email}`}
// //                     className="px-4 py-2 rounded-lg bg-white/5 border border-white/6 hover:bg-white/8 transition font-medium"
// //                   >
// //                     Contact Finder
// //                   </a>
// //                 )}

// //                 {/* Finder-only actions */}
// //                 {isFinder && (
// //                   <>
// //                     <button
// //                       onClick={() => navigate(`/items/${item._id}/edit`)}
// //                       className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 transition font-semibold"
// //                     >
// //                       Edit Item
// //                     </button>
// //                     <button
// //                       onClick={handleDelete}
// //                       className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition font-semibold"
// //                     >
// //                       Delete
// //                     </button>
// //                   </>
// //                 )}

// //                 {/* Claim CTA */}
// //                 {!isFinder && item.type === 'FOUND' && item.status === 'OPEN' && (
// //                   <>
// //                     {user ? (
// //                       canClaim ? (
// //                         <button
// //                           onClick={() => setShowClaimModal(true)}
// //                           className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-400 to-blue-400 hover:brightness-95 transition font-semibold"
// //                         >
// //                           Claim This Item
// //                         </button>
// //                       ) : userAlreadyClaimed ? (
// //                         <div className="px-4 py-2 rounded-lg bg-yellow-700/20 text-yellow-300 font-semibold">You have a pending claim</div>
// //                       ) : null
// //                     ) : (
// //                       <Link to="/login" className="px-4 py-2 rounded-lg bg-white/5 border border-white/6">Log in to claim</Link>
// //                     )}
// //                   </>
// //                 )}
// //               </div>
// //             </div>

// //             {/* AI Insights & Metadata (right panel style) */}
// //             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

// //               <div className="rounded-2xl p-5 bg-white/3 border border-white/6 backdrop-blur-xl shadow-lg">
// //                 <h3 className="text-lg font-semibold text-white mb-3">AI Insights</h3>

// //                 {item.ai_metadata?.has_PII && (
// //                   <div className="mb-3 text-sm text-red-400 font-semibold">
// //                     Sensitive info detected — image blurred for privacy.
// //                   </div>
// //                 )}

// //                 <div className="space-y-2 text-gray-200 text-sm">
// //                   {item.ai_metadata?.brand && item.ai_metadata.brand !== 'N/A' && <div><span className="font-semibold text-white">Brand:</span> {item.ai_metadata.brand}</div>}
// //                   {item.ai_metadata?.color && item.ai_metadata.color !== 'N/A' && <div><span className="font-semibold text-white">Color:</span> {item.ai_metadata.color}</div>}
// //                   {item.ai_metadata?.condition && item.ai_metadata.condition !== 'Unknown' && <div><span className="font-semibold text-white">Condition:</span> {item.ai_metadata.condition}</div>}
// //                   {item.ai_metadata?.tags && item.ai_metadata.tags.length > 0 && item.ai_metadata.tags[0] !== 'unknown' && <div><span className="font-semibold text-white">Tags:</span> {item.ai_metadata.tags.join(', ')}</div>}
// //                   {(!item.ai_metadata?.brand || item.ai_metadata.brand === 'N/A') &&
// //                    (!item.ai_metadata?.color || item.ai_metadata.color === 'N/A') &&
// //                    (!item.ai_metadata?.condition || item.ai_metadata.condition === 'Unknown') &&
// //                    (!item.ai_metadata?.tags || item.ai_metadata.tags.length === 0 || item.ai_metadata.tags[0] === 'unknown') && (
// //                     <div className="italic text-gray-400">No specific AI insights available.</div>
// //                   )}
// //                 </div>
// //               </div>

// //               <div className="rounded-2xl p-5 bg-gradient-to-br from-white/3 to-white/6 border border-white/6 backdrop-blur-xl shadow-lg">
// //                 <h3 className="text-lg font-semibold text-white mb-3">Finder Info</h3>
// //                 <p className="text-sm text-gray-200"><span className="font-semibold text-white">Name:</span> {item.finder_id?.name || 'N/A'}</p>
// //                 {item.finder_id?.phone && <p className="text-sm text-gray-200 mt-1"><span className="font-semibold text-white">Phone:</span> {item.finder_id.phone}</p>}
// //                 {item.finder_id?.email && <p className="text-sm text-gray-200 mt-1"><span className="font-semibold text-white">Email:</span> {item.finder_id.email}</p>}

// //                 {/* small status */}
// //                 <div className="mt-4 text-xs text-gray-400">
// //                   Reported on {new Date(item.createdAt).toLocaleString()}
// //                 </div>
// //               </div>

// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Claim Modal */}
// //       <Modal isOpen={showClaimModal} onClose={() => setShowClaimModal(false)} title={`Claim for "${item.title}"`}>
// //         <form onSubmit={handleClaimSubmit} className="space-y-4">
// //           <p className="text-gray-200">To claim this item, answer the finder's proof question:</p>
// //           <div className="bg-black/30 p-4 rounded-md border border-white/6">
// //             <p className="font-semibold text-white">{item.proof_question}</p>
// //           </div>

// //           <div>
// //             <label htmlFor="proofAnswer" className="block text-sm text-gray-300 mb-2">Your Answer</label>
// //             <textarea
// //               id="proofAnswer"
// //               rows="4"
// //               value={claimProofAnswer}
// //               onChange={(e) => setClaimProofAnswer(e.target.value)}
// //               className="w-full rounded-md p-3 bg-black/40 border border-white/6 text-white placeholder-gray-400 focus:outline-none"
// //               required
// //             />
// //           </div>

// //           {claimSubmissionError && (
// //             <div className="text-red-400 text-sm">{claimSubmissionError}</div>
// //           )}

// //           <div className="flex justify-end gap-3">
// //             <button
// //               type="button"
// //               onClick={() => setShowClaimModal(false)}
// //               className="px-4 py-2 rounded-md bg-white/6 hover:bg-white/8"
// //               disabled={claimSubmissionLoading}
// //             >
// //               Cancel
// //             </button>
// //             <button
// //               type="submit"
// //               className="px-4 py-2 rounded-md bg-gradient-to-r from-green-400 to-blue-400 font-semibold"
// //               disabled={claimSubmissionLoading}
// //             >
// //               {claimSubmissionLoading ? 'Submitting...' : 'Submit Claim'}
// //             </button>
// //           </div>
// //         </form>
// //       </Modal>
// //     </div>
// //   );
// // };

// // export default ItemDetailPage;

// // client/src/pages/ItemDetailPage.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import Modal from "../components/Modal";

// // local fallback image uploaded earlier (keeps existing behavior)
// const FALLBACK_IMAGE = "/mnt/data/f2880d50-58f3-4e9e-a7b5-99c69577b08c.png";

// const ItemDetailPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { user, API_BASE_URL } = useAuth();

//   const [item, setItem] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Claim modal state
//   const [showClaimModal, setShowClaimModal] = useState(false);
//   const [claimProofAnswer, setClaimProofAnswer] = useState("");
//   const [claimSubmissionError, setClaimSubmissionError] = useState("");
//   const [claimSubmissionLoading, setClaimSubmissionLoading] = useState(false);
//   const [userAlreadyClaimed, setUserAlreadyClaimed] = useState(false);

//   // Cloudinary blur helper
//   const cloudinaryUrlWithBlur = (publicId) => {
//     const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
//     if (!CLOUDINARY_CLOUD_NAME) {
//       // fallback to stored url or local fallback
//       return item?.images?.find((img) => img.public_id === publicId)?.url || FALLBACK_IMAGE;
//     }
//     return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/e_blur:1000,f_auto,q_auto/${publicId}.webp`;
//   };

//   useEffect(() => {
//     const fetchItemAndCheckClaim = async () => {
//       try {
//         setLoading(true);
//         const { data } = await axios.get(`${API_BASE_URL}/items/${id}`);
//         setItem(data);
//         setLoading(false);

//         // If logged in and item is found/open and finder isn't current user, check existing claims
//         if (user && data.type === "FOUND" && data.status === "OPEN" && data.finder_id?._id !== user._id) {
//           const config = { headers: { Authorization: `Bearer ${user.token}` } };
//           const { data: myClaims } = await axios.get(`${API_BASE_URL}/claims/my`, config);
//           const hasPendingClaim = myClaims.some(
//             (claim) => claim.found_item?._id === data._id && claim.status === "PENDING"
//           );
//           setUserAlreadyClaimed(hasPendingClaim);
//         }
//       } catch (err) {
//         console.error(err);
//         setError("Failed to fetch item. Item might not exist or network error.");
//         setLoading(false);
//       }
//     };

//     fetchItemAndCheckClaim();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [id, user, API_BASE_URL]);

//   const handleDelete = async () => {
//     if (!window.confirm("Delete this item? This cannot be undone.")) return;
//     try {
//       const config = { headers: { Authorization: `Bearer ${user.token}` } };
//       await axios.delete(`${API_BASE_URL}/items/${id}`, config);
//       alert("Item deleted successfully.");
//       navigate("/items");
//     } catch (err) {
//       console.error(err);
//       setError("Failed to delete item. You might not be authorized or network error.");
//     }
//   };

//   const handleClaimSubmit = async (e) => {
//     e.preventDefault();
//     setClaimSubmissionError("");
//     setClaimSubmissionLoading(true);

//     if (!claimProofAnswer.trim()) {
//       setClaimSubmissionError("Please provide an answer to the proof question.");
//       setClaimSubmissionLoading(false);
//       return;
//     }

//     try {
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${user.token}`,
//         },
//       };
//       const claimData = {
//         found_item_id: item._id,
//         proof_answer: claimProofAnswer,
//       };

//       await axios.post(`${API_BASE_URL}/claims`, claimData, config);
//       alert("Claim submitted successfully! Finder has been notified.");
//       setShowClaimModal(false);
//       setClaimProofAnswer("");
//       setUserAlreadyClaimed(true);
//       navigate("/my-claims");
//     } catch (err) {
//       console.error(err);
//       setClaimSubmissionError(err.response?.data?.message || "Failed to submit claim.");
//     } finally {
//       setClaimSubmissionLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-black text-gray-300">
//         <div className="text-center space-y-4">
//           <div className="w-20 h-20 rounded-full animate-pulse bg-gradient-to-r from-gray-400/20 to-gray-500/20 shadow-inner mx-auto"></div>
//           <p className="text-lg">Loading item details...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-black">
//         <p className="text-red-400 text-lg">{error}</p>
//       </div>
//     );
//   }

//   if (!item) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-black">
//         <p className="text-gray-300 text-lg">Item not found.</p>
//       </div>
//     );
//   }

//   const isFinder = user && item.finder_id?._id === user._id;
//   const imageUrlToDisplay = item.images?.[0]?.isBlurred
//     ? cloudinaryUrlWithBlur(item.images[0].public_id)
//     : item.images?.[0]?.url || FALLBACK_IMAGE;

//   const canClaim = user && item.type === "FOUND" && item.status === "OPEN" && !isFinder && !userAlreadyClaimed;

//   return (
//     <div className="min-h-screen bg-black text-white relative overflow-hidden pb-20">
//       {/* Soft background vignette */}
//       <div className="pointer-events-none fixed inset-0 -z-10">
//         <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black/90"></div>
//       </div>

//       <div className="container mx-auto px-6 lg:px-12 py-14">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

//           {/* LEFT: Image */}
//           <div className="lg:col-span-1">
//             <div className="rounded-2xl overflow-hidden border border-white/6 bg-white/4 backdrop-blur-md p-1 shadow-lg animate-fadeUp">
//               <div className="bg-black/60 p-3 rounded-xl">
//                 <div className="relative rounded-lg overflow-hidden">
//                   <img
//                     src={imageUrlToDisplay}
//                     alt={item.title}
//                     className="w-full h-96 object-contain bg-black rounded-lg transition-transform duration-500 hover:scale-[1.02]"
//                   />

//                   {item.images?.[0]?.isBlurred && (
//                     <div className="absolute top-3 left-3 bg-black/50 px-3 py-1 rounded-full text-xs text-gray-200 border border-white/8">
//                       Blurred for privacy
//                     </div>
//                   )}

//                   <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-60"></div>
//                 </div>
//               </div>
//             </div>

//             <div className="mt-5 flex gap-3">
//               <Link
//                 to="/items"
//                 className="flex-1 text-center py-2 rounded-lg bg-white/5 border border-white/8 hover:bg-white/6 transition font-semibold"
//               >
//                 Back to listings
//               </Link>

//               {isFinder && (
//                 <button
//                   onClick={() => navigate(`/items/${item._id}/edit`)}
//                   className="px-4 py-2 rounded-lg bg-gradient-to-r from-gray-600 to-gray-500 hover:brightness-95 transition font-semibold text-white"
//                 >
//                   Edit
//                 </button>
//               )}
//             </div>
//           </div>

//           {/* CENTER+RIGHT: Details */}
//           <div className="lg:col-span-2 space-y-6">

//             {/* Title card */}
//             <div className="rounded-2xl p-6 bg-white/6 backdrop-blur-md border border-white/8 shadow-lg animate-fadeUp">
//               <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
//                 <div>
//                   <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
//                     {item.title}
//                   </h1>
//                   <div className="mt-3 flex items-center gap-3">
//                     <span
//                       className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                         item.type === "LOST" ? "bg-red-600/20 text-red-300" : "bg-green-600/20 text-green-300"
//                       }`}
//                     >
//                       {item.type}
//                     </span>
//                     <span className="text-sm text-gray-300">{item.category}</span>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-3">
//                   <p className="text-sm text-gray-400">Status:</p>
//                   <span className="text-sm font-semibold text-white/90">{item.status}</span>
//                 </div>
//               </div>

//               <p className="mt-5 text-gray-200 text-lg leading-relaxed">{item.description}</p>

//               <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-300">
//                 <div>
//                   <span className="font-semibold text-white">Campus:</span> {item.location.campus}
//                 </div>
//                 <div>
//                   <span className="font-semibold text-white">Spot:</span> {item.location.specific_spot}
//                 </div>
//                 <div>
//                   <span className="font-semibold text-white">Reported:</span> {new Date(item.createdAt).toLocaleDateString()}
//                 </div>
//               </div>

//               <div className="mt-6 flex flex-wrap items-center gap-4">
//                 {item.finder_id?.email && (
//                   <a
//                     href={`mailto:${item.finder_id.email}`}
//                     className="px-4 py-2 rounded-lg bg-white/5 border border-white/8 hover:bg-white/6 transition font-medium"
//                   >
//                     Contact Finder
//                   </a>
//                 )}

//                 {isFinder && (
//                   <>
//                     <button
//                       onClick={() => navigate(`/items/${item._id}/edit`)}
//                       className="px-4 py-2 rounded-lg bg-gray-700/80 hover:brightness-95 transition font-semibold text-white"
//                     >
//                       Edit Item
//                     </button>
//                     <button
//                       onClick={handleDelete}
//                       className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition font-semibold text-white"
//                     >
//                       Delete
//                     </button>
//                   </>
//                 )}

//                 {!isFinder && item.type === "FOUND" && item.status === "OPEN" && (
//                   <>
//                     {user ? (
//                       canClaim ? (
//                         <button
//                           onClick={() => setShowClaimModal(true)}
//                           className="px-4 py-2 rounded-lg bg-gradient-to-r from-gray-600 to-gray-400 hover:brightness-95 transition font-semibold text-white"
//                         >
//                           Claim This Item
//                         </button>
//                       ) : userAlreadyClaimed ? (
//                         <div className="px-4 py-2 rounded-lg bg-yellow-700/20 text-yellow-300 font-semibold">You have a pending claim</div>
//                       ) : null
//                     ) : (
//                       <Link to="/login" className="px-4 py-2 rounded-lg bg-white/5 border border-white/8">Log in to claim</Link>
//                     )}
//                   </>
//                 )}
//               </div>
//             </div>

//             {/* AI Insights + Finder Info */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               <div className="rounded-2xl p-5 bg-white/5 border border-white/8 backdrop-blur-md shadow-md">
//                 <h3 className="text-lg font-semibold text-white mb-3">AI Insights</h3>

//                 {item.ai_metadata?.has_PII && (
//                   <div className="mb-3 text-sm text-red-400 font-semibold">
//                     Sensitive info detected — image blurred for privacy.
//                   </div>
//                 )}

//                 <div className="space-y-2 text-gray-200 text-sm">
//                   {item.ai_metadata?.brand && item.ai_metadata.brand !== "N/A" && (
//                     <div><span className="font-semibold text-white">Brand:</span> {item.ai_metadata.brand}</div>
//                   )}
//                   {item.ai_metadata?.color && item.ai_metadata.color !== "N/A" && (
//                     <div><span className="font-semibold text-white">Color:</span> {item.ai_metadata.color}</div>
//                   )}
//                   {item.ai_metadata?.condition && item.ai_metadata.condition !== "Unknown" && (
//                     <div><span className="font-semibold text-white">Condition:</span> {item.ai_metadata.condition}</div>
//                   )}
//                   {item.ai_metadata?.tags && item.ai_metadata.tags.length > 0 && item.ai_metadata.tags[0] !== "unknown" && (
//                     <div><span className="font-semibold text-white">Tags:</span> {item.ai_metadata.tags.join(", ")}</div>
//                   )}

//                   {(!item.ai_metadata?.brand || item.ai_metadata.brand === "N/A") &&
//                    (!item.ai_metadata?.color || item.ai_metadata.color === "N/A") &&
//                    (!item.ai_metadata?.condition || item.ai_metadata.condition === "Unknown") &&
//                    (!item.ai_metadata?.tags || item.ai_metadata.tags.length === 0 || item.ai_metadata.tags[0] === "unknown") && (
//                     <div className="italic text-gray-400">No specific AI insights available.</div>
//                   )}
//                 </div>
//               </div>

//               <div className="rounded-2xl p-5 bg-white/5 border border-white/8 backdrop-blur-md shadow-md">
//                 <h3 className="text-lg font-semibold text-white mb-3">Finder Info</h3>
//                 <p className="text-sm text-gray-200"><span className="font-semibold text-white">Name:</span> {item.finder_id?.name || "N/A"}</p>
//                 {item.finder_id?.phone && <p className="text-sm text-gray-200 mt-1"><span className="font-semibold text-white">Phone:</span> {item.finder_id.phone}</p>}
//                 {item.finder_id?.email && <p className="text-sm text-gray-200 mt-1"><span className="font-semibold text-white">Email:</span> {item.finder_id.email}</p>}

//                 <div className="mt-4 text-xs text-gray-400">
//                   Reported on {new Date(item.createdAt).toLocaleString()}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Claim Modal */}
//       <Modal isOpen={showClaimModal} onClose={() => setShowClaimModal(false)} title={`Claim for "${item.title}"`}>
//         <form onSubmit={handleClaimSubmit} className="space-y-4">
//           <p className="text-gray-200">To claim this item, answer the finder's proof question:</p>
//           <div className="bg-black/20 p-4 rounded-md border border-white/8">
//             <p className="font-semibold text-white">{item.proof_question}</p>
//           </div>

//           <div>
//             <label htmlFor="proofAnswer" className="block text-sm text-gray-300 mb-2">Your Answer</label>
//             <textarea
//               id="proofAnswer"
//               rows="4"
//               value={claimProofAnswer}
//               onChange={(e) => setClaimProofAnswer(e.target.value)}
//               className="w-full rounded-md p-3 bg-black/40 border border-white/8 text-white placeholder-gray-400 focus:outline-none"
//               required
//             />
//           </div>

//           {claimSubmissionError && (
//             <div className="text-red-400 text-sm">{claimSubmissionError}</div>
//           )}

//           <div className="flex justify-end gap-3">
//             <button
//               type="button"
//               onClick={() => setShowClaimModal(false)}
//               className="px-4 py-2 rounded-md bg-white/6 hover:bg-white/8"
//               disabled={claimSubmissionLoading}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 rounded-md bg-gray-700/80 font-semibold text-white"
//               disabled={claimSubmissionLoading}
//             >
//               {claimSubmissionLoading ? "Submitting..." : "Submit Claim"}
//             </button>
//           </div>
//         </form>
//       </Modal>
//     </div>
//   );
// };

// export default ItemDetailPage;
// client/src/pages/ItemDetailPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Modal from "../components/Modal";
import { 
  MapPinIcon, 
  CalendarDaysIcon, 
  CpuChipIcon, 
  UserCircleIcon, 
  ShieldCheckIcon, 
  ExclamationTriangleIcon, 
  TagIcon,
  ArrowLeftIcon,
  PencilSquareIcon,
  TrashIcon,
  FingerPrintIcon
} from "@heroicons/react/24/outline";

// Local fallback image
const FALLBACK_IMAGE = "/mnt/data/f2880d50-58f3-4e9e-a7b5-99c69577b08c.png";

// --- Animation Styles ---
const customStyles = `
  @keyframes float {
    0% { transform: translate(0px, 0px) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
    100% { transform: translate(0px, 0px) scale(1); }
  }
  .animate-blob {
    animation: float 7s infinite;
  }
  .animation-delay-2000 {
    animation-delay: 2s;
  }
  .scanline {
    width: 100%;
    height: 2px;
    background: rgba(6, 182, 212, 0.5);
    position: absolute;
    top: 0;
    left: 0;
    animation: scan 3s linear infinite;
    box-shadow: 0 0 10px rgba(6, 182, 212, 0.8);
  }
  @keyframes scan {
    0% { top: 0%; opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { top: 100%; opacity: 0; }
  }
`;

const ItemDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, API_BASE_URL } = useAuth();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Claim modal state
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [claimProofAnswer, setClaimProofAnswer] = useState("");
  const [claimSubmissionError, setClaimSubmissionError] = useState("");
  const [claimSubmissionLoading, setClaimSubmissionLoading] = useState(false);
  const [userAlreadyClaimed, setUserAlreadyClaimed] = useState(false);

  // Cloudinary blur helper
  const cloudinaryUrlWithBlur = (publicId) => {
    const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    if (!CLOUDINARY_CLOUD_NAME) {
      return item?.images?.find((img) => img.public_id === publicId)?.url || FALLBACK_IMAGE;
    }
    return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/e_blur:1000,f_auto,q_auto/${publicId}.webp`;
  };

  useEffect(() => {
    const fetchItemAndCheckClaim = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${API_BASE_URL}/items/${id}`);
        setItem(data);
        setLoading(false);

        if (user && data.type === "FOUND" && data.status === "OPEN" && data.finder_id?._id !== user._id) {
          const config = { headers: { Authorization: `Bearer ${user.token}` } };
          const { data: myClaims } = await axios.get(`${API_BASE_URL}/claims/my`, config);
          const hasPendingClaim = myClaims.some(
            (claim) => claim.found_item?._id === data._id && claim.status === "PENDING"
          );
          setUserAlreadyClaimed(hasPendingClaim);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch item. Item might not exist or network error.");
        setLoading(false);
      }
    };

    fetchItemAndCheckClaim();
  }, [id, user, API_BASE_URL]);

  const handleDelete = async () => {
    if (!window.confirm("Delete this item? This cannot be undone.")) return;
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.delete(`${API_BASE_URL}/items/${id}`, config);
      navigate("/items");
    } catch (err) {
      console.error(err);
      setError("Failed to delete item.");
    }
  };

  const handleClaimSubmit = async (e) => {
    e.preventDefault();
    setClaimSubmissionError("");
    setClaimSubmissionLoading(true);

    if (!claimProofAnswer.trim()) {
      setClaimSubmissionError("Please provide an answer to the proof question.");
      setClaimSubmissionLoading(false);
      return;
    }

    try {
      const config = {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${user.token}` },
      };
      const claimData = { found_item_id: item._id, proof_answer: claimProofAnswer };

      await axios.post(`${API_BASE_URL}/claims`, claimData, config);
      setShowClaimModal(false);
      setClaimProofAnswer("");
      setUserAlreadyClaimed(true);
      navigate("/my-claims");
    } catch (err) {
      console.error(err);
      setClaimSubmissionError(err.response?.data?.message || "Failed to submit claim.");
    } finally {
      setClaimSubmissionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a12]">
         <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4"></div>
         <p className="text-cyan-400 font-mono animate-pulse">Accessing Secure Database...</p>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a12] text-red-400 font-mono border border-red-500/20 bg-red-500/5">
        <ExclamationTriangleIcon className="w-6 h-6 mr-2" />
        {error || "Item not found in database."}
      </div>
    );
  }

  const isFinder = user && item.finder_id?._id === user._id;
  const imageUrlToDisplay = item.images?.[0]?.isBlurred
    ? cloudinaryUrlWithBlur(item.images[0].public_id)
    : item.images?.[0]?.url || FALLBACK_IMAGE;

  const canClaim = user && item.type === "FOUND" && item.status === "OPEN" && !isFinder && !userAlreadyClaimed;

  return (
    <div className="relative min-h-screen w-full bg-[#0a0a12] text-white overflow-hidden font-sans selection:bg-purple-500/30 pb-20  pt-[40px]">
      <style>{customStyles}</style>

      {/* --- Background FX --- */}
      <div className="fixed inset-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-cyan-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 lg:px-8 py-10">
        
        {/* Breadcrumb / Back */}
        <div className="mb-8">
          <Link to="/items" className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors font-mono text-sm">
            <ArrowLeftIcon className="w-4 h-4" /> BACK_TO_LISTINGS
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* LEFT COL: Evidence Scanner (Image) */}
          <div className="lg:col-span-1 space-y-6">
            <div className="relative rounded-2xl overflow-hidden bg-[#0f0f16] border border-white/10 shadow-2xl group">
              {/* Scanner Overlay */}
              <div className="absolute inset-0 pointer-events-none z-20 border-[1px] border-cyan-500/30 rounded-2xl">
                <div className="absolute top-0 left-0 p-2 border-l-2 border-t-2 border-cyan-500 w-8 h-8 rounded-tl-lg"></div>
                <div className="absolute top-0 right-0 p-2 border-r-2 border-t-2 border-cyan-500 w-8 h-8 rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 p-2 border-l-2 border-b-2 border-cyan-500 w-8 h-8 rounded-bl-lg"></div>
                <div className="absolute bottom-0 right-0 p-2 border-r-2 border-b-2 border-cyan-500 w-8 h-8 rounded-br-lg"></div>
                <div className="scanline opacity-50"></div>
              </div>

              {/* Image */}
              <div className="relative aspect-[4/5] bg-black">
                 <img
                  src={imageUrlToDisplay}
                  alt={item.title}
                  className={`w-full h-full object-cover opacity-90 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100 ${item.images?.[0]?.isBlurred ? 'blur-sm brightness-50' : ''}`}
                />
                {item.images?.[0]?.isBlurred && (
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="bg-red-500/20 border border-red-500/50 backdrop-blur-md px-6 py-3 rounded-lg flex items-center gap-2 text-red-300 font-bold animate-pulse">
                      <ExclamationTriangleIcon className="w-6 h-6" />
                      PII DETECTED - REDACTED
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons for Finder */}
            {isFinder && (
              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => navigate(`/items/${item._id}/edit`)} className="flex items-center justify-center gap-2 py-3 bg-gray-800 hover:bg-gray-700 border border-white/10 rounded-xl text-sm font-bold text-gray-300 transition-all">
                  <PencilSquareIcon className="w-4 h-4" /> Edit
                </button>
                <button onClick={handleDelete} className="flex items-center justify-center gap-2 py-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-xl text-sm font-bold text-red-400 transition-all">
                  <TrashIcon className="w-4 h-4" /> Delete
                </button>
              </div>
            )}
          </div>

          {/* RIGHT COL: Data Log */}
          <div className="lg:col-span-2 space-y-6">

            {/* Main Info Card */}
            <div className="rounded-3xl p-8 bg-[#13131f]/60 backdrop-blur-xl border border-white/10 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
              
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6 relative z-10">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider border ${item.type === 'LOST' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'}`}>
                      {item.type}
                    </span>
                    <span className="text-xs text-cyan-400 font-mono bg-cyan-500/10 px-2 py-1 rounded border border-cyan-500/20">
                      {item.category}
                    </span>
                  </div>
                  <h1 className="text-4xl font-black text-white leading-tight">{item.title}</h1>
                </div>
                
                {/* Status Indicator */}
                <div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-full border border-white/10">
                   <div className={`w-2 h-2 rounded-full ${item.status === 'OPEN' ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></div>
                   <span className="text-sm font-bold text-gray-300 uppercase">{item.status}</span>
                </div>
              </div>

              <p className="text-lg text-gray-300 leading-relaxed mb-8 border-l-2 border-purple-500/50 pl-4">
                {item.description}
              </p>

              {/* Location Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <div className="text-gray-500 text-xs uppercase mb-1 flex items-center gap-1"><MapPinIcon className="w-3 h-3"/> Campus</div>
                  <div className="text-white font-semibold">{item.location.campus}</div>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <div className="text-gray-500 text-xs uppercase mb-1 flex items-center gap-1"><MapPinIcon className="w-3 h-3"/> Specific Spot</div>
                  <div className="text-white font-semibold">{item.location.specific_spot}</div>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                   <div className="text-gray-500 text-xs uppercase mb-1 flex items-center gap-1"><CalendarDaysIcon className="w-3 h-3"/> Date Reported</div>
                   <div className="text-white font-semibold">{new Date(item.createdAt).toLocaleDateString()}</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-white/5">
                 {!isFinder && item.type === "FOUND" && item.status === "OPEN" && (
                    <>
                      {user ? (
                        canClaim ? (
                          <button
                            onClick={() => setShowClaimModal(true)}
                            className="flex-1 md:flex-none px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-xl shadow-lg shadow-purple-500/20 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                          >
                            <FingerPrintIcon className="w-5 h-5" /> Claim Item
                          </button>
                        ) : userAlreadyClaimed ? (
                          <div className="flex-1 md:flex-none px-6 py-3 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 rounded-xl font-bold text-center">
                             Claim Pending Review
                          </div>
                        ) : null
                      ) : (
                        <Link to="/login" className="flex-1 md:flex-none px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-bold text-center transition-all">
                          Log in to Claim
                        </Link>
                      )}
                    </>
                  )}
                  
                  {item.finder_id?.email && !isFinder && (
                    <a href={`mailto:${item.finder_id.email}`} className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-bold transition-all flex items-center gap-2">
                      <UserCircleIcon className="w-5 h-5" /> Contact Finder
                    </a>
                  )}
              </div>
            </div>

            {/* AI HUD & Finder Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* AI HUD */}
              <div className="rounded-2xl p-6 bg-black/40 border border-cyan-500/20 relative overflow-hidden font-mono">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
                <h3 className="text-cyan-400 font-bold mb-4 flex items-center gap-2">
                  <CpuChipIcon className="w-5 h-5" /> SYSTEM_ANALYSIS
                </h3>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-500">Detected Brand</span>
                    <span className="text-cyan-100">{item.ai_metadata?.brand !== "N/A" ? item.ai_metadata?.brand : "Unknown"}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-500">Color Profile</span>
                    <span className="text-cyan-100">{item.ai_metadata?.color !== "N/A" ? item.ai_metadata?.color : "Unknown"}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-500">Condition</span>
                    <span className="text-cyan-100">{item.ai_metadata?.condition !== "Unknown" ? item.ai_metadata?.condition : "N/A"}</span>
                  </div>
                  
                  <div className="pt-2">
                    <span className="text-gray-500 block mb-2 text-xs">Analysis Tags</span>
                    <div className="flex flex-wrap gap-2">
                      {item.ai_metadata?.tags?.length > 0 && item.ai_metadata.tags[0] !== "unknown" ? (
                        item.ai_metadata.tags.map((tag, i) => (
                          <span key={i} className="px-2 py-1 text-[10px] bg-cyan-900/30 text-cyan-300 border border-cyan-500/20 rounded">
                            #{tag}
                          </span>
                        ))
                      ) : <span className="text-gray-600 text-xs">No tags generated</span>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Finder Profile */}
              <div className="rounded-2xl p-6 bg-[#13131f]/60 border border-white/10 flex flex-col justify-center">
                <h3 className="text-gray-400 font-bold uppercase text-xs tracking-widest mb-4">Reported By</h3>
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {item.finder_id?.name?.[0] || "?"}
                   </div>
                   <div>
                      <p className="text-white font-bold text-lg">{item.finder_id?.name || "Anonymous"}</p>
                      <p className="text-gray-500 text-sm flex items-center gap-1">
                        <ShieldCheckIcon className="w-4 h-4 text-emerald-500"/> Verified Student
                      </p>
                   </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Claim Modal Customization */}
      <Modal isOpen={showClaimModal} onClose={() => setShowClaimModal(false)} title="Ownership Verification">
        <div className="bg-[#0a0a12] p-1"> {/* Wrapper to enforce dark theme inside modal if portal is outside */}
          <form onSubmit={handleClaimSubmit} className="space-y-6">
            <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl">
               <p className="text-xs text-yellow-500 uppercase font-bold mb-1">Security Question from Finder</p>
               <p className="text-white font-medium text-lg">"{item.proof_question}"</p>
            </div>

            <div className="space-y-2">
              <label htmlFor="proofAnswer" className="block text-sm text-gray-400 font-bold uppercase">Provide Proof</label>
              <textarea
                id="proofAnswer"
                rows="4"
                value={claimProofAnswer}
                onChange={(e) => setClaimProofAnswer(e.target.value)}
                placeholder="Describe unique features, contents, or circumstances..."
                className="w-full rounded-xl p-4 bg-[#13131f] border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                required
              />
            </div>

            {claimSubmissionError && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm flex items-center gap-2">
                 <ExclamationTriangleIcon className="w-4 h-4"/> {claimSubmissionError}
              </div>
            )}

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowClaimModal(false)}
                className="px-4 py-2 rounded-lg text-gray-400 hover:text-white transition-colors"
                disabled={claimSubmissionLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold shadow-lg shadow-purple-500/25 transition-all"
                disabled={claimSubmissionLoading}
              >
                {claimSubmissionLoading ? "Verifying..." : "Submit Proof"}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default ItemDetailPage;
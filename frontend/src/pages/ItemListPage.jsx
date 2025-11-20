// // // // // client/src/pages/ItemListPage.jsx
// // // // import React, { useEffect, useState } from 'react';
// // // // import axios from 'axios';
// // // // import { Link } from 'react-router-dom';
// // // // import { useAuth } from '../context/AuthContext';

// // // // const ItemListPage = () => {
// // // //   const [items, setItems] = useState([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [error, setError] = useState('');
// // // //   const { API_BASE_URL } = useAuth(); // Get API_BASE_URL from context

// // // //   useEffect(() => {
// // // //     const fetchItems = async () => {
// // // //       try {
// // // //         const { data } = await axios.get(`${API_BASE_URL}/items`);
// // // //         setItems(data);
// // // //         setLoading(false);
// // // //       } catch (err) {
// // // //         setError('Failed to fetch items. Please try again later.');
// // // //         setLoading(false);
// // // //         console.error(err);
// // // //       }
// // // //     };

// // // //     fetchItems();
// // // //   }, [API_BASE_URL]);

// // // //   if (loading) {
// // // //     return (
// // // //       <div className="min-h-screen flex items-center justify-center text-xl text-gray-600">
// // // //         Loading items...
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

// // // //   return (
// // // //     <div className="container mx-auto p-4 py-8">
// // // //       <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Lost & Found Items</h1>
// // // //       {items.length === 0 ? (
// // // //         <p className="text-center text-gray-600 text-lg">No items reported yet. Be the first to report one!</p>
// // // //       ) : (
// // // //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // // //           {items.map((item) => (
// // // //             <div key={item._id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 duration-300">
// // // //               <Link to={`/items/${item._id}`}>
// // // //                 <img
// // // //                   src={item.images[0]?.url || 'https://via.placeholder.com/400x300?text=No+Image'}
// // // //                   alt={item.title}
// // // //                   className="w-full h-48 object-cover"
// // // //                 />
// // // //               </Link>
// // // //               <div className="p-4">
// // // //                 <h2 className="text-xl font-semibold text-gray-800 mb-2">
// // // //                   <Link to={`/items/${item._id}`} className="hover:text-indigo-600">{item.title}</Link>
// // // //                 </h2>
// // // //                 <p className="text-sm text-gray-600 mb-2">
// // // //                   <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
// // // //                     item.type === 'LOST' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
// // // //                   }`}>
// // // //                     {item.type}
// // // //                   </span>
// // // //                   <span className="ml-2 text-gray-500">
// // // //                      {item.category}
// // // //                   </span>
// // // //                 </p>
// // // //                 <p className="text-gray-700 text-base mb-3 line-clamp-2">{item.description}</p>
// // // //                 <p className="text-gray-500 text-sm">
// // // //                   Found/Lost at: <span className="font-medium">{item.location.specific_spot}, {item.location.campus}</span>
// // // //                 </p>
// // // //                 <p className="text-gray-500 text-xs mt-1">
// // // //                   Reported by: <span className="font-medium">{item.finder_id?.name || 'N/A'}</span> on {new Date(item.createdAt).toLocaleDateString()}
// // // //                 </p>
// // // //               </div>
// // // //             </div>
// // // //           ))}
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default ItemListPage;
// // // // client/src/pages/ItemListPage.jsx
// // // import React, { useEffect, useState } from 'react';
// // // import axios from 'axios';
// // // import { Link, useSearchParams } from 'react-router-dom'; // Import useSearchParams
// // // import { useAuth } from '../context/AuthContext';

// // // const ItemListPage = () => {
// // //   const [items, setItems] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState('');
// // //   const [searchQuery, setSearchQuery] = useState(''); // State for search input
// // //   const [searchParams, setSearchParams] = useSearchParams(); // Hook for URL query params

// // //   const { API_BASE_URL } = useAuth();

// // //   useEffect(() => {
// // //     const fetchItems = async () => {
// // //       setLoading(true);
// // //       setError('');
// // //       try {
// // //         const query = searchParams.get('query'); // Get query from URL
// // //         let url = `${API_BASE_URL}/items`;

// // //         if (query) {
// // //           url = `${API_BASE_URL}/items/search?query=${encodeURIComponent(query)}`;
// // //           setSearchQuery(query); // Update search input if query from URL
// // //         } else {
// // //           setSearchQuery(''); // Clear search input if no query in URL
// // //         }

// // //         const { data } = await axios.get(url);
// // //         setItems(data);
// // //       } catch (err) {
// // //         setError('Failed to fetch items. Please try again later.');
// // //         console.error(err);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchItems();
// // //   }, [API_BASE_URL, searchParams]); // Rerun effect when searchParams change

// // //   const handleSearchSubmit = (e) => {
// // //     e.preventDefault();
// // //     if (searchQuery.trim()) {
// // //       setSearchParams({ query: searchQuery.trim() }); // Update URL with search query
// // //     } else {
// // //       setSearchParams({}); // Clear query from URL
// // //     }
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <div className="min-h-screen flex items-center justify-center text-xl text-gray-600">
// // //         Loading items...
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

// // //   return (
// // //     <div className="container mx-auto p-4 py-8">
// // //       <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Lost & Found Items</h1>

// // //       {/* Search Bar */}
// // //       <form onSubmit={handleSearchSubmit} className="mb-8 flex justify-center">
// // //         <input
// // //           type="text"
// // //           placeholder="Search for items (e.g., 'red Nike t-shirt', 'lost wallet')"
// // //           value={searchQuery}
// // //           onChange={(e) => setSearchQuery(e.target.value)}
// // //           className="w-full max-w-lg p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
// // //         />
// // //         <button
// // //           type="submit"
// // //           className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-r-lg font-semibold transition duration-300"
// // //         >
// // //           Search
// // //         </button>
// // //       </form>


// // //       {items.length === 0 && searchParams.get('query') ? (
// // //         <p className="text-center text-gray-600 text-lg">No items found for "{searchParams.get('query')}". Try a different search!</p>
// // //       ) : items.length === 0 && !searchParams.get('query') ? (
// // //         <p className="text-center text-gray-600 text-lg">No items reported yet. Be the first to report one!</p>
// // //       ) : (
// // //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // //           {items.map((item) => (
// // //             <div key={item._id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 duration-300">
// // //               <Link to={`/items/${item._id}`}>
// // //                 <img
// // //                   src={item.images[0]?.url || 'https://via.placeholder.com/400x300?text=No+Image'}
// // //                   alt={item.title}
// // //                   className="w-full h-48 object-cover"
// // //                 />
// // //               </Link>
// // //               <div className="p-4">
// // //                 <h2 className="text-xl font-semibold text-gray-800 mb-2">
// // //                   <Link to={`/items/${item._id}`} className="hover:text-indigo-600">{item.title}</Link>
// // //                 </h2>
// // //                 <p className="text-sm text-gray-600 mb-2">
// // //                   <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
// // //                     item.type === 'LOST' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
// // //                   }`}>
// // //                     {item.type}
// // //                   </span>
// // //                   <span className="ml-2 text-gray-500">
// // //                      {item.category}
// // //                   </span>
// // //                 </p>
// // //                 <p className="text-gray-700 text-base mb-3 line-clamp-2">{item.description}</p>
// // //                 <p className="text-gray-500 text-sm">
// // //                   Found/Lost at: <span className="font-medium">{item.location.specific_spot}, {item.location.campus}</span>
// // //                 </p>
// // //                 <p className="text-gray-500 text-xs mt-1">
// // //                   Reported by: <span className="font-medium">{item.finder_id?.name || 'N/A'}</span> on {new Date(item.createdAt).toLocaleDateString()}
// // //                 </p>
// // //               </div>
// // //             </div>
// // //           ))}
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default ItemListPage;
// // // client/src/pages/ItemListPage.jsx
// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import { Link, useSearchParams } from "react-router-dom";
// // import { useAuth } from "../context/AuthContext";

// // const ItemListPage = () => {
// //   const [items, setItems] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [searchParams, setSearchParams] = useSearchParams();

// //   const { API_BASE_URL } = useAuth();

// //   useEffect(() => {
// //     const fetchItems = async () => {
// //       setLoading(true);
// //       setError("");
// //       try {
// //         const query = searchParams.get("query");
// //         let url = `${API_BASE_URL}/items`;

// //         if (query) {
// //           url = `${API_BASE_URL}/items/search?query=${encodeURIComponent(query)}`;
// //           setSearchQuery(query);
// //         } else {
// //           setSearchQuery("");
// //         }

// //         const { data } = await axios.get(url);
// //         setItems(data);
// //       } catch (err) {
// //         setError("Failed to fetch items. Please try again later.");
// //         console.error(err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchItems();
// //   }, [API_BASE_URL, searchParams]);

// //   const handleSearchSubmit = (e) => {
// //     e.preventDefault();
// //     if (searchQuery.trim()) {
// //       setSearchParams({ query: searchQuery.trim() });
// //     } else {
// //       setSearchParams({});
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center text-xl text-white">
// //         Loading items...
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center text-red-400 text-xl">
// //         {error}
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="relative min-h-screen py-16 px-6 overflow-hidden">

// //       {/* 🔥 Background Animated Grid */}
// //       <div className="absolute inset-0 z-0 opacity-25 grid-animation-bg"></div>

// //       {/* 🔥 Floating Gradient Blobs */}
// //       <div className="absolute -top-20 -left-20 w-72 h-72 bg-purple-500/30 blur-[120px] rounded-full"></div>
// //       <div className="absolute top-40 right-0 w-72 h-72 bg-blue-500/30 blur-[120px] rounded-full"></div>
// //       <div className="absolute bottom-20 left-10 w-72 h-72 bg-pink-500/20 blur-[120px] rounded-full"></div>

// //       <div className="relative z-10 container mx-auto max-w-7xl">

// //         {/* Heading */}
// //         <h1 className="text-5xl font-extrabold text-white text-center drop-shadow-xl mb-12">
// //           Lost & Found Items
// //         </h1>

// //         {/* 🔍 Search Bar - Glassmorphic */}
// //         <form
// //           onSubmit={handleSearchSubmit}
// //           className="mb-12 flex justify-center"
// //         >
// //           <div className="flex w-full max-w-2xl backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl overflow-hidden shadow-2xl">
// //             <input
// //               type="text"
// //               placeholder="Search items... (e.g., 'black wallet', 'lost ID')"
// //               value={searchQuery}
// //               onChange={(e) => setSearchQuery(e.target.value)}
// //               className="w-full p-4 bg-transparent text-white placeholder-gray-300 focus:outline-none"
// //             />
// //             <button
// //               type="submit"
// //               className="px-8 bg-purple-600 hover:bg-purple-700 text-white font-semibold backdrop-blur-xl transition-all"
// //             >
// //               Search
// //             </button>
// //           </div>
// //         </form>

// //         {/* No Result Messages */}
// //         {items.length === 0 && searchParams.get("query") && (
// //           <p className="text-center text-gray-300 text-lg">
// //             No items found for "
// //             <span className="font-semibold text-white">
// //               {searchParams.get("query")}
// //             </span>
// //             ".
// //           </p>
// //         )}

// //         {items.length === 0 && !searchParams.get("query") && (
// //           <p className="text-center text-gray-300 text-lg">
// //             No items reported yet. Be the first to report!
// //           </p>
// //         )}

// //         {/* Item Cards Grid */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
// //           {items.map((item) => (
// //             <div
// //               key={item._id}
// //               className="backdrop-blur-xl bg-white/10 border border-white/20 
// //               rounded-2xl overflow-hidden shadow-xl transition-all hover:shadow-2xl 
// //               hover:scale-[1.03] hover:bg-white/20 duration-300"
// //             >
// //               <Link to={`/items/${item._id}`}>
// //                 <img
// //                   src={
// //                     item.images[0]?.url ||
// //                     "https://via.placeholder.com/400x300?text=No+Image"
// //                   }
// //                   alt={item.title}
// //                   className="w-full h-56 object-cover"
// //                 />
// //               </Link>

// //               <div className="p-5 text-white">
// //                 <h2 className="text-2xl font-bold mb-2">{item.title}</h2>

// //                 <p className="text-sm mb-2">
// //                   <span
// //                     className={`px-3 py-1 rounded-full text-xs font-bold ${
// //                       item.type === "LOST"
// //                         ? "bg-red-400/20 text-red-300"
// //                         : "bg-green-400/20 text-green-300"
// //                     }`}
// //                   >
// //                     {item.type}
// //                   </span>

// //                   <span className="ml-3 text-gray-300">{item.category}</span>
// //                 </p>

// //                 <p className="text-gray-200 text-sm line-clamp-2 mb-3">
// //                   {item.description}
// //                 </p>

// //                 <p className="text-gray-300 text-sm">
// //                   Location:{" "}
// //                   <span className="font-semibold text-white">
// //                     {item.location.specific_spot}, {item.location.campus}
// //                   </span>
// //                 </p>

// //                 <p className="text-gray-400 text-xs mt-2">
// //                   Reported by{" "}
// //                   <span className="font-medium">
// //                     {item.finder_id?.name || "Unknown"}
// //                   </span>{" "}
// //                   on {new Date(item.createdAt).toLocaleDateString()}
// //                 </p>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ItemListPage;
// // client/src/pages/ItemListPage.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link, useSearchParams } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const ItemListPage = () => {
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchParams, setSearchParams] = useSearchParams();

//   const { API_BASE_URL } = useAuth();

//   useEffect(() => {
//     const fetchItems = async () => {
//       setLoading(true);
//       setError("");
//       try {
//         const query = searchParams.get("query");
//         let url = `${API_BASE_URL}/items`;

//         if (query) {
//           url = `${API_BASE_URL}/items/search?query=${encodeURIComponent(query)}`;
//           setSearchQuery(query);
//         }

//         const { data } = await axios.get(url);
//         setItems(data);
//       } catch (err) {
//         setError("Failed to fetch items. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchItems();
//   }, [API_BASE_URL, searchParams]);

//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       setSearchParams({ query: searchQuery.trim() });
//     } else {
//       setSearchParams({});
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-xl text-gray-300 bg-black">
//         Loading items...
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-red-500 text-xl bg-black">
//         {error}
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen w-full bg-black text-white px-4 pb-20">

//       {/* Animated Background Glow */}
//       <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(90,0,255,0.25),transparent)] opacity-60"></div>
//       <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(0,150,255,0.25),transparent)] opacity-60"></div>

//       <h1 className="text-4xl font-extrabold mb-10 text-center bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
//         Lost & Found Items
//       </h1>

//       {/* Search Bar */}
//       <form onSubmit={handleSearchSubmit} className="mb-10 flex justify-center">
//         <div className="flex w-full max-w-xl backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl shadow-lg shadow-purple-500/10">
//           <input
//             type="text"
//             placeholder="Search items (e.g., 'wallet', 'red Nike shoes')"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="flex-1 p-3 bg-transparent text-white placeholder-gray-400 focus:outline-none"
//           />
//           <button
//             type="submit"
//             className="px-6 py-3 text-white font-medium bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 transition rounded-r-xl"
//           >
//             Search
//           </button>
//         </div>
//       </form>

//       {/* Empty States */}
//       {items.length === 0 ? (
//         <p className="text-center text-gray-400 text-lg">
//           {searchParams.get("query")
//             ? `No items found for "${searchParams.get("query")}".`
//             : "No items reported yet."}
//         </p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

//           {items.map((item) => (
//             <div
//               key={item._id}
//               className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-xl hover:shadow-purple-500/20 hover:scale-[1.02] transition transform duration-300 overflow-hidden"
//             >
//               {/* Image */}
//               <Link to={`/items/${item._id}`}>
//                 <img
//                   src={
//                     item.images?.[0]?.url ||
//                     "https://via.placeholder.com/400x300?text=No+Image"
//                   }
//                   alt={item.title}
//                   className="w-full h-56 object-cover opacity-90 hover:opacity-100 transition"
//                 />
//               </Link>

//               {/* Content */}
//               <div className="p-5 space-y-3">

//                 <h2 className="text-xl font-semibold">
//                   <Link
//                     to={`/items/${item._id}`}
//                     className="hover:text-purple-400 transition"
//                   >
//                     {item.title}
//                   </Link>
//                 </h2>

//                 <div className="flex items-center gap-2 text-sm">
//                   <span
//                     className={`px-2 py-1 rounded-full text-xs font-bold ${
//                       item.type === "LOST"
//                         ? "bg-red-500/20 text-red-300"
//                         : "bg-green-500/20 text-green-300"
//                     }`}
//                   >
//                     {item.type}
//                   </span>
//                   <span className="text-gray-400">{item.category}</span>
//                 </div>

//                 <p className="text-gray-300 text-sm line-clamp-2">
//                   {item.description}
//                 </p>

//                 <p className="text-gray-400 text-sm">
//                   <span className="font-semibold text-white">Location: </span>
//                   {item.location.specific_spot}, {item.location.campus}
//                 </p>

//                 <p className="text-gray-500 text-xs">
//                   Reported by:{" "}
//                   <span className="text-gray-300">
//                     {item.finder_id?.name || "N/A"}
//                   </span>{" "}
//                   on {new Date(item.createdAt).toLocaleDateString()}
//                 </p>

//               </div>
//             </div>
//           ))}

//         </div>
//       )}
//     </div>
//   );
// };

// export default ItemListPage;

// client/src/pages/ItemListPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Simple CSS for the floating background animation
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
  .animation-delay-4000 {
    animation-delay: 4s;
  }
`;

const ItemListPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const { API_BASE_URL } = useAuth();

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      setError("");
      try {
        const query = searchParams.get("query");
        let url = `${API_BASE_URL}/items`;

        if (query) {
          url = `${API_BASE_URL}/items/search?query=${encodeURIComponent(query)}`;
          setSearchQuery(query);
        }

        const { data } = await axios.get(url);
        setItems(data);
      } catch (err) {
        setError("Failed to fetch items. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [API_BASE_URL, searchParams]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ query: searchQuery.trim() });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0a0a12] text-white overflow-hidden selection:bg-purple-500 selection:text-white font-sans pt-[40px]">
      <style>{customStyles}</style>

      {/* --- Dynamic Background Elements --- */}
      <div className="fixed inset-0 w-full h-full pointer-events-none">
        {/* Top Left Purple Blob */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob"></div>
        {/* Top Right Blue Blob */}
        <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-2000"></div>
        {/* Bottom Center Pink Blob */}
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-4000"></div>
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      </div>

      {/* --- Main Content Container --- */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
              Lost & Found
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Recover what’s yours or help return what’s lost. Connect with the campus community.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="mb-16 relative max-w-2xl mx-auto group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
          <div className="relative flex items-center bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
            <div className="pl-6">
              <svg className="w-6 h-6 text-gray-400 group-focus-within:text-purple-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input
              type="text"
              placeholder="Search for items (e.g., 'MacBook', 'Blue bottle')..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-5 bg-transparent text-white placeholder-gray-500 focus:outline-none text-lg font-medium rounded-2xl"
            />
            <button
              type="submit"
              className="m-2 px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold rounded-xl transition-all transform hover:scale-105 shadow-lg shadow-purple-500/25"
            >
              Search
            </button>
          </div>
        </form>

        {/* Loading & Error States */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-400 animate-pulse">Scanning database...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
             <div className="inline-block px-8 py-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400">
                {error}
             </div>
          </div>
        ) : (
          <>
            {/* Results Grid */}
            {items.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🕸️</div>
                <h3 className="text-2xl font-bold text-gray-300 mb-2">No items found</h3>
                <p className="text-gray-500">
                  {searchParams.get("query")
                    ? `We couldn't find anything matching "${searchParams.get("query")}".`
                    : "The list is currently empty. That's good news!"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.map((item) => (
                  <div
                    key={item._id}
                    className="group relative flex flex-col h-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/30 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_-10px_rgba(168,85,247,0.3)] backdrop-blur-md"
                  >
                    {/* Image Container */}
                    <Link to={`/items/${item._id}`} className="relative h-64 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a12] to-transparent opacity-60 z-10"></div>
                      <img
                        src={
                          item.images?.[0]?.url ||
                          "https://via.placeholder.com/400x300?text=No+Image"
                        }
                        alt={item.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                      
                      {/* Floating Type Badge */}
                      <div className="absolute top-4 left-4 z-20">
                        <span
                          className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg backdrop-blur-md border border-white/10 ${
                            item.type === "LOST"
                              ? "bg-red-500/20 text-red-200 shadow-red-500/20"
                              : "bg-emerald-500/20 text-emerald-200 shadow-emerald-500/20"
                          }`}
                        >
                          {item.type}
                        </span>
                      </div>
                    </Link>

                    {/* Content */}
                    <div className="flex-1 p-6 flex flex-col">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-medium text-purple-300 bg-purple-500/10 px-3 py-1 rounded-lg border border-purple-500/10">
                          {item.category}
                        </span>
                        <span className="text-xs text-gray-400 font-mono">
                           {new Date(item.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <h2 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors line-clamp-1">
                        <Link to={`/items/${item._id}`}>
                          {item.title}
                        </Link>
                      </h2>

                      <p className="text-gray-400 text-sm line-clamp-2 mb-4 flex-grow">
                        {item.description}
                      </p>

                      <div className="pt-4 border-t border-white/5 space-y-2">
                         {/* Location */}
                        <div className="flex items-start gap-2 text-sm text-gray-300">
                          <svg className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                          <span className="truncate">
                            {item.location.specific_spot}, {item.location.campus}
                          </span>
                        </div>
                        
                        {/* User */}
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                           <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-[10px]">
                             {item.finder_id?.name ? item.finder_id.name[0].toUpperCase() : "?"}
                           </div>
                           <span>Reported by <span className="text-gray-400">{item.finder_id?.name || "Anonymous"}</span></span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Bottom Glow Bar */}
                    <div className={`h-1 w-full bg-gradient-to-r ${item.type === 'LOST' ? 'from-red-500 to-orange-500' : 'from-emerald-500 to-teal-500'} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ItemListPage;
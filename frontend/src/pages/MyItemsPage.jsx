// // // client/src/pages/MyItemsPage.jsx
// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import { Link, useNavigate } from 'react-router-dom';
// // import { useAuth } from '../context/AuthContext';

// // const MyItemsPage = () => {
// //   const [myItems, setMyItems] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState('');
// //   const { user, API_BASE_URL } = useAuth();
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const fetchMyItems = async () => {
// //       if (!user) {
// //         setError('Please log in to view your items.');
// //         setLoading(false);
// //         return;
// //       }
// //       try {
// //         const config = {
// //           headers: {
// //             Authorization: `Bearer ${user.token}`,
// //           },
// //         };
// //         const { data } = await axios.get(`${API_BASE_URL}/items/my`, config);
// //         setMyItems(data);
// //         setLoading(false);
// //       } catch (err) {
// //         setError(err.response?.data?.message || 'Failed to fetch your items.');
// //         setLoading(false);
// //         console.error(err);
// //       }
// //     };

// //     fetchMyItems();
// //   }, [user, API_BASE_URL]);

// //   const handleDelete = async (itemId) => {
// //     if (window.confirm('Are you sure you want to delete this item?')) {
// //       try {
// //         const config = {
// //           headers: {
// //             Authorization: `Bearer ${user.token}`,
// //           },
// //         };
// //         await axios.delete(`${API_BASE_URL}/items/${itemId}`, config);
// //         setMyItems(myItems.filter(item => item._id !== itemId)); // Remove from UI
// //         alert('Item deleted successfully!');
// //       } catch (err) {
// //         console.error('Failed to delete item:', err);
// //         setError('Failed to delete item.');
// //       }
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center text-xl text-gray-600">
// //         Loading your items...
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center text-red-600 text-xl">
// //         {error}
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="container mx-auto p-4 py-8">
// //       <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Your Reported Items</h1>

// //       {myItems.length === 0 ? (
// //         <p className="text-center text-gray-600 text-lg">You haven't reported any items yet.</p>
// //       ) : (
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //           {myItems.map((item) => (
// //             <div key={item._id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transition-transform transform hover:scale-105 duration-300">
// //               <Link to={`/items/${item._id}`}>
// //                 <img
// //                   src={item.images[0]?.url || 'https://via.placeholder.com/400x300?text=No+Image'}
// //                   alt={item.title}
// //                   className="w-full h-48 object-cover"
// //                 />
// //               </Link>
// //               <div className="p-4 flex-grow flex flex-col">
// //                 <h2 className="text-xl font-semibold text-gray-800 mb-2">
// //                   <Link to={`/items/${item._id}`} className="hover:text-indigo-600">{item.title}</Link>
// //                 </h2>
// //                 <p className="text-sm text-gray-600 mb-2">
// //                   <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
// //                     item.type === 'LOST' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
// //                   }`}>
// //                     {item.type}
// //                   </span>
// //                   <span className="ml-2 text-gray-500">
// //                      {item.category}
// //                   </span>
// //                 </p>
// //                 <p className="text-gray-700 text-base mb-3 line-clamp-2">{item.description}</p>
// //                 <p className="text-gray-500 text-sm">
// //                   Status: <span className="font-medium text-blue-600">{item.status}</span>
// //                 </p>
// //                 <div className="mt-auto flex justify-end space-x-2 pt-4"> {/* Buttons at bottom right */}
// //                   <button
// //                     onClick={() => navigate(`/items/${item._id}/edit`)} // Placeholder for future edit page
// //                     className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded-md text-sm"
// //                   >
// //                     Edit
// //                   </button>
// //                   <button
// //                     onClick={() => handleDelete(item._id)}
// //                     className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
// //                   >
// //                     Delete
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default MyItemsPage;
// // client/src/pages/MyItemsPage.jsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast'; // Import react-hot-toast
// import { useAuth } from '../context/AuthContext';
// import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'; // Import Heroicons for buttons

// const MyItemsPage = () => {
//   const [myItems, setMyItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   // const [error, setError] = useState(''); // Removed local error state
//   const { user, API_BASE_URL } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchMyItems = async () => {
//       if (!user) {
//         toast.error('Please log in to view your items.'); // Use toast
//         setLoading(false);
//         return;
//       }
//       try {
//         const config = {
//           headers: {
//             Authorization: `Bearer ${user.token}`,
//           },
//         };
//         const { data } = await axios.get(`${API_BASE_URL}/items/my`, config);
//         setMyItems(data);
//         setLoading(false);
//       } catch (err) {
//         toast.error(err.response?.data?.message || 'Failed to fetch your items.'); // Use toast
//         setLoading(false);
//         console.error(err);
//       }
//     };

//     fetchMyItems();
//   }, [user, API_BASE_URL]);

//   const handleDelete = async (itemId) => {
//     if (window.confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
//       try {
//         const config = {
//           headers: {
//             Authorization: `Bearer ${user.token}`,
//           },
//         };
//         await axios.delete(`${API_BASE_URL}/items/${itemId}`, config);
//         toast.success('Item deleted successfully!'); // Use toast
//         setMyItems(myItems.filter(item => item._id !== itemId)); // Remove from UI
//       } catch (err) {
//         console.error('Failed to delete item:', err);
//         toast.error(err.response?.data?.message || 'Failed to delete item.'); // Use toast
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-xl text-gray-300 bg-gray-900">
//         Loading your items...
//       </div>
//     );
//   }

//   // No explicit error screen, rely on toast for messages and empty state if fetch fails
//   // if (error) { ... }

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'OPEN': return 'bg-blue-500/30 text-blue-300';
//       case 'PENDING_CLAIM': return 'bg-yellow-500/30 text-yellow-300';
//       case 'CLAIMED': return 'bg-green-500/30 text-green-300';
//       case 'RESOLVED': return 'bg-purple-500/30 text-purple-300';
//       default: return 'bg-gray-500/30 text-gray-300';
//     }
//   };

//   return (
//     <div className="relative min-h-[calc(100vh-64px)] bg-gray-900 overflow-hidden flex flex-col items-center justify-start py-12 px-4 text-white pt-40 relative min-h-screen w-full bg-[#0a0a12] text-white overflow-hidden font-sans selection:bg-purple-500/30 pb-20 pt-74">
//       {/* Background Grid Animation */}
//       <div className="absolute inset-0 z-0 opacity-20 grid-animation-bg"></div>

//       {/* Animated Background Glows */}
//       <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(90,0,255,0.25),transparent)] opacity-60 animate-glowPulse"></div>
//       <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(0,150,255,0.25),transparent)] opacity-60 animate-glowPulse-delay"></div>

//       {/* Main Content Area (Glassmorphism Card) */}
//       <div className="relative z-10 w-full max-w-7xl bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border border-gray-700 border-opacity-30 rounded-3xl shadow-2xl p-6 md:p-10 text-white flex flex-col items-center animate-fadeInUp">

//         <h1 className="text-4xl md:text-5xl font-extrabold text-center text-white mb-8 shining-text">
//           Your <span className="text-blue-400">Reported Items</span>
//         </h1>

//         {myItems.length === 0 ? (
//           <div className="text-center text-gray-400 text-xl backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-8 max-w-xl mx-auto animate-fadeIn delay-1">
//             <p className="mb-4">You haven't reported any items yet.</p>
//             <p>
//               <Link to="/report-item" className="text-purple-400 hover:underline">Report a lost or found item now!</Link>
//             </p>
//           </div>
//         ) : (
//           // THIS IS THE KEY CHANGE: Add 'justify-center' to the grid
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-center w-full animate-slideUpStagger">
//             {myItems.map((item, index) => (
//               <div key={item._id}
//                    className="group backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-xl hover:shadow-indigo-500/20 hover:scale-[1.02] transition transform duration-300 overflow-hidden animate-itemEnter"
//                    style={{ '--delay': `${index * 0.1}s` }} // Staggered animation delay
//               >
//                 {/* Image */}
//                 <Link to={`/items/${item._id}`}>
//                   <img
//                     src={item.images[0]?.url || 'https://via.placeholder.com/400x300?text=No+Image'}
//                     alt={item.title}
//                     className="w-full h-48 object-cover opacity-90 group-hover:opacity-100 transition duration-300"
//                   />
//                 </Link>
//                 {/* Content */}
//                 <div className="p-5 flex-grow flex flex-col space-y-2">
//                   <h2 className="text-xl font-semibold">
//                     <Link to={`/items/${item._id}`} className="hover:text-purple-400 transition duration-200">{item.title}</Link>
//                   </h2>
//                   <div className="flex items-center gap-2 text-sm">
//                     <span className={`px-2.5 py-1 rounded-full text-xs font-bold tracking-wide ${
//                       item.type === 'LOST' ? 'bg-red-500/30 text-red-300' : 'bg-green-500/30 text-green-300'
//                     }`}>
//                       {item.type}
//                     </span>
//                     <span className="text-gray-400">
//                       <span className="font-semibold">{item.category}</span>
//                     </span>
//                   </div>
//                   <p className="text-gray-300 text-sm line-clamp-2 leading-relaxed flex-grow">{item.description}</p>
//                   <p className="text-gray-400 text-sm">
//                     Status: <span className={`font-medium ${getStatusColor(item.status)} px-2 py-0.5 rounded-full text-xs`}>{item.status.replace('_', ' ')}</span>
//                   </p>
//                   <div className="mt-auto flex justify-end space-x-3 pt-4"> {/* Buttons at bottom right */}
//                     <button
//                       onClick={() => navigate(`/items/${item._id}/edit`)}
//                       className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-300 shadow-md transform hover:-translate-y-0.5"
//                     >
//                       <PencilIcon className="h-4 w-4 mr-1.5" /> Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(item._id)}
//                       className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-300 shadow-md transform hover:-translate-y-0.5"
//                     >
//                       <TrashIcon className="h-4 w-4 mr-1.5" /> Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyItemsPage;
// client/src/pages/MyItemsPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { 
  PencilSquareIcon, 
  TrashIcon, 
  CubeIcon, 
  ClockIcon, 
  CheckBadgeIcon, 
  ArchiveBoxIcon,
  PlusCircleIcon
} from '@heroicons/react/24/outline';

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
`;

const MyItemsPage = () => {
  const [myItems, setMyItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, API_BASE_URL } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyItems = async () => {
      if (!user) {
        toast.error('Please log in to view your items.');
        setLoading(false);
        return;
      }
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const { data } = await axios.get(`${API_BASE_URL}/items/my`, config);
        setMyItems(data);
        setLoading(false);
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to fetch your items.');
        setLoading(false);
      }
    };
    fetchMyItems();
  }, [user, API_BASE_URL]);

  const handleDelete = async (itemId) => {
    if (window.confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        await axios.delete(`${API_BASE_URL}/items/${itemId}`, config);
        toast.success('Item deleted successfully!');
        setMyItems(myItems.filter(item => item._id !== itemId));
      } catch (err) {
        console.error('Failed to delete item:', err);
        toast.error(err.response?.data?.message || 'Failed to delete item.');
      }
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'OPEN':
        return {
          badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
          icon: <CubeIcon className="w-3 h-3" />,
          glow: 'shadow-blue-500/20'
        };
      case 'PENDING_CLAIM':
        return {
          badge: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
          icon: <ClockIcon className="w-3 h-3" />,
          glow: 'shadow-yellow-500/20'
        };
      case 'CLAIMED':
        return {
          badge: 'bg-green-500/10 text-green-400 border-green-500/20',
          icon: <CheckBadgeIcon className="w-3 h-3" />,
          glow: 'shadow-green-500/20'
        };
      case 'RESOLVED':
        return {
          badge: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
          icon: <ArchiveBoxIcon className="w-3 h-3" />,
          glow: 'shadow-purple-500/20'
        };
      default:
        return {
          badge: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
          icon: null,
          glow: ''
        };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a12]">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-blue-400 font-mono animate-pulse">Loading Inventory...</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full bg-[#0a0a12] text-white overflow-hidden font-sans selection:bg-purple-500/30 pb-20 pt-24">
      <style>{customStyles}</style>

      {/* --- Background FX --- */}
      <div className="fixed inset-0 w-full h-full pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-900 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-900 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-white mb-2">
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Reported Items</span>
            </h1>
            <p className="text-gray-400 text-sm font-mono">Manage your lost & found submissions</p>
          </div>
          
          <Link 
            to="/report-item"
            className="group px-6 py-3 bg-white text-black font-bold rounded-xl flex items-center gap-2 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all transform hover:-translate-y-0.5"
          >
            <PlusCircleIcon className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            <span>New Report</span>
          </Link>
        </div>

        {myItems.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md">
            <div className="bg-gray-800/50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
               <ArchiveBoxIcon className="w-10 h-10 text-gray-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-300 mb-2">No Items Reported</h3>
            <p className="text-gray-500 mb-6">You haven't submitted any lost or found reports yet.</p>
            <Link to="/report-item" className="text-blue-400 hover:text-blue-300 underline font-bold">Create your first report</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {myItems.map((item) => {
              const statusStyle = getStatusStyle(item.status);
              
              return (
                <div 
                  key={item._id}
                  className={`
                    group relative flex flex-col rounded-2xl overflow-hidden
                    bg-[#13131f]/60 backdrop-blur-xl border border-white/10
                    transition-all duration-300 hover:border-white/20 hover:-translate-y-1
                    hover:shadow-2xl hover:shadow-black/50
                  `}
                >
                  {/* Image Area */}
                  <div className="relative h-48 overflow-hidden bg-black">
                    <img
                      src={item.images[0]?.url || 'https://via.placeholder.com/400x300?text=No+Image'}
                      alt={item.title}
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                    />
                    
                    {/* Overlay Badge */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider shadow-lg backdrop-blur-md ${item.type === 'LOST' ? 'bg-red-500/80 text-white' : 'bg-emerald-500/80 text-white'}`}>
                        {item.type}
                      </span>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-5 flex-grow flex flex-col">
                    
                    <div className="flex justify-between items-start mb-2">
                       <span className="text-[10px] font-mono text-gray-500 uppercase">{item.category}</span>
                       <div className={`flex items-center gap-1 px-2 py-0.5 rounded border text-[10px] font-bold uppercase ${statusStyle.badge}`}>
                          {statusStyle.icon}
                          {item.status.replace('_', ' ')}
                       </div>
                    </div>

                    <h2 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-blue-400 transition-colors">
                      <Link to={`/items/${item._id}`}>
                        {item.title}
                      </Link>
                    </h2>

                    <p className="text-gray-400 text-sm line-clamp-2 mb-4 flex-grow">
                      {item.description}
                    </p>

                    {/* Action Bar */}
                    <div className="flex items-center gap-2 pt-4 border-t border-white/5">
                      <button
                        onClick={() => navigate(`/items/${item._id}/edit`)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-gray-300 transition-all"
                      >
                        <PencilSquareIcon className="w-4 h-4" /> Edit
                      </button>
                      
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/40 text-xs font-bold text-red-400 transition-all"
                      >
                        <TrashIcon className="w-4 h-4" /> Delete
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyItemsPage;
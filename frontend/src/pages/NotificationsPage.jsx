// // // // client/src/pages/NotificationsPage.jsx
// // // import React, { useEffect, useState } from 'react';
// // // import axios from 'axios';
// // // import { Link } from 'react-router-dom';
// // // import { useAuth } from '../context/AuthContext';

// // // const NotificationsPage = () => {
// // //   const [notifications, setNotifications] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState('');
// // //   const { user, API_BASE_URL } = useAuth();

// // //   const fetchNotifications = async () => {
// // //     if (!user) {
// // //       setError('Please log in to view notifications.');
// // //       setLoading(false);
// // //       return;
// // //     }
// // //     try {
// // //       const config = {
// // //         headers: {
// // //           Authorization: `Bearer ${user.token}`,
// // //         },
// // //       };
// // //       const { data } = await axios.get(`${API_BASE_URL}/notifications`, config);
// // //       setNotifications(data);
// // //       setLoading(false);
// // //     } catch (err) {
// // //       setError(err.response?.data?.message || 'Failed to fetch notifications.');
// // //       setLoading(false);
// // //       console.error(err);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchNotifications();
// // //   }, [user, API_BASE_URL]);

// // //   const markAsReadHandler = async (id) => {
// // //     try {
// // //       const config = {
// // //         headers: {
// // //           Authorization: `Bearer ${user.token}`,
// // //         },
// // //       };
// // //       await axios.put(`${API_BASE_URL}/notifications/${id}/read`, {}, config);
// // //       // Update local state without refetching all
// // //       setNotifications(notifications.map(notif =>
// // //         notif._id === id ? { ...notif, read: true } : notif
// // //       ));
// // //     } catch (err) {
// // //       console.error('Failed to mark notification as read:', err);
// // //       setError('Failed to mark notification as read.');
// // //     }
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <div className="min-h-screen flex items-center justify-center text-xl text-gray-600">
// // //         Loading notifications...
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
// // //       <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Your Notifications</h1>

// // //       {notifications.length === 0 ? (
// // //         <p className="text-center text-gray-600 text-lg">No new notifications.</p>
// // //       ) : (
// // //         <div className="space-y-4">
// // //           {notifications.map((notif) => (
// // //             <div
// // //               key={notif._id}
// // //               className={`flex items-center p-4 rounded-lg shadow-md ${notif.read ? 'bg-gray-50' : 'bg-blue-50 border-l-4 border-blue-500'}`}
// // //             >
// // //               <div className="flex-grow">
// // //                 <p className={`text-lg ${notif.read ? 'text-gray-700' : 'font-semibold text-gray-900'}`}>
// // //                   {notif.message}
// // //                 </p>
// // //                 {notif.item && notif.matchItem && (
// // //                   <p className="text-sm text-gray-500 mt-1">
// // //                     Your {notif.item.type.toLowerCase()} item: <Link to={`/items/${notif.item._id}`} className="text-indigo-600 hover:underline">{notif.item.title}</Link>
// // //                     {' '} matched with {notif.matchItem.type.toLowerCase()} item: <Link to={`/items/${notif.matchItem._id}`} className="text-indigo-600 hover:underline">{notif.matchItem.title}</Link>
// // //                   </p>
// // //                 )}
// // //                 <p className="text-xs text-gray-400 mt-1">
// // //                   {new Date(notif.createdAt).toLocaleString()}
// // //                 </p>
// // //               </div>
// // //               {!notif.read && (
// // //                 <button
// // //                   onClick={() => markAsReadHandler(notif._id)}
// // //                   className="ml-4 px-3 py-1 bg-indigo-500 hover:bg-indigo-600 text-white text-sm rounded-md transition duration-300"
// // //                 >
// // //                   Mark as Read
// // //                 </button>
// // //               )}
// // //             </div>
// // //           ))}
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default NotificationsPage;
// // // client/src/pages/NotificationsPage.jsx
// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import { Link } from 'react-router-dom';
// // import { useAuth } from '../context/AuthContext';

// // const NotificationsPage = () => {
// //   const [notifications, setNotifications] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState('');
// //   const { user, API_BASE_URL } = useAuth();

// //   const fetchNotifications = async () => {
// //     if (!user) {
// //       setError('Please log in to view notifications.');
// //       setLoading(false);
// //       return;
// //     }
// //     try {
// //       const config = {
// //         headers: {
// //           Authorization: `Bearer ${user.token}`,
// //         },
// //       };
// //       const { data } = await axios.get(`${API_BASE_URL}/notifications`, config);
// //       setNotifications(data);
// //       setLoading(false);
// //     } catch (err) {
// //       setError(err.response?.data?.message || 'Failed to fetch notifications.');
// //       setLoading(false);
// //       console.error(err);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchNotifications();
// //   }, [user, API_BASE_URL]);

// //   const markAsReadHandler = async (id) => {
// //     try {
// //       const config = {
// //         headers: {
// //           Authorization: `Bearer ${user.token}`,
// //         },
// //       };
// //       await axios.put(`${API_BASE_URL}/notifications/${id}/read`, {}, config);
// //       setNotifications(notifications.map(notif =>
// //         notif._id === id ? { ...notif, read: true } : notif
// //       ));
// //     } catch (err) {
// //       console.error('Failed to mark notification as read:', err);
// //       setError('Failed to mark notification as read.');
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center text-xl text-gray-600">
// //         Loading notifications...
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

// //   const getStatusColor = (read) => (read ? 'bg-gray-50' : 'bg-blue-50 border-l-4 border-blue-500');

// //   // Helper to render notification message with dynamic links
// //   const renderNotificationMessage = (notif) => {
// //     switch (notif.type) {
// //       case 'MATCH_FOUND':
// //         if (notif.item && notif.matchItem) {
// //           return (
// //             <p>
// //               Potential match found for your <Link to={`/items/${notif.item._id}`} className="text-indigo-600 hover:underline font-medium">{notif.item.type.toLowerCase()} item "{notif.item.title}"</Link>! Check out this <Link to={`/items/${notif.matchItem._id}`} className="text-indigo-600 hover:underline font-medium">{notif.matchItem.type.toLowerCase()} item "{notif.matchItem.title}"</Link>.
// //             </p>
// //           );
// //         }
// //         break;
// //       case 'CLAIM_REQUEST':
// //         if (notif.item && notif.metadata?.claimerName) {
// //           return (
// //             <p>
// //               <span className="font-medium">{notif.metadata.claimerName}</span> has requested to claim your found item "<Link to={`/items/${notif.item._id}`} className="text-indigo-600 hover:underline font-medium">{notif.item.title}</Link>".{' '}
// //               <Link to="/claims-on-my-items" className="text-blue-600 hover:underline font-medium">Review claims now.</Link>
// //             </p>
// //           );
// //         }
// //         break;
// //       case 'CLAIM_APPROVED':
// //         if (notif.item && notif.metadata?.finderEmail) {
// //           return (
// //             <p>
// //               Your claim for "<Link to={`/items/${notif.item._id}`} className="text-indigo-600 hover:underline font-medium">{notif.item.title}"</Link> has been <span className="text-green-600 font-medium">approved</span>!{' '}
// //               Contact the finder: <a href={`mailto:${notif.metadata.finderEmail}`} className="text-blue-600 hover:underline font-medium">{notif.metadata.finderEmail}</a> to arrange handover.
// //             </p>
// //           );
// //         }
// //         break;
// //       case 'CLAIM_REJECTED':
// //         if (notif.item) {
// //           return (
// //             <p>
// //               Your claim for "<Link to={`/items/${notif.item._id}`} className="text-indigo-600 hover:underline font-medium">{notif.item.title}"</Link> has been <span className="text-red-600 font-medium">rejected</span>.
// //             </p>
// //           );
// //         }
// //         break;
// //       case 'CLAIM_WITHDRAWN':
// //         if (notif.item && notif.metadata?.claimerName) {
// //           return (
// //             <p>
// //               A claim for your found item "<Link to={`/items/${notif.item._id}`} className="text-indigo-600 hover:underline font-medium">{notif.item.title}"</Link> has been <span className="font-medium">withdrawn</span> by {notif.metadata.claimerName}.
// //             </p>
// //           );
// //         }
// //         break;
// //       // Add other notification types as needed
// //       default:
// //         return <p>{notif.message}</p>;
// //     }
// //     return <p>{notif.message}</p>; // Fallback if type not matched or data missing
// //   };

// //   return (
// //     <div className="container mx-auto p-4 py-8">
// //       <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Your Notifications</h1>

// //       {notifications.length === 0 ? (
// //         <p className="text-center text-gray-600 text-lg">No new notifications.</p>
// //       ) : (
// //         <div className="space-y-4">
// //           {notifications.map((notif) => (
// //             <div
// //               key={notif._id}
// //               className={`flex items-start p-4 rounded-lg shadow-md transition duration-200 ${getStatusColor(notif.read)}`}
// //             >
// //               <div className="flex-grow">
// //                 <div className={`text-lg ${notif.read ? 'text-gray-700' : 'font-normal text-gray-900'}`}> {/* Adjusted font-weight based on read status */}
// //                   {renderNotificationMessage(notif)}
// //                 </div>
// //                 <p className="text-xs text-gray-400 mt-2">
// //                   {new Date(notif.createdAt).toLocaleString()}
// //                 </p>
// //               </div>
// //               {!notif.read && (
// //                 <button
// //                   onClick={() => markAsReadHandler(notif._id)}
// //                   className="ml-4 flex-shrink-0 px-3 py-1 bg-indigo-500 hover:bg-indigo-600 text-white text-sm rounded-md transition duration-300"
// //                 >
// //                   Mark as Read
// //                 </button>
// //               )}
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default NotificationsPage;
// // client/src/pages/NotificationsPage.jsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import toast from 'react-hot-toast'; // Import react-hot-toast
// import { useAuth } from '../context/AuthContext';
// import { EyeIcon } from '@heroicons/react/24/outline'; // Import Heroicon for Mark as Read

// const NotificationsPage = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   // const [error, setError] = useState(''); // Removed local error state
//   const { user, API_BASE_URL } = useAuth();

//   const fetchNotifications = async () => {
//     if (!user) {
//       toast.error('Please log in to view notifications.'); // Use toast
//       setLoading(false);
//       return;
//     }
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//         },
//       };
//       const { data } = await axios.get(`${API_BASE_URL}/notifications`, config);
//       setNotifications(data);
//       setLoading(false);
//     } catch (err) {
//       toast.error(err.response?.data?.message || 'Failed to fetch notifications.'); // Use toast
//       setLoading(false);
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchNotifications();
//   }, [user, API_BASE_URL]);

//   const markAsReadHandler = async (id) => {
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//         },
//       };
//       await axios.put(`${API_BASE_URL}/notifications/${id}/read`, {}, config);
//       toast.success('Notification marked as read!'); // Use toast
//       setNotifications(notifications.map(notif =>
//         notif._id === id ? { ...notif, read: true } : notif
//       ));
//     } catch (err) {
//       console.error('Failed to mark notification as read:', err);
//       toast.error('Failed to mark notification as read.'); // Use toast
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-xl text-gray-300 bg-gray-900">
//         Loading notifications...
//       </div>
//     );
//   }

//   // No explicit error screen, rely on toast for messages and empty state if fetch fails
//   // if (error) { ... }


//   // Helper to render notification message with dynamic links
//   const renderNotificationMessage = (notif) => {
//     const baseLinkClasses = "text-indigo-400 hover:underline font-medium transition duration-200";
//     const statusTextClasses = "font-medium";

//     switch (notif.type) {
//       case 'MATCH_FOUND':
//         if (notif.item && notif.matchItem) {
//           return (
//             <p>
//               Potential match found for your <Link to={`/items/${notif.item._id}`} className={baseLinkClasses}>{notif.item.type.toLowerCase()} item "{notif.item.title}"</Link>! Check out this <Link to={`/items/${notif.matchItem._id}`} className={baseLinkClasses}>{notif.matchItem.type.toLowerCase()} item "{notif.matchItem.title}"</Link>.
//             </p>
//           );
//         }
//         break;
//       case 'CLAIM_REQUEST':
//         if (notif.item && notif.metadata?.claimerName) {
//           return (
//             <p>
//               <span className={statusTextClasses}>{notif.metadata.claimerName}</span> has requested to claim your found item "<Link to={`/items/${notif.item._id}`} className={baseLinkClasses}>{notif.item.title}</Link>".{' '}
//               <Link to="/claims-on-my-items" className="text-blue-400 hover:underline font-medium">Review claims now.</Link>
//             </p>
//           );
//         }
//         break;
//       case 'CLAIM_APPROVED':
//         if (notif.item && notif.metadata?.finderEmail) {
//           return (
//             <p>
//               Your claim for "<Link to={`/items/${notif.item._id}`} className={baseLinkClasses}>{notif.item.title}"</Link> has been <span className={`text-green-400 ${statusTextClasses}`}>approved</span>!{' '}
//               Contact the finder: <a href={`mailto:${notif.metadata.finderEmail}`} className="text-blue-400 hover:underline font-medium">{notif.metadata.finderEmail}</a> to arrange handover.
//             </p>
//           );
//         }
//         break;
//       case 'CLAIM_REJECTED':
//         if (notif.item) {
//           return (
//             <p>
//               Your claim for "<Link to={`/items/${notif.item._id}`} className={baseLinkClasses}>{notif.item.title}"</Link> has been <span className={`text-red-400 ${statusTextClasses}`}>rejected</span>.
//             </p>
//           );
//         }
//         break;
//       case 'CLAIM_WITHDRAWN':
//         if (notif.item && notif.metadata?.claimerName) {
//           return (
//             <p>
//               A claim for your found item "<Link to={`/items/${notif.item._id}`} className={baseLinkClasses}>{notif.item.title}"</Link> has been <span className={`text-yellow-400 ${statusTextClasses}`}>withdrawn</span> by {notif.metadata.claimerName}.
//             </p>
//           );
//         }
//         break;
//       default:
//         return <p>{notif.message}</p>;
//     }
//     return <p>{notif.message}</p>; // Fallback
//   };

//   const getNotificationCardClasses = (read) => `
//     flex items-start p-6 rounded-2xl shadow-xl transition duration-300 transform
//     ${read ? 'bg-white/5 border border-gray-700/30 text-gray-300 hover:shadow-gray-700/10' : 'bg-blue-500/10 border border-blue-500/30 text-white hover:shadow-blue-500/20'}
//     hover:-translate-y-1 animate-grandEnter
//   `;
//   // Apply staggered animation using CSS variable and index
//   const getAnimationDelay = (index) => ({ '--delay': `${index * 0.1}s` });


//   return (
//     <div className="relative min-h-[calc(100vh-64px)] bg-gray-900 overflow-hidden flex flex-col items-center justify-start py-12 px-4 text-white">
//       {/* Background Grid Animation */}
//       <div className="absolute inset-0 z-0 opacity-20 grid-animation-bg"></div>

//       {/* Animated Background Glows (Optional, ensure CSS keyframes exist if using) */}
//       <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(90,0,255,0.25),transparent)] opacity-60 animate-glowPulse"></div>
//       <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(0,150,255,0.25),transparent)] opacity-60 animate-glowPulse-delay"></div>

//       {/* Main Content Area (Glassmorphism Card) */}
//       <div className="relative z-10 w-full max-w-4xl bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border border-gray-700 border-opacity-30 rounded-3xl shadow-2xl p-6 md:p-10 text-white flex flex-col items-center animate-fadeInUp">

//         <h1 className="text-4xl md:text-5xl font-extrabold text-center text-white mb-8 shining-text">
//           Your <span className="text-purple-400">Notifications</span>
//         </h1>

//         {notifications.length === 0 ? (
//           <div className="text-center text-gray-400 text-xl backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-8 max-w-xl mx-auto animate-fadeIn delay-1">
//             <p className="mb-4">No new notifications.</p>
//             <p>You'll see updates on lost/found items and claims here.</p>
//           </div>
//         ) : (
//           <div className="space-y-6 w-full">
//             {notifications.map((notif, index) => (
//               <div
//                 key={notif._id}
//                 className={getNotificationCardClasses(notif.read)}
//                 style={getAnimationDelay(index)}
//               >
//                 <div className="flex-grow">
//                   <div className="text-lg leading-relaxed">
//                     {renderNotificationMessage(notif)}
//                   </div>
//                   <p className="text-xs text-gray-400 mt-3 opacity-80">
//                     {new Date(notif.createdAt).toLocaleString()}
//                   </p>
//                 </div>
//                 {!notif.read && (
//                   <button
//                     onClick={() => markAsReadHandler(notif._id)}
//                     className="ml-6 flex-shrink-0 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition duration-300 inline-flex items-center"
//                   >
//                     <EyeIcon className="h-4 w-4 mr-2" /> Mark as Read
//                   </button>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default NotificationsPage;
// client/src/pages/NotificationsPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { 
  CheckCircleIcon, 
  SparklesIcon, 
  HandRaisedIcon, 
  XCircleIcon, 
  BellIcon,
  CheckBadgeIcon 
} from '@heroicons/react/24/outline';

// Floating animation styles
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

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, API_BASE_URL } = useAuth();

  const fetchNotifications = async () => {
    if (!user) return;
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get(`${API_BASE_URL}/notifications`, config);
      setNotifications(data);
      setLoading(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to fetch notifications.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [user, API_BASE_URL]);

  const markAsReadHandler = async (id) => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.put(`${API_BASE_URL}/notifications/${id}/read`, {}, config);
      toast.success('Marked as read');
      setNotifications(notifications.map(notif =>
        notif._id === id ? { ...notif, read: true } : notif
      ));
    } catch (err) {
      toast.error('Failed to update notification.');
    }
  };

  // Helper to get Icon based on type
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'MATCH_FOUND': return <SparklesIcon className="w-6 h-6 text-purple-400" />;
      case 'CLAIM_REQUEST': return <HandRaisedIcon className="w-6 h-6 text-blue-400" />;
      case 'CLAIM_APPROVED': return <CheckBadgeIcon className="w-6 h-6 text-emerald-400" />;
      case 'CLAIM_REJECTED': return <XCircleIcon className="w-6 h-6 text-red-400" />;
      case 'CLAIM_WITHDRAWN': return <BellIcon className="w-6 h-6 text-amber-400" />;
      default: return <BellIcon className="w-6 h-6 text-gray-400" />;
    }
  };

  // Helper to render message
  const renderNotificationMessage = (notif) => {
    const linkStyle = "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 font-bold hover:underline decoration-purple-400 cursor-pointer transition-all";
    const highlight = "font-semibold text-white";

    switch (notif.type) {
      case 'MATCH_FOUND':
        return notif.item && notif.matchItem ? (
          <>
            AI found a match! Your <Link to={`/items/${notif.item._id}`} className={linkStyle}>{notif.item.title}</Link> might be this <Link to={`/items/${notif.matchItem._id}`} className={linkStyle}>{notif.matchItem.title}</Link>.
          </>
        ) : null;
      case 'CLAIM_REQUEST':
        return notif.item && notif.metadata?.claimerName ? (
          <>
            <span className={highlight}>{notif.metadata.claimerName}</span> wants to claim <Link to={`/items/${notif.item._id}`} className={linkStyle}>{notif.item.title}</Link>. <Link to="/claims-on-my-items" className="ml-1 text-blue-400 hover:text-blue-300 underline">Review now &rarr;</Link>
          </>
        ) : null;
      case 'CLAIM_APPROVED':
        return notif.item ? (
          <>
            Claim Approved! <Link to={`/items/${notif.item._id}`} className={linkStyle}>{notif.item.title}</Link> is yours. Contact: <a href={`mailto:${notif.metadata?.finderEmail}`} className="text-emerald-400 hover:text-emerald-300 underline">{notif.metadata?.finderEmail}</a>.
          </>
        ) : null;
      case 'CLAIM_REJECTED':
        return notif.item ? (
          <>
            Update: Your claim for <Link to={`/items/${notif.item._id}`} className={linkStyle}>{notif.item.title}</Link> was <span className="text-red-400 font-bold">rejected</span>.
          </>
        ) : null;
      case 'CLAIM_WITHDRAWN':
        return (
          <>
            Claim withdrawn for <Link to={`/items/${notif.item._id}`} className={linkStyle}>{notif.item.title}</Link>.
          </>
        );
      default:
        return notif.message;
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0a0a12] text-white overflow-hidden font-sans selection:bg-purple-500/30  pt-[70px]">
      <style>{customStyles}</style>

      {/* --- Dynamic Background Elements --- */}
      <div className="fixed inset-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-[100px] opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-[100px] opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/2 w-72 h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-[100px] opacity-30 animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-12">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Notifications <span className="text-purple-500">.</span>
            </h1>
            <p className="text-gray-400 text-sm">
              Stay updated on your lost & found activity.
            </p>
          </div>
          
          <div className="hidden md:block px-4 py-2 bg-white/5 rounded-xl border border-white/10 text-xs font-mono text-gray-400">
             {notifications.filter(n => !n.read).length} Unread
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 w-full bg-white/5 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        ) : notifications.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm">
            <div className="bg-gray-800/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
               <BellIcon className="w-8 h-8 text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-300">All caught up!</h3>
            <p className="text-gray-500 mt-2">No new updates at the moment.</p>
          </div>
        ) : (
          /* Notifications List */
          <div className="space-y-4">
            {notifications.map((notif) => (
              <div
                key={notif._id}
                className={`
                  relative group flex items-start gap-4 p-5 rounded-2xl border transition-all duration-300
                  ${notif.read 
                    ? 'bg-[#13131f]/40 border-white/5 hover:bg-[#13131f]/80' 
                    : 'bg-gradient-to-r from-gray-900 to-[#13131f] border-purple-500/30 shadow-[0_0_20px_-5px_rgba(168,85,247,0.15)]'
                  }
                `}
              >
                {/* Left Accent Bar for Unread */}
                {!notif.read && (
                  <div className="absolute left-0 top-4 bottom-4 w-1 bg-gradient-to-b from-purple-500 to-blue-500 rounded-r-full"></div>
                )}

                {/* Icon Bubble */}
                <div className={`
                  flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center border border-white/5
                  ${notif.read ? 'bg-white/5' : 'bg-gradient-to-br from-white/10 to-white/5 shadow-inner'}
                `}>
                  {getNotificationIcon(notif.type)}
                </div>

                {/* Content */}
                <div className="flex-grow pt-1">
                   <div className="text-gray-300 text-sm leading-relaxed mb-2">
                      {renderNotificationMessage(notif) || notif.message}
                   </div>
                   <p className="text-xs text-gray-500 font-mono">
                      {new Date(notif.createdAt).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                   </p>
                </div>

                {/* Action Button */}
                {!notif.read && (
                  <button
                    onClick={() => markAsReadHandler(notif._id)}
                    className="flex-shrink-0 self-center group/btn"
                    title="Mark as read"
                  >
                    <div className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                      <CheckCircleIcon className="w-6 h-6" />
                    </div>
                  </button>
                )}

                {/* Read Indicator (Visual Ghost) */}
                {notif.read && (
                   <div className="flex-shrink-0 self-center opacity-20 grayscale">
                      <CheckCircleIcon className="w-5 h-5" />
                   </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
// // // client/src/pages/ClaimsOnMyItemsPage.jsx
// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import { Link } from 'react-router-dom';
// // import { useAuth } from '../context/AuthContext';

// // const ClaimsOnMyItemsPage = () => {
// //   const [claims, setClaims] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState('');
// //   const { user, API_BASE_URL } = useAuth();

// //   const fetchClaims = async () => {
// //     if (!user) {
// //       setError('Please log in to view claims on your items.');
// //       setLoading(false);
// //       return;
// //     }
// //     try {
// //       const config = {
// //         headers: {
// //           Authorization: `Bearer ${user.token}`,
// //         },
// //       };
// //       const { data } = await axios.get(`${API_BASE_URL}/claims/on-my-items`, config);
// //       setClaims(data);
// //       setLoading(false);
// //     } catch (err) {
// //       setError(err.response?.data?.message || 'Failed to fetch claims on your items.');
// //       setLoading(false);
// //       console.error(err);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchClaims();
// //   }, [user, API_BASE_URL]);

// //   const handleUpdateClaimStatus = async (claimId, status) => {
// //     if (!window.confirm(`Are you sure you want to ${status.toLowerCase()} this claim?`)) {
// //       return;
// //     }

// //     try {
// //       const config = {
// //         headers: {
// //           'Content-Type': 'application/json',
// //           Authorization: `Bearer ${user.token}`,
// //         },
// //       };
// //       await axios.put(`${API_BASE_URL}/claims/${claimId}/status`, { status }, config);
// //       alert(`Claim ${status.toLowerCase()} successfully!`);
// //       fetchClaims(); // Re-fetch claims to update UI
// //     } catch (err) {
// //       setError(err.response?.data?.message || `Failed to ${status.toLowerCase()} claim.`);
// //       console.error(err);
// //     }
// //   };


// //   if (loading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center text-xl text-gray-600">
// //         Loading claims...
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

// //   const getStatusColor = (status) => {
// //     switch (status) {
// //       case 'PENDING': return 'bg-yellow-100 text-yellow-800';
// //       case 'APPROVED': return 'bg-green-100 text-green-800';
// //       case 'REJECTED': return 'bg-red-100 text-red-800';
// //       case 'WITHDRAWN': return 'bg-gray-100 text-gray-800';
// //       default: return 'bg-gray-100 text-gray-800';
// //     }
// //   };

// //   return (
// //     <div className="container mx-auto p-4 py-8">
// //       <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Claims on Your Found Items</h1>

// //       {claims.length === 0 ? (
// //         <p className="text-center text-gray-600 text-lg">No claims have been made on your found items yet.</p>
// //       ) : (
// //         <div className="space-y-6">
// //           {claims.map((claim) => (
// //             <div key={claim._id} className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
// //               <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border border-gray-200">
// //                 <img
// //                   src={claim.found_item?.images[0]?.url || 'https://via.placeholder.com/100x100?text=Found+Item'}
// //                   alt={claim.found_item?.title || 'Found Item'}
// //                   className="w-full h-full object-cover"
// //                 />
// //               </div>
// //               <div className="flex-grow">
// //                 <h2 className="text-xl font-semibold text-gray-800 mb-1">
// //                   Item: <Link to={`/items/${claim.found_item?._id}`} className="text-indigo-600 hover:underline">
// //                     {claim.found_item?.title || 'Unknown Item'}
// //                   </Link>
// //                 </h2>
// //                 <p className="text-gray-700 mb-2">
// //                   <span className="font-semibold">Claimer:</span> {claim.claimer?.name || 'N/A'} (<a href={`mailto:${claim.claimer?.email}`} className="text-indigo-600 hover:underline">{claim.claimer?.email || 'N/A'}</a>)
// //                 </p>
// //                 <p className="text-gray-700 mb-2">
// //                   <span className="font-semibold">Claimer's Karma:</span> {claim.claimer?.karma_points || 0}
// //                 </p>
// //                 <p className="text-gray-700 mb-2">
// //                   <span className="font-semibold">Your Question:</span> {claim.found_item?.proof_question || 'N/A'}
// //                 </p>
// //                 <p className="text-gray-700 mb-2">
// //                   <span className="font-semibold">Claimer's Answer:</span> {claim.proof_answer}
// //                 </p>
// //                 {claim.lost_item_reported_by_claimer && (
// //                   <p className="text-sm text-gray-500 mb-2">
// //                     Claimer's lost item: <Link to={`/items/${claim.lost_item_reported_by_claimer._id}`} className="text-indigo-600 hover:underline">
// //                       {claim.lost_item_reported_by_claimer.title}
// //                     </Link>
// //                   </p>
// //                 )}
// //                 <p className="text-gray-500 text-sm">
// //                   Claim Date: {new Date(claim.createdAt).toLocaleDateString()}
// //                 </p>
// //               </div>
// //               <div className="flex flex-col items-end md:items-center space-y-2">
// //                 <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(claim.status)}`}>
// //                   {claim.status}
// //                 </span>
// //                 {claim.status === 'PENDING' && (
// //                   <div className="flex space-x-2 mt-2">
// //                     <button
// //                       onClick={() => handleUpdateClaimStatus(claim._id, 'APPROVED')}
// //                       className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded-md transition duration-300"
// //                     >
// //                       Approve
// //                     </button>
// //                     <button
// //                       onClick={() => handleUpdateClaimStatus(claim._id, 'REJECTED')}
// //                       className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded-md transition duration-300"
// //                     >
// //                       Reject
// //                     </button>
// //                   </div>
// //                 )}
// //                 {(claim.status === 'APPROVED' || claim.status === 'CLAIMED') && claim.claimer?.email && ( // 'CLAIMED' status check is mostly for consistency, claim status is APPROVED
// //                   <a
// //                     href={`mailto:${claim.claimer.email}`}
// //                     className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition duration-300 mt-2"
// //                   >
// //                     Contact Claimer
// //                   </a>
// //                 )}
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default ClaimsOnMyItemsPage;
// // client/src/pages/ClaimsOnMyItemsPage.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const ClaimsOnMyItemsPage = () => {
//   const [claims, setClaims] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const { user, API_BASE_URL } = useAuth();

//   const fetchClaims = async () => {
//     if (!user) {
//       setError("Please log in to view claims on your items.");
//       setLoading(false);
//       return;
//     }
//     try {
//       const config = {
//         headers: { Authorization: `Bearer ${user.token}` },
//       };
//       const { data } = await axios.get(`${API_BASE_URL}/claims/on-my-items`, config);
//       setClaims(data);
//       setLoading(false);
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to fetch claims.");
//       setLoading(false);
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchClaims();
//   }, [user, API_BASE_URL]);

//   const handleUpdateClaimStatus = async (claimId, status) => {
//     if (!window.confirm(`Are you sure you want to ${status.toLowerCase()} this claim?`)) return;

//     try {
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${user.token}`,
//         },
//       };
//       await axios.put(`${API_BASE_URL}/claims/${claimId}/status`, { status }, config);
//       alert(`Claim ${status.toLowerCase()} successfully!`);
//       fetchClaims();
//     } catch (err) {
//       setError(err.response?.data?.message || `Failed to ${status.toLowerCase()} claim.`);
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "PENDING":
//         return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
//       case "APPROVED":
//         return "bg-green-500/20 text-green-300 border-green-500/30";
//       case "REJECTED":
//         return "bg-red-500/20 text-red-300 border-red-500/30";
//       case "WITHDRAWN":
//         return "bg-gray-500/20 text-gray-300 border-gray-500/30";
//       default:
//         return "bg-gray-500/20 text-gray-200 border-gray-500/30";
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-xl text-purple-200 bg-[#0a0118]">
//         Loading claims...
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-red-400 text-xl bg-[#0a0118]">
//         {error}
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[#0a0118] via-[#140123] to-[#1a0133] py-10 px-4">
//       <h1 className="text-4xl font-extrabold text-purple-200 text-center mb-10 
//                      drop-shadow-[0_0_12px_rgba(165,105,255,0.5)]">
//         Claims On Your Items
//       </h1>

//       {claims.length === 0 ? (
//         <p className="text-center text-purple-300 text-xl">No claims yet.</p>
//       ) : (
//         <div className="space-y-8 max-w-5xl mx-auto">
//           {claims.map((claim) => (
//             <div
//               key={claim._id}
//               className="
//                 backdrop-blur-xl bg-white/5 border border-white/10 
//                 shadow-xl rounded-2xl p-6 
//                 flex flex-col md:flex-row items-start gap-6 
//                 transition-all duration-500 
//                 hover:shadow-purple-500/40 hover:-translate-y-1 hover:scale-[1.01]
//               "
//             >
//               {/* Image */}
//               <div className="w-28 h-28 rounded-xl overflow-hidden border border-white/20 shadow-inner">
//                 <img
//                   src={
//                     claim.found_item?.images[0]?.url ||
//                     'https://via.placeholder.com/100x100?text=Item'
//                   }
//                   alt="Found Item"
//                   className="object-cover w-full h-full"
//                 />
//               </div>

//               {/* Content */}
//               <div className="flex-grow text-purple-100">
//                 <h2 className="text-2xl font-semibold mb-2">
//                   Item:{" "}
//                   <Link
//                     to={`/items/${claim.found_item?._id}`}
//                     className="text-purple-300 hover:text-purple-400 underline"
//                   >
//                     {claim.found_item?.title}
//                   </Link>
//                 </h2>

//                 <p className="mb-1">
//                   <span className="font-semibold">Claimer:</span>{" "}
//                   {claim.claimer?.name} (
//                   <a
//                     href={`mailto:${claim.claimer?.email}`}
//                     className="text-purple-300 hover:text-purple-400 underline"
//                   >
//                     {claim.claimer?.email}
//                   </a>
//                   )
//                 </p>

//                 <p className="mb-1">
//                   <span className="font-semibold">Claimer Karma:</span>{" "}
//                   {claim.claimer?.karma_points}
//                 </p>

//                 <p className="mb-1">
//                   <span className="font-semibold">Your Question:</span>{" "}
//                   {claim.found_item?.proof_question}
//                 </p>

//                 <p className="mb-1">
//                   <span className="font-semibold">Answer:</span>{" "}
//                   {claim.proof_answer}
//                 </p>

//                 <p className="text-sm text-purple-400">
//                   Claim Date:{" "}
//                   {new Date(claim.createdAt).toLocaleDateString()}
//                 </p>
//               </div>

//               {/* Status + Buttons */}
//               <div className="flex flex-col items-end space-y-3">
//                 <span
//                   className={`px-4 py-1.5 rounded-full text-sm font-semibold border ${getStatusColor(
//                     claim.status
//                   )}`}
//                 >
//                   {claim.status}
//                 </span>

//                 {claim.status === "PENDING" && (
//                   <div className="flex space-x-3">
//                     <button
//                       onClick={() => handleUpdateClaimStatus(claim._id, "APPROVED")}
//                       className="px-4 py-1 bg-green-600/30 border border-green-500/40 
//                                  text-green-300 rounded-md 
//                                  hover:bg-green-600/50 transition-all"
//                     >
//                       Approve
//                     </button>
//                     <button
//                       onClick={() => handleUpdateClaimStatus(claim._id, "REJECTED")}
//                       className="px-4 py-1 bg-red-600/30 border border-red-500/40 
//                                  text-red-300 rounded-md 
//                                  hover:bg-red-600/50 transition-all"
//                     >
//                       Reject
//                     </button>
//                   </div>
//                 )}

//                 {(claim.status === "APPROVED" || claim.status === "CLAIMED") &&
//                   claim.claimer?.email && (
//                     <a
//                       href={`mailto:${claim.claimer.email}`}
//                       className="px-4 py-1 bg-blue-600/30 border border-blue-500/40 
//                                  text-blue-300 rounded-md 
//                                  hover:bg-blue-600/50 transition-all"
//                     >
//                       Contact Claimer
//                     </a>
//                   )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ClaimsOnMyItemsPage;
// client/src/pages/ClaimsOnMyItemsPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { 
  CheckBadgeIcon, 
  XMarkIcon, 
  EnvelopeIcon, 
  UserCircleIcon, 
  QuestionMarkCircleIcon,
  ShieldCheckIcon
} from "@heroicons/react/24/outline";

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
  .scrollbar-hide::-webkit-scrollbar {
      display: none;
  }
`;

const ClaimsOnMyItemsPage = () => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user, API_BASE_URL } = useAuth();

  const fetchClaims = async () => {
    if (!user) {
      setError("Please log in to view claims.");
      setLoading(false);
      return;
    }
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get(`${API_BASE_URL}/claims/on-my-items`, config);
      setClaims(data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch claims.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClaims();
  }, [user, API_BASE_URL]);

  const handleUpdateClaimStatus = async (claimId, status) => {
    if (!window.confirm(`Are you sure you want to ${status.toLowerCase()} this claim?`)) return;

    try {
      const config = {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${user.token}` },
      };
      await axios.put(`${API_BASE_URL}/claims/${claimId}/status`, { status }, config);
      // Ideally use toast here instead of alert
      fetchClaims();
    } catch (err) {
      console.error(err);
      alert("Action failed");
    }
  };

  const getStatusTheme = (status) => {
    switch (status) {
      case "PENDING":
        return {
          border: "border-yellow-500/50",
          text: "text-yellow-400",
          bg: "bg-yellow-500/10",
          glow: "shadow-yellow-500/20"
        };
      case "APPROVED":
        return {
          border: "border-emerald-500/50",
          text: "text-emerald-400",
          bg: "bg-emerald-500/10",
          glow: "shadow-emerald-500/20"
        };
      case "REJECTED":
        return {
          border: "border-red-500/50",
          text: "text-red-400",
          bg: "bg-red-500/10",
          glow: "shadow-red-500/20"
        };
      case "WITHDRAWN":
        return {
          border: "border-gray-500/50",
          text: "text-gray-400",
          bg: "bg-gray-500/10",
          glow: "shadow-gray-500/20"
        };
      default:
        return { border: "border-gray-500", text: "text-gray-400", bg: "bg-gray-500/10", glow: "" };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a12] text-white">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-purple-300 font-mono animate-pulse">Decrypting Data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a12] text-red-400 font-mono">
        <span className="border border-red-500/30 bg-red-500/10 px-6 py-4 rounded-xl backdrop-blur-md">
          Error: {error}
        </span>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full bg-[#0a0a12] text-white overflow-hidden font-sans selection:bg-purple-500/30 pt-40">
      <style>{customStyles}</style>

      {/* --- Dynamic Background --- */}
      <div className="fixed inset-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-[35rem] h-[35rem] bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[40rem] h-[40rem] bg-indigo-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-12">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
              Claim Management
            </span>
          </h1>
          <p className="text-gray-400 font-mono text-sm uppercase tracking-widest">
            Review proofs & approve ownership
          </p>
        </div>

        {/* Claims List */}
        {claims.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md">
            <ShieldCheckIcon className="w-16 h-16 text-gray-600 mb-4" />
            <p className="text-xl text-gray-400 font-medium">No active claims.</p>
            <p className="text-gray-600 text-sm">Your items are safe for now.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {claims.map((claim) => {
              const theme = getStatusTheme(claim.status);
              
              return (
                <div
                  key={claim._id}
                  className={`
                    group relative flex flex-col md:flex-row gap-6 p-6 rounded-3xl
                    bg-[#13131f]/60 backdrop-blur-xl border border-white/10
                    transition-all duration-500
                    hover:shadow-[0_0_30px_-10px_rgba(100,100,255,0.2)] hover:-translate-y-1
                  `}
                >
                  {/* Status Side Glow Bar */}
                  <div className={`absolute left-0 top-6 bottom-6 w-1 rounded-r-full transition-colors duration-300 ${theme.bg.replace('/10', '')} shadow-[0_0_15px_currentColor] ${theme.text}`}></div>

                  {/* 1. Item Image */}
                  <div className="w-full md:w-48 h-48 flex-shrink-0 rounded-2xl overflow-hidden border border-white/10 relative group-hover:border-white/20 transition-all">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                    <img
                      src={claim.found_item?.images[0]?.url || 'https://via.placeholder.com/300x300?text=No+Image'}
                      alt="Item"
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute bottom-3 left-3 z-20">
                       <p className="text-xs text-gray-400 uppercase font-mono">Item Ref</p>
                       <Link to={`/items/${claim.found_item?._id}`} className="text-white font-bold hover:underline truncate block max-w-[10rem]">
                         {claim.found_item?.title}
                       </Link>
                    </div>
                  </div>

                  {/* 2. Main Content */}
                  <div className="flex-grow space-y-5">
                    
                    {/* Claimer Header */}
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold">{claim.claimer?.name?.[0]}</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white leading-none">{claim.claimer?.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-400">{claim.claimer?.email}</span>
                            <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                            <span className="text-xs font-mono text-purple-400">Karma: {claim.claimer?.karma_points}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Status Badge */}
                      <div className={`px-4 py-1.5 rounded-lg border ${theme.border} ${theme.bg} ${theme.text} ${theme.glow} text-xs font-bold tracking-wider shadow-lg backdrop-blur-md`}>
                        {claim.status}
                      </div>
                    </div>

                    {/* Q&A Data Log */}
                    <div className="bg-black/30 rounded-xl border border-white/5 p-4 font-mono text-sm relative overflow-hidden">
                      {/* Scanline effect */}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-10 pointer-events-none"></div>
                      
                      <div className="mb-3">
                        <span className="text-gray-500 block text-xs mb-1 flex items-center gap-1">
                          <QuestionMarkCircleIcon className="w-3 h-3"/> Security Question
                        </span>
                        <p className="text-purple-200">{claim.found_item?.proof_question}</p>
                      </div>
                      <div>
                        <span className="text-gray-500 block text-xs mb-1 flex items-center gap-1">
                          <ShieldCheckIcon className="w-3 h-3"/> Provided Proof
                        </span>
                        <p className="text-blue-200">{claim.proof_answer}</p>
                      </div>
                    </div>

                    <p className="text-xs text-gray-500 font-mono text-right">
                      Claimed: {new Date(claim.createdAt).toLocaleString()}
                    </p>
                  </div>

                  {/* 3. Actions Panel */}
                  <div className="flex md:flex-col gap-3 justify-end md:justify-start md:border-l md:border-white/5 md:pl-6 min-w-[140px]">
                    
                    {claim.status === "PENDING" && (
                      <>
                        <button
                          onClick={() => handleUpdateClaimStatus(claim._id, "APPROVED")}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-emerald-900/20 hover:shadow-emerald-500/30 transition-all transform hover:-translate-y-0.5"
                        >
                          <CheckBadgeIcon className="w-5 h-5" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleUpdateClaimStatus(claim._id, "REJECTED")}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-red-500/30 text-red-400 hover:bg-red-500/10 text-sm font-bold rounded-xl transition-all hover:border-red-500/60"
                        >
                          <XMarkIcon className="w-5 h-5" />
                          Reject
                        </button>
                      </>
                    )}

                    {(claim.status === "APPROVED" || claim.status === "CLAIMED") && (
                      <a
                        href={`mailto:${claim.claimer?.email}`}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600/20 border border-blue-500/50 text-blue-300 hover:bg-blue-600/30 hover:text-white text-sm font-bold rounded-xl transition-all shadow-[0_0_15px_-5px_rgba(59,130,246,0.4)]"
                      >
                        <EnvelopeIcon className="w-5 h-5" />
                        Contact
                      </a>
                    )}
                    
                    {/* Disabled/Info State for others */}
                    {claim.status === "REJECTED" && (
                      <div className="text-center text-gray-500 text-xs py-2 font-mono">
                        Action Closed
                      </div>
                    )}
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

export default ClaimsOnMyItemsPage;
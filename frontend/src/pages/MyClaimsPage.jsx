// // client/src/pages/MyClaimsPage.jsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const MyClaimsPage = () => {
//   const [myClaims, setMyClaims] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const { user, API_BASE_URL } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchMyClaims = async () => {
//       if (!user) {
//         setError('Please log in to view your claims.');
//         setLoading(false);
//         return;
//       }
//       try {
//         const config = {
//           headers: {
//             Authorization: `Bearer ${user.token}`,
//           },
//         };
//         const { data } = await axios.get(`${API_BASE_URL}/claims/my`, config);
//         setMyClaims(data);
//         setLoading(false);
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to fetch your claims.');
//         setLoading(false);
//         console.error(err);
//       }
//     };

//     fetchMyClaims();
//   }, [user, API_BASE_URL]);

//   const handleWithdrawClaim = async (claimId) => {
//     if (!window.confirm('Are you sure you want to withdraw this claim?')) {
//       return;
//     }

//     try {
//       // TODO: Implement a backend endpoint for withdrawing claims.
//       // For now, this is a placeholder to show where it would go.
//       // A PUT request to /api/claims/:id/status with { status: 'WITHDRAWN' } would be ideal.
//       // For now, we'll simulate success.
//       alert('Claim withdrawal functionality is not yet implemented on the backend.');
//       console.log(`Attempted to withdraw claim ${claimId}`);
//       // Simulate update in UI
//       setMyClaims(myClaims.map(claim =>
//         claim._id === claimId ? { ...claim, status: 'WITHDRAWN' } : claim
//       ));
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to withdraw claim.');
//       console.error(err);
//     }
//   };


//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-xl text-gray-600">
//         Loading your claims...
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-red-600 text-xl">
//         {error}
//       </div>
//     );
//   }

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'PENDING': return 'bg-yellow-100 text-yellow-800';
//       case 'APPROVED': return 'bg-green-100 text-green-800';
//       case 'REJECTED': return 'bg-red-100 text-red-800';
//       case 'WITHDRAWN': return 'bg-gray-100 text-gray-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   return (
//     <div className="container mx-auto p-4 py-8">
//       <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">My Claims</h1>

//       {myClaims.length === 0 ? (
//         <p className="text-center text-gray-600 text-lg">You haven't made any claims yet.</p>
//       ) : (
//         <div className="space-y-6">
//           {myClaims.map((claim) => (
//             <div key={claim._id} className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
//               <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border border-gray-200">
//                 <img
//                   src={claim.found_item?.images[0]?.url || 'https://via.placeholder.com/100x100?text=No+Image'}
//                   alt={claim.found_item?.title || 'Found Item'}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <div className="flex-grow">
//                 <h2 className="text-xl font-semibold text-gray-800 mb-1">
//                   Claim for: <Link to={`/items/${claim.found_item?._id}`} className="text-indigo-600 hover:underline">
//                     {claim.found_item?.title || 'Unknown Item'}
//                   </Link>
//                 </h2>
//                 <p className="text-gray-700 mb-2">
//                   <span className="font-semibold">Your Answer:</span> {claim.proof_answer}
//                 </p>
//                 {claim.lost_item_reported_by_claimer && (
//                   <p className="text-sm text-gray-500 mb-2">
//                     Matched with your lost item: <Link to={`/items/${claim.lost_item_reported_by_claimer._id}`} className="text-indigo-600 hover:underline">
//                       {claim.lost_item_reported_by_claimer.title}
//                     </Link>
//                   </p>
//                 )}
//                 <p className="text-gray-500 text-sm">
//                   Claim Date: {new Date(claim.createdAt).toLocaleDateString()}
//                 </p>
//               </div>
//               <div className="flex flex-col items-end md:items-center space-y-2">
//                 <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(claim.status)}`}>
//                   {claim.status}
//                 </span>
//                 {claim.status === 'PENDING' && (
//                   <button
//                     onClick={() => handleWithdrawClaim(claim._id)}
//                     className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm rounded-md transition duration-300"
//                   >
//                     Withdraw Claim
//                   </button>
//                 )}
//                 {claim.status === 'APPROVED' && claim.found_item.finder_id?.email && (
//                   <a
//                     href={`mailto:${claim.found_item.finder_id.email}`}
//                     className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition duration-300"
//                   >
//                     Contact Finder
//                   </a>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyClaimsPage;
// client/src/pages/MyClaimsPage.jsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const MyClaimsPage = () => {
//   const [myClaims, setMyClaims] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const { user, API_BASE_URL } = useAuth();
//   const navigate = useNavigate();

//   const fetchMyClaims = async () => {
//     if (!user) {
//       setError('Please log in to view your claims.');
//       setLoading(false);
//       return;
//     }
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//         },
//       };
//       const { data } = await axios.get(`${API_BASE_URL}/claims/my`, config);
//       setMyClaims(data);
//       setLoading(false);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to fetch your claims.');
//       setLoading(false);
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchMyClaims();
//   }, [user, API_BASE_URL]);

//   const handleWithdrawClaim = async (claimId) => {
//     if (!window.confirm('Are you sure you want to withdraw this claim? This cannot be undone.')) {
//       return;
//     }

//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//         },
//       };
//       await axios.put(`${API_BASE_URL}/claims/${claimId}/withdraw`, {}, config);
//       alert('Claim withdrawn successfully!');
//       fetchMyClaims(); // Re-fetch claims to update UI
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to withdraw claim.');
//       console.error(err);
//     }
//   };


//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-xl text-gray-600">
//         Loading your claims...
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-red-600 text-xl">
//         {error}
//       </div>
//     );
//   }

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'PENDING': return 'bg-yellow-100 text-yellow-800';
//       case 'APPROVED': return 'bg-green-100 text-green-800';
//       case 'REJECTED': return 'bg-red-100 text-red-800';
//       case 'WITHDRAWN': return 'bg-gray-100 text-gray-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   return (
//     <div className="container mx-auto p-4 py-8">
//       <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">My Claims</h1>

//       {myClaims.length === 0 ? (
//         <p className="text-center text-gray-600 text-lg">You haven't made any claims yet.</p>
//       ) : (
//         <div className="space-y-6">
//           {myClaims.map((claim) => (
//             <div key={claim._id} className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
//               <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border border-gray-200">
//                 <img
//                   src={claim.found_item?.images[0]?.url || 'https://via.placeholder.com/100x100?text=No+Image'}
//                   alt={claim.found_item?.title || 'Found Item'}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <div className="flex-grow">
//                 <h2 className="text-xl font-semibold text-gray-800 mb-1">
//                   Claim for: <Link to={`/items/${claim.found_item?._id}`} className="text-indigo-600 hover:underline">
//                     {claim.found_item?.title || 'Unknown Item'}
//                   </Link>
//                 </h2>
//                 <p className="text-gray-700 mb-2">
//                   <span className="font-semibold">Your Answer:</span> {claim.proof_answer}
//                 </p>
//                 {claim.lost_item_reported_by_claimer && (
//                   <p className="text-sm text-gray-500 mb-2">
//                     Matched with your lost item: <Link to={`/items/${claim.lost_item_reported_by_claimer._id}`} className="text-indigo-600 hover:underline">
//                       {claim.lost_item_reported_by_claimer.title}
//                     </Link>
//                   </p>
//                 )}
//                 <p className="text-gray-500 text-sm">
//                   Claim Date: {new Date(claim.createdAt).toLocaleDateString()}
//                 </p>
//               </div>
//               <div className="flex flex-col items-end md:items-center space-y-2">
//                 <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(claim.status)}`}>
//                   {claim.status}
//                 </span>
//                 {claim.status === 'PENDING' && (
//                   <button
//                     onClick={() => handleWithdrawClaim(claim._id)}
//                     className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm rounded-md transition duration-300"
//                   >
//                     Withdraw Claim
//                   </button>
//                 )}
//                 {claim.status === 'APPROVED' && claim.found_item.finder_id?.email && (
//                   <a
//                     href={`mailto:${claim.found_item.finder_id.email}`}
//                     className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition duration-300"
//                   >
//                     Contact Finder
//                   </a>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyClaimsPage;

// client/src/pages/MyClaimsPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  ChatBubbleLeftRightIcon, 
  TrashIcon, 
  ClockIcon, 
  CheckBadgeIcon, 
  XCircleIcon, 
  NoSymbolIcon,
  DocumentTextIcon,
  ArrowTopRightOnSquareIcon
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
  .animation-delay-4000 {
    animation-delay: 4s;
  }
`;

const MyClaimsPage = () => {
  const [myClaims, setMyClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user, API_BASE_URL } = useAuth();
  const navigate = useNavigate();

  const fetchMyClaims = async () => {
    if (!user) {
      setError('Please log in to view your claims.');
      setLoading(false);
      return;
    }
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get(`${API_BASE_URL}/claims/my`, config);
      setMyClaims(data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch your claims.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyClaims();
  }, [user, API_BASE_URL]);

  const handleWithdrawClaim = async (claimId) => {
    if (!window.confirm('Are you sure you want to withdraw this claim? This cannot be undone.')) {
      return;
    }

    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.put(`${API_BASE_URL}/claims/${claimId}/withdraw`, {}, config);
      // Ideally use toast here
      fetchMyClaims(); 
    } catch (err) {
      console.error(err);
      alert('Failed to withdraw claim.');
    }
  };

  // --- Helper for Status Styles ---
  const getStatusConfig = (status) => {
    switch (status) {
      case 'PENDING':
        return {
          color: 'text-yellow-400',
          bg: 'bg-yellow-400/10',
          border: 'border-yellow-400/20',
          glow: 'shadow-[0_0_15px_rgba(250,204,21,0.15)]',
          icon: <ClockIcon className="w-4 h-4" />
        };
      case 'APPROVED':
        return {
          color: 'text-emerald-400',
          bg: 'bg-emerald-400/10',
          border: 'border-emerald-400/20',
          glow: 'shadow-[0_0_15px_rgba(52,211,153,0.15)]',
          icon: <CheckBadgeIcon className="w-4 h-4" />
        };
      case 'REJECTED':
        return {
          color: 'text-red-400',
          bg: 'bg-red-400/10',
          border: 'border-red-400/20',
          glow: 'shadow-[0_0_15px_rgba(248,113,113,0.15)]',
          icon: <XCircleIcon className="w-4 h-4" />
        };
      case 'WITHDRAWN':
        return {
          color: 'text-gray-400',
          bg: 'bg-gray-400/10',
          border: 'border-gray-400/20',
          glow: '',
          icon: <NoSymbolIcon className="w-4 h-4" />
        };
      default:
        return { color: 'text-gray-400', bg: 'bg-gray-400/10', border: 'border-white/10', icon: null };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a12] text-white">
        <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-cyan-300 font-mono animate-pulse">Retrieving Claim Data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a12] text-red-400">
        <div className="bg-red-500/10 border border-red-500/20 px-6 py-4 rounded-xl">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full bg-[#0a0a12] text-white overflow-hidden font-sans selection:bg-cyan-500/30 pb-20  pt-[70px]">
      <style>{customStyles}</style>

      {/* --- Dynamic Background --- */}
      <div className="fixed inset-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-cyan-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob"></div>
        <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-12">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
              My Claim History
            </span>
          </h1>
          <p className="text-gray-400 text-sm font-mono uppercase tracking-widest">
            Track & Manage your ownership requests
          </p>
        </div>

        {myClaims.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm">
            <DocumentTextIcon className="w-16 h-16 text-gray-600 mb-4" />
            <p className="text-xl text-gray-400">No claims filed yet.</p>
            <Link to="/" className="mt-4 text-cyan-400 hover:text-cyan-300 underline">Browse found items</Link>
          </div>
        ) : (
          <div className="space-y-6">
            {myClaims.map((claim) => {
              const statusStyle = getStatusConfig(claim.status);

              return (
                <div 
                  key={claim._id} 
                  className={`
                    group relative flex flex-col md:flex-row gap-6 p-6 rounded-2xl
                    bg-[#13131f]/60 backdrop-blur-xl border border-white/10
                    transition-all duration-300 hover:bg-[#13131f]/80 hover:border-white/20
                    ${statusStyle.glow}
                  `}
                >
                  {/* Status Accent Bar (Left) */}
                  <div className={`absolute left-0 top-6 bottom-6 w-1 rounded-r-full ${statusStyle.bg.replace('/10', '')}`}></div>

                  {/* Image Section */}
                  <div className="flex-shrink-0 w-full md:w-32 h-32 rounded-xl overflow-hidden border border-white/10 relative">
                    <img
                      src={claim.found_item?.images[0]?.url || 'https://via.placeholder.com/150x150?text=No+Image'}
                      alt="Item"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  {/* Content Section */}
                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h2 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors truncate">
                          <Link to={`/items/${claim.found_item?._id}`} className="flex items-center gap-2">
                            {claim.found_item?.title || 'Unknown Item'}
                            <ArrowTopRightOnSquareIcon className="w-4 h-4 opacity-50" />
                          </Link>
                        </h2>
                        {/* Status Badge */}
                        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border ${statusStyle.bg} ${statusStyle.border} ${statusStyle.color} text-xs font-bold uppercase tracking-wide`}>
                          {statusStyle.icon}
                          {claim.status}
                        </div>
                      </div>

                      {/* Data Log: Proof Answer */}
                      <div className="mt-3 bg-black/30 border border-white/5 rounded-lg p-3 font-mono text-sm text-gray-300">
                         <span className="text-[10px] text-gray-500 uppercase block mb-1">Your Proof Submission:</span>
                         <p className="line-clamp-2">{claim.proof_answer}</p>
                      </div>

                      {/* Linked Lost Item (if applicable) */}
                      {claim.lost_item_reported_by_claimer && (
                        <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
                           <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                           Matched with your report: 
                           <Link to={`/items/${claim.lost_item_reported_by_claimer._id}`} className="text-purple-400 hover:underline">
                              {claim.lost_item_reported_by_claimer.title}
                           </Link>
                        </div>
                      )}
                    </div>

                    {/* Footer Info */}
                    <div className="mt-4 flex items-center gap-4 text-xs text-gray-500 font-mono">
                      <span>ID: {claim._id.slice(-6).toUpperCase()}</span>
                      <span>•</span>
                      <span>{new Date(claim.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Actions Section */}
                  <div className="flex flex-row md:flex-col gap-3 justify-end md:justify-center min-w-[140px] md:border-l md:border-white/5 md:pl-6">
                    
                    {claim.status === 'PENDING' && (
                      <button
                        onClick={() => handleWithdrawClaim(claim._id)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 text-red-400 text-sm font-medium rounded-lg transition-all"
                      >
                        <TrashIcon className="w-4 h-4" />
                        Withdraw
                      </button>
                    )}

                    {claim.status === 'APPROVED' && claim.found_item?.finder_id?.email && (
                      <a
                        href={`mailto:${claim.found_item.finder_id.email}`}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-sm font-bold rounded-lg shadow-lg shadow-cyan-900/20 transition-all"
                      >
                        <ChatBubbleLeftRightIcon className="w-4 h-4" />
                        Contact Finder
                      </a>
                    )}

                    {claim.status === 'REJECTED' && (
                       <div className="text-center text-xs text-gray-500 font-mono py-2">
                          Case Closed
                       </div>
                    )}
                     {claim.status === 'WITHDRAWN' && (
                       <div className="text-center text-xs text-gray-500 font-mono py-2">
                          Archived
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

export default MyClaimsPage;
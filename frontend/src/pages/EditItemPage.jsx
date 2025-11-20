// // client/src/pages/EditItemPage.jsx
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { useAuth } from '../context/AuthContext';

// const categoryOptions = [
//   'Electronics', 'Stationary', 'Clothing', 'ID/Docs', 'Keys', 'Other'
// ];
// const campusOptions = ['DTU', 'NSUT', 'IIIT', 'Other'];
// const dtuSpots = ['MicMac Canteen', 'SPS Hall', 'Library', 'Mech Block', 'OAT', 'Main Gate'];
// const nsutSpots = ['Student Center', 'Amul', 'Moksha Ground', 'Library Block A'];
// const iiitSpots = ['Academic Block', 'Library', 'Hostel Mess'];

// const EditItemPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { user, API_BASE_URL } = useAuth();

//   // Form states
//   const [type, setType] = useState(''); // Item type, cannot be changed after creation
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [category, setCategory] = useState('');
//   const [campus, setCampus] = useState('');
//   const [specificSpot, setSpecificSpot] = useState('');
//   const [proofQuestion, setProofQuestion] = useState(''); // New state for proof question

//   // UI feedback states
//   const [loading, setLoading] = useState(true); // For initial item fetch
//   const [submitting, setSubmitting] = useState(false); // For form submission
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [itemFinderId, setItemFinderId] = useState(null); // To check if current user is finder

//   useEffect(() => {
//     const fetchItem = async () => {
//       if (!user) {
//         setError('Please log in to edit items.');
//         setLoading(false);
//         return;
//       }
//       try {
//         const config = {
//           headers: { Authorization: `Bearer ${user.token}` },
//         };
//         const { data } = await axios.get(`${API_BASE_URL}/items/${id}`, config);

//         // Check if current user is the finder
//         if (data.finder_id?._id !== user._id) {
//             setError('You are not authorized to edit this item.');
//             setLoading(false);
//             return;
//         }

//         // Populate form fields with existing item data
//         setType(data.type);
//         setTitle(data.title);
//         setDescription(data.description);
//         setCategory(data.category);
//         setCampus(data.location.campus);
//         setSpecificSpot(data.location.specific_spot);
//         setProofQuestion(data.proof_question || ''); // Set proof question
//         setItemFinderId(data.finder_id?._id);

//         setLoading(false);
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to fetch item details for editing.');
//         setLoading(false);
//         console.error(err);
//       }
//     };

//     fetchItem();
//   }, [id, user, API_BASE_URL]);


//   const submitHandler = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);
//     setError('');
//     setSuccess('');

//     // Client-side validation
//     if (!title || !description || !category || !campus || !specificSpot) {
//       setError('Please fill in all required fields.');
//       setSubmitting(false);
//       return;
//     }

//     try {
//       const config = {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${user.token}`,
//         },
//       };

//       const itemData = {
//         title,
//         description,
//         category,
//         campus,
//         specific_spot: specificSpot,
//         proof_question: type === 'FOUND' ? proofQuestion : undefined, // Only send for FOUND items
//         // Images and AI metadata are not updated via this endpoint for simplicity
//       };

//       const { data } = await axios.put(`${API_BASE_URL}/items/${id}`, itemData, config);

//       setSuccess('Item updated successfully!');
//       console.log('Updated Item:', data);
//       navigate(`/items/${data._id}`); // Redirect to item detail page
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to update item.');
//       console.error(err);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const getSpecificSpotOptions = () => {
//     switch (campus) {
//       case 'DTU': return dtuSpots;
//       case 'NSUT': return nsutSpots;
//       case 'IIIT': return iiitSpots;
//       default: return ['Other'];
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-xl text-gray-600">
//         Loading item for editing...
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

//   // Final check for authorization before rendering form
//   if (itemFinderId !== user._id) {
//       return (
//         <div className="min-h-screen flex items-center justify-center text-red-600 text-xl">
//           You are not authorized to edit this item.
//         </div>
//       );
//   }

//   return (
//     <div className="min-h-[calc(100vh-64px)] bg-gray-100 flex items-center justify-center p-4">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
//         <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">Edit {type} Item</h1>

//         {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">{success}</div>}
//         {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">{error}</div>}

//         <form onSubmit={submitHandler}>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               Item Type (Cannot be changed)
//             </label>
//             <input
//               type="text"
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
//               value={type}
//               readOnly
//               disabled
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
//               Title
//             </label>
//             <input
//               type="text"
//               id="title"
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               placeholder="Item Title"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
//               Description
//             </label>
//             <textarea
//               id="description"
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               placeholder="Detailed description of the item"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               rows="4"
//               required
//             ></textarea>
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
//               Category
//             </label>
//             <select
//               id="category"
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               required
//             >
//               <option value="">Select Category</option>
//               {categoryOptions.map((opt) => (
//                 <option key={opt} value={opt}>{opt}</option>
//               ))}
//             </select>
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="campus">
//               Campus
//             </label>
//             <select
//               id="campus"
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               value={campus}
//               onChange={(e) => {
//                 setCampus(e.target.value);
//                 setSpecificSpot('');
//               }}
//               required
//             >
//               <option value="">Select Campus</option>
//               {campusOptions.map((opt) => (
//                 <option key={opt} value={opt}>{opt}</option>
//               ))}
//             </select>
//           </div>

//           {campus && (
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="specificSpot">
//                 Specific Spot
//               </label>
//               {campus === 'Other' ? (
//                 <input
//                   type="text"
//                   id="specificSpot"
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                   placeholder="e.g., Near Main Gate, Canteen area"
//                   value={specificSpot}
//                   onChange={(e) => setSpecificSpot(e.target.value)}
//                   required
//                 />
//               ) : (
//                 <select
//                   id="specificSpot"
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                   value={specificSpot}
//                   onChange={(e) => setSpecificSpot(e.target.value)}
//                   required
//                 >
//                   <option value="">Select Specific Spot</option>
//                   {getSpecificSpotOptions().map((opt) => (
//                     <option key={opt} value={opt}>{opt}</option>
//                   ))}
//                 </select>
//               )}
//             </div>
//           )}

//           {type === 'FOUND' && ( // Only show proof question for FOUND items
//             <div className="mb-6 border-t pt-6 mt-6 border-gray-200">
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="proofQuestion">
//                 Proof Question (for Found Item)
//               </label>
//               <textarea
//                 id="proofQuestion"
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 placeholder="e.g., What is the wallpaper on the lock screen? What keychain is attached?"
//                 value={proofQuestion}
//                 onChange={(e) => setProofQuestion(e.target.value)}
//                 rows="3"
//               ></textarea>
//               <p className="text-sm text-gray-500 mt-2">
//                 This question will be asked to anyone trying to claim your found item. Make it a detail only the true owner would know.
//               </p>
//             </div>
//           )}

//           <div className="flex items-center justify-between">
//             <button
//               type="submit"
//               className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out w-full"
//               disabled={submitting}
//             >
//               {submitting ? 'Updating Item...' : 'Update Item'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditItemPage;
// client/src/pages/EditItemPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { 
  PencilSquareIcon, 
  MapPinIcon, 
  TagIcon, 
  DocumentTextIcon, 
  ShieldCheckIcon, 
  ArrowLeftIcon,
  LockClosedIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
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

const categoryOptions = ['Electronics', 'Stationary', 'Clothing', 'ID/Docs', 'Keys', 'Other'];
const campusOptions = ['DTU', 'NSUT', 'IIIT', 'Other'];
const dtuSpots = ['MicMac Canteen', 'SPS Hall', 'Library', 'Mech Block', 'OAT', 'Main Gate'];
const nsutSpots = ['Student Center', 'Amul', 'Moksha Ground', 'Library Block A'];
const iiitSpots = ['Academic Block', 'Library', 'Hostel Mess'];

const EditItemPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, API_BASE_URL } = useAuth();

  // Form states
  const [type, setType] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [campus, setCampus] = useState('');
  const [specificSpot, setSpecificSpot] = useState('');
  const [proofQuestion, setProofQuestion] = useState('');

  // UI states
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [itemFinderId, setItemFinderId] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      if (!user) {
        setError('Please log in to edit items.');
        setLoading(false);
        return;
      }
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const { data } = await axios.get(`${API_BASE_URL}/items/${id}`, config);

        if (data.finder_id?._id !== user._id) {
            setError('UNAUTHORIZED ACCESS DETECTED.');
            setLoading(false);
            return;
        }

        setType(data.type);
        setTitle(data.title);
        setDescription(data.description);
        setCategory(data.category);
        setCampus(data.location.campus);
        setSpecificSpot(data.location.specific_spot);
        setProofQuestion(data.proof_question || '');
        setItemFinderId(data.finder_id?._id);

        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch item data.');
        setLoading(false);
      }
    };

    fetchItem();
  }, [id, user, API_BASE_URL]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');

    if (!title || !description || !category || !campus || !specificSpot) {
      setError('Validation Failed: All fields required.');
      setSubmitting(false);
      return;
    }

    try {
      const config = {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` },
      };

      const itemData = {
        title,
        description,
        category,
        campus,
        specific_spot: specificSpot,
        proof_question: type === 'FOUND' ? proofQuestion : undefined,
      };

      const { data } = await axios.put(`${API_BASE_URL}/items/${id}`, itemData, config);

      setSuccess('Database record updated successfully.');
      setTimeout(() => navigate(`/items/${data._id}`), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Update Failed.');
    } finally {
      setSubmitting(false);
    }
  };

  const getSpecificSpotOptions = () => {
    switch (campus) {
      case 'DTU': return dtuSpots;
      case 'NSUT': return nsutSpots;
      case 'IIIT': return iiitSpots;
      default: return ['Other'];
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a12]">
         <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
         <p className="text-purple-400 font-mono animate-pulse">Decrypting Record...</p>
      </div>
    );
  }

  if (error && itemFinderId !== user?._id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a12] text-red-500 font-mono border border-red-500/20 bg-red-500/5 p-10">
        <div className="text-center">
          <LockClosedIcon className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">ACCESS DENIED</h2>
          <p>{error}</p>
          <Link to="/items" className="mt-6 inline-block text-gray-400 hover:text-white border-b border-gray-600">Return to Safety</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full bg-[#0a0a12] text-white overflow-hidden font-sans selection:bg-purple-500/30 pb-20 pt-[40px]">
      <style>{customStyles}</style>

      {/* --- Background FX --- */}
      <div className="fixed inset-0 w-full h-full pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-900 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-900 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-12">
        
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link to={`/items/${id}`} className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors font-mono text-xs mb-2">
              <ArrowLeftIcon className="w-3 h-3" /> CANCEL_EDIT
            </Link>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
              Modify Record
            </h1>
          </div>
          <div className="hidden md:block px-4 py-2 bg-white/5 rounded-full border border-white/10 text-xs font-mono text-gray-400">
            ID: {id.slice(-6).toUpperCase()}
          </div>
        </div>

        {/* Main Form Card */}
        <div className="bg-[#13131f]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">
          
          {/* Alerts */}
          {success && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl flex items-center gap-3 text-green-400 animate-fadeIn">
              <CheckCircleIcon className="w-5 h-5" />
              <span>{success}</span>
            </div>
          )}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3 text-red-400 animate-shake">
              <ExclamationTriangleIcon className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={submitHandler} className="space-y-8">
            
            {/* Locked Field: Type */}
            <div className="bg-black/30 border border-white/5 rounded-xl p-4 flex items-center justify-between">
               <div className="flex items-center gap-3">
                 <div className={`w-2 h-2 rounded-full ${type === 'LOST' ? 'bg-red-500' : 'bg-emerald-500'}`}></div>
                 <span className="text-sm font-mono text-gray-400 uppercase">Record Type</span>
               </div>
               <div className="flex items-center gap-2 text-gray-500 text-sm font-bold">
                 <LockClosedIcon className="w-4 h-4" />
                 {type}
               </div>
            </div>

            {/* Section: Basic Info */}
            <div className="space-y-6">
              <h3 className="text-purple-300 text-xs font-bold uppercase tracking-widest flex items-center gap-2 border-b border-white/5 pb-2">
                <DocumentTextIcon className="w-4 h-4" /> Basic Information
              </h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs text-gray-500 uppercase font-semibold ml-1">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-[#0f0f16] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                    placeholder="Item Title"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs text-gray-500 uppercase font-semibold ml-1">Category</label>
                    <div className="relative">
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full bg-[#0f0f16] border border-white/10 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:border-purple-500 transition-all"
                      >
                        <option value="">Select...</option>
                        {categoryOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                      <TagIcon className="absolute right-4 top-3.5 w-5 h-5 text-gray-500 pointer-events-none"/>
                    </div>
                  </div>
                  {/* Placeholder for spacing or another small field */}
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-gray-500 uppercase font-semibold ml-1">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="4"
                    className="w-full bg-[#0f0f16] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none"
                    placeholder="Detailed description..."
                  />
                </div>
              </div>
            </div>

            {/* Section: Location */}
            <div className="space-y-6">
              <h3 className="text-indigo-300 text-xs font-bold uppercase tracking-widest flex items-center gap-2 border-b border-white/5 pb-2">
                <MapPinIcon className="w-4 h-4" /> Location Data
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs text-gray-500 uppercase font-semibold ml-1">Campus</label>
                  <select
                    value={campus}
                    onChange={(e) => { setCampus(e.target.value); setSpecificSpot(''); }}
                    className="w-full bg-[#0f0f16] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-all"
                  >
                    <option value="">Select Campus...</option>
                    {campusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>

                {campus && (
                  <div className="space-y-2 animate-fadeIn">
                    <label className="text-xs text-gray-500 uppercase font-semibold ml-1">Specific Spot</label>
                    {campus === 'Other' ? (
                      <input
                        type="text"
                        value={specificSpot}
                        onChange={(e) => setSpecificSpot(e.target.value)}
                        className="w-full bg-[#0f0f16] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-all"
                      />
                    ) : (
                      <select
                        value={specificSpot}
                        onChange={(e) => setSpecificSpot(e.target.value)}
                        className="w-full bg-[#0f0f16] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-all"
                      >
                        <option value="">Select Area...</option>
                        {getSpecificSpotOptions().map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Section: Security (Only for FOUND items) */}
            {type === 'FOUND' && (
              <div className="space-y-6">
                <h3 className="text-amber-300 text-xs font-bold uppercase tracking-widest flex items-center gap-2 border-b border-white/5 pb-2">
                  <ShieldCheckIcon className="w-4 h-4" /> Security Protocol
                </h3>
                <div className="bg-amber-500/5 border border-amber-500/10 rounded-xl p-4">
                  <label className="block text-xs text-amber-500 uppercase font-bold mb-2">Proof Question</label>
                  <textarea
                    value={proofQuestion}
                    onChange={(e) => setProofQuestion(e.target.value)}
                    rows="3"
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-all"
                    placeholder="e.g., What image is on the lock screen?"
                  />
                  <p className="text-[10px] text-gray-500 mt-2 flex items-center gap-1">
                    <LockClosedIcon className="w-3 h-3" /> Only visible to you until someone attempts to claim.
                  </p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-4 border-t border-white/10">
              <button
                type="submit"
                disabled={submitting}
                className={`w-full py-4 rounded-xl font-bold text-lg uppercase tracking-widest shadow-lg transition-all transform
                  ${submitting 
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-purple-500/20 hover:shadow-purple-500/40 hover:scale-[1.01]'}
                `}
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/50 border-t-transparent rounded-full animate-spin"></div>
                    Updating Database...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <PencilSquareIcon className="w-5 h-5" /> Save Changes
                  </span>
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default EditItemPage;
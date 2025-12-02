
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
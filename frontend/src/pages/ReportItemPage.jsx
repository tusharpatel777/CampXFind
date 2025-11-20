import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { 
  CloudArrowUpIcon, 
  CpuChipIcon, 
  SparklesIcon, 
  MapPinIcon, 
  TagIcon, 
  DocumentTextIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  PhotoIcon
} from '@heroicons/react/24/outline';

// --- Custom CSS for Animations & File Input ---
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
  /* Hide default file input but keep it clickable */
  .file-input-wrapper input[type=file] {
    font-size: 0;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
  /* Scanline effect for AI HUD */
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
    100% { top: 100%; opacity: 0; }
  }
`;

const categoryOptions = ['Electronics', 'Stationary', 'Clothing', 'ID/Docs', 'Keys', 'Other'];
const campusOptions = ['DTU', 'NSUT', 'IIIT', 'Other'];
const dtuSpots = ['MicMac Canteen', 'SPS Hall', 'Library', 'Mech Block', 'OAT', 'Main Gate'];
const nsutSpots = ['Student Center', 'Amul', 'Moksha Ground', 'Library Block A'];
const iiitSpots = ['Academic Block', 'Library', 'Hostel Mess'];

const ReportItemPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, API_BASE_URL } = useAuth();

  // Form states
  const [type, setType] = useState('FOUND');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [campus, setCampus] = useState('');
  const [specificSpot, setSpecificSpot] = useState('');

  // Image & AI states
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedImagesInfo, setUploadedImagesInfo] = useState([]);
  const [aiSuggestions, setAiSuggestions] = useState(null);
  const [aiProcessing, setAiProcessing] = useState(false);

  // UI feedback
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const itemType = queryParams.get('type');
    if (itemType && (itemType === 'LOST' || itemType === 'FOUND')) {
      setType(itemType);
    }
  }, [location.search]);

  // Apply AI suggestions
  useEffect(() => {
    if (aiSuggestions) {
      setTitle(aiSuggestions.title || '');
      setDescription(aiSuggestions.description || '');
      setCategory(aiSuggestions.category && categoryOptions.includes(aiSuggestions.category) ? aiSuggestions.category : 'Other');
      setError(aiSuggestions.has_PII ? '⚠️ Sensitive data detected (PII). Images have been auto-blurred.' : '');
    }
  }, [aiSuggestions]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      setError('Maximum 5 images allowed.');
      setSelectedFiles([]);
      return;
    }
    setSelectedFiles(files);
    setError('');
    setSuccess('');
    setAiSuggestions(null);
    setUploadedImagesInfo([]);
  };

  const handleAnalyzeImages = async () => {
    setError('');
    setSuccess('');
    if (selectedFiles.length === 0) {
      setError('Upload images to initiate scan.');
      return;
    }
    setAiProcessing(true);
    try {
      const formData = new FormData();
      selectedFiles.forEach(file => formData.append('images', file));

      const config = {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${user.token}` },
      };

      const { data } = await axios.post(`${API_BASE_URL}/items/analyze-image`, formData, config);
      setAiSuggestions(data.aiSuggestions);
      setUploadedImagesInfo(data.uploadedImages);
      setSuccess(data.message || 'Analysis Complete.');
    } catch (err) {
      setError(err.response?.data?.message || 'Analysis Failed.');
    } finally {
      setAiProcessing(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (uploadedImagesInfo.length === 0) {
      setError('Please upload and analyze images first.');
      setLoading(false);
      return;
    }
    if (!aiSuggestions) {
      setError('System error: AI Metadata missing.');
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` },
      };

      const itemData = {
        type, title, description, category, campus, specific_spot: specificSpot,
        images: uploadedImagesInfo,
        ai_metadata: {
            brand: aiSuggestions.brand,
            color: aiSuggestions.color,
            condition: aiSuggestions.condition,
            tags: aiSuggestions.tags,
            has_PII: aiSuggestions.has_PII,
        }
      };

      const { data } = await axios.post(`${API_BASE_URL}/items`, itemData, config);
      setSuccess('Item logged in database successfully!');
      setTimeout(() => navigate(`/items/${data._id}`), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Submission Failed.');
    } finally {
      setLoading(false);
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

  return (
    <div className="relative min-h-screen w-full bg-[#0a0a12] text-white overflow-hidden font-sans selection:bg-purple-500/30 pb-20 pt-74">
      <style>{customStyles}</style>

      {/* --- Background FX --- */}
      <div className="fixed inset-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob"></div>
        <div className="absolute top-[40%] right-[-10%] w-[35rem] h-[35rem] bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-block p-3 rounded-2xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-white/10 mb-4">
            <PhotoIcon className="w-8 h-8 text-purple-300" />
          </div>
          <h1 className="text-5xl font-black tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
            Submit Report
          </h1>
          <p className="text-gray-400 font-mono text-sm tracking-widest uppercase">
            Secure Item Logging Terminal
          </p>
        </div>

        {/* Main Glass Panel */}
        <div className="bg-[#13131f]/60 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
          
          {/* Type Toggle Switch */}
          <div className="flex border-b border-white/10">
            <button
              onClick={() => setType('LOST')}
              className={`flex-1 py-4 text-sm font-bold tracking-widest transition-all duration-300 ${type === 'LOST' ? 'bg-red-500/10 text-red-400 shadow-[inset_0_-2px_0_0_rgba(248,113,113,1)]' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'}`}
            >
              LOST ITEM
            </button>
            <button
              onClick={() => setType('FOUND')}
              className={`flex-1 py-4 text-sm font-bold tracking-widest transition-all duration-300 ${type === 'FOUND' ? 'bg-emerald-500/10 text-emerald-400 shadow-[inset_0_-2px_0_0_rgba(52,211,153,1)]' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'}`}
            >
              FOUND ITEM
            </button>
          </div>

          <form onSubmit={submitHandler} className="p-8 md:p-10 space-y-8">
            
            {/* Alerts */}
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3 text-red-300 animate-pulse">
                <ExclamationTriangleIcon className="w-6 h-6"/>
                <span>{error}</span>
              </div>
            )}
            {success && (
              <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl flex items-center gap-3 text-green-300">
                <CheckCircleIcon className="w-6 h-6"/>
                <span>{success}</span>
              </div>
            )}

            {/* Section 1: Image Analysis (The Scanner) */}
            <div className="space-y-4">
              <label className="flex items-center gap-2 text-sm font-bold text-cyan-300 uppercase tracking-wider">
                <CpuChipIcon className="w-5 h-5"/> 1. Visual Analysis
              </label>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Upload Zone */}
                <div className={`relative file-input-wrapper border-2 border-dashed rounded-2xl h-56 flex flex-col items-center justify-center transition-all duration-300 group ${selectedFiles.length > 0 ? 'border-cyan-500/50 bg-cyan-500/5' : 'border-white/10 hover:border-purple-500/50 hover:bg-white/5'}`}>
                  <input type="file" onChange={handleFileChange} multiple accept="image/*" required={uploadedImagesInfo.length === 0} />
                  <div className={`p-4 rounded-full mb-3 transition-colors ${selectedFiles.length > 0 ? 'bg-cyan-500/20' : 'bg-white/5 group-hover:bg-purple-500/20'}`}>
                    <CloudArrowUpIcon className={`w-8 h-8 ${selectedFiles.length > 0 ? 'text-cyan-400' : 'text-gray-400 group-hover:text-purple-400'}`} />
                  </div>
                  <p className="text-sm text-gray-300 font-medium text-center px-4">
                    {selectedFiles.length > 0 ? `${selectedFiles.length} images locked` : "Drop item images here"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Max 5 files • JPG/PNG</p>
                </div>

                {/* Thumbnails & Action */}
                <div className="flex flex-col justify-between h-56">
                   {/* Thumbnail Grid */}
                   <div className="flex-1 flex flex-wrap content-start gap-2 overflow-y-auto scrollbar-hide p-2 bg-black/20 rounded-xl border border-white/5 mb-3">
                      {uploadedImagesInfo.length > 0 ? (
                        uploadedImagesInfo.map((img, idx) => (
                          <div key={idx} className="relative w-16 h-16 rounded-lg overflow-hidden border border-white/20 group">
                             <img src={img.url} alt="preview" className="w-full h-full object-cover" />
                             {img.isBlurred && <div className="absolute inset-0 bg-red-500/80 flex items-center justify-center backdrop-blur-[1px]"><span className="text-[8px] font-bold text-white px-1">PII</span></div>}
                          </div>
                        ))
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-600 opacity-50">
                           <SparklesIcon className="w-8 h-8 mb-2" />
                           <p className="text-xs font-mono">AWAITING INPUT</p>
                        </div>
                      )}
                   </div>

                   {/* Analyze Button */}
                   <button
                    type="button"
                    onClick={handleAnalyzeImages}
                    disabled={aiProcessing || selectedFiles.length === 0}
                    className={`w-full py-3 rounded-xl font-bold text-sm uppercase tracking-wide transition-all flex items-center justify-center gap-2 shadow-lg
                      ${aiProcessing || selectedFiles.length === 0 
                        ? 'bg-gray-800/50 border border-white/5 text-gray-500 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-[1.02]'}
                    `}
                  >
                    {aiProcessing ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        Processing Neural Net...
                      </>
                    ) : (
                      <>
                        <SparklesIcon className="w-5 h-5" /> Run AI Analysis
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* AI HUD Readout */}
              {aiSuggestions && (
                <div className="mt-4 p-5 bg-black/40 rounded-xl border border-cyan-500/20 font-mono text-sm relative overflow-hidden">
                  <div className="scanline"></div>
                  <h4 className="text-cyan-400 font-bold mb-3 flex items-center gap-2"><CpuChipIcon className="w-4 h-4"/> SYSTEM_OUTPUT:</h4>
                  <div className="grid grid-cols-2 gap-y-2 text-gray-400">
                    <div className="col-span-2"><span className="text-gray-600 uppercase text-xs">Detected Item:</span> <br/><span className="text-white text-base">{aiSuggestions.title}</span></div>
                    <div className="bg-cyan-900/10 p-2 rounded border border-cyan-500/10"><span className="text-gray-500 text-xs block">Color</span> <span className="text-cyan-200">{aiSuggestions.color}</span></div>
                    <div className="bg-cyan-900/10 p-2 rounded border border-cyan-500/10"><span className="text-gray-500 text-xs block">Condition</span> <span className="text-cyan-200">{aiSuggestions.condition}</span></div>
                    <div className="col-span-2 pt-2 border-t border-white/5">
                        <span className="text-gray-600 text-xs mr-2">Tags:</span> 
                        {aiSuggestions.tags.map((tag, i) => <span key={i} className="text-xs text-gray-400 bg-white/5 px-1.5 py-0.5 rounded mr-1">#{tag}</span>)}
                    </div>
                    {aiSuggestions.has_PII && <div className="col-span-2 text-red-400 font-bold mt-1 border-t border-red-500/30 pt-2 flex items-center gap-2"><ExclamationTriangleIcon className="w-4 h-4"/> ALERT: SENSITIVE DATA OBFUSCATED</div>}
                  </div>
                </div>
              )}
            </div>

            {/* Section 2: Details Form */}
            <div className="space-y-6 pt-6 border-t border-white/10">
              <label className="flex items-center gap-2 text-sm font-bold text-purple-300 uppercase tracking-wider">
                <DocumentTextIcon className="w-5 h-5"/> 2. Item Details
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title */}
                <div className="space-y-2">
                  <label className="text-xs text-gray-500 uppercase font-semibold pl-1">Item Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-[#0a0a12]/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                    placeholder="Detected automatically..."
                    required
                  />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <label className="text-xs text-gray-500 uppercase font-semibold pl-1">Category</label>
                  <div className="relative">
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-[#0a0a12]/50 border border-white/10 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:border-purple-500 transition-all"
                      required
                    >
                      <option value="">Select Category...</option>
                      {categoryOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                    <TagIcon className="absolute right-4 top-3.5 w-5 h-5 text-gray-500 pointer-events-none"/>
                  </div>
                </div>

                {/* Description */}
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs text-gray-500 uppercase font-semibold pl-1">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="3"
                    className="w-full bg-[#0a0a12]/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none"
                    placeholder="Add extra details..."
                    required
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Section 3: Location */}
            <div className="space-y-6 pt-6 border-t border-white/10">
              <label className="flex items-center gap-2 text-sm font-bold text-pink-300 uppercase tracking-wider">
                <MapPinIcon className="w-5 h-5"/> 3. Location Data
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs text-gray-500 uppercase font-semibold pl-1">Campus</label>
                  <select
                    value={campus}
                    onChange={(e) => { setCampus(e.target.value); setSpecificSpot(''); }}
                    className="w-full bg-[#0a0a12]/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition-all"
                    required
                  >
                    <option value="">Select Campus...</option>
                    {campusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>

                {campus && (
                  <div className="space-y-2 animate-fadeIn">
                    <label className="text-xs text-gray-500 uppercase font-semibold pl-1">Specific Spot</label>
                    {campus === 'Other' ? (
                      <input
                        type="text"
                        value={specificSpot}
                        onChange={(e) => setSpecificSpot(e.target.value)}
                        className="w-full bg-[#0a0a12]/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition-all"
                        placeholder="Describe location..."
                        required
                      />
                    ) : (
                      <select
                        value={specificSpot}
                        onChange={(e) => setSpecificSpot(e.target.value)}
                        className="w-full bg-[#0a0a12]/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition-all"
                        required
                      >
                        <option value="">Select Area...</option>
                        {getSpecificSpotOptions().map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={loading || aiProcessing || uploadedImagesInfo.length === 0}
                className={`w-full py-4 rounded-xl font-black text-lg uppercase tracking-widest shadow-2xl transition-all transform
                  ${loading || uploadedImagesInfo.length === 0
                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-[1.01]'}
                `}
              >
                {loading ? 'Uploading to Database...' : 'Confirm Report'}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default ReportItemPage;
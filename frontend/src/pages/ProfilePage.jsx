
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  UserCircleIcon, 
  EnvelopeIcon, 
  TrophyIcon, 
  ArchiveBoxIcon, 
  HandRaisedIcon,
  ShieldCheckIcon,
  CalendarDaysIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 50 } }
};

// --- Background Blob Animation Styles ---
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
  .bg-grid-pattern {
    background-image: linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px);
    background-size: 24px 24px;
  }
`;

const ProfilePage = () => {
  const { user, API_BASE_URL } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) {
        setError('Please log in to view your profile.');
        setLoading(false);
        return;
      }
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const { data } = await axios.get(`${API_BASE_URL}/users/profile`, config);
        setProfile(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch user profile.');
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [user, API_BASE_URL]);

  // --- Helper: Calculate Rank based on Karma ---
  const getRank = (karma) => {
    if (karma < 10) return { title: "Scout", color: "text-gray-300", border: "border-gray-500" };
    if (karma < 50) return { title: "Sentinel", color: "text-cyan-300", border: "border-cyan-500" };
    if (karma < 100) return { title: "Guardian", color: "text-purple-300", border: "border-purple-500" };
    return { title: "Legend", color: "text-amber-300", border: "border-amber-500" };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a12]">
        <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-indigo-300 font-mono animate-pulse">Identity Verification...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a12] text-red-400 font-mono">
        <div className="border border-red-500/50 bg-red-900/20 px-8 py-6 rounded-xl backdrop-blur-xl">
          <span className="flex items-center gap-2"><ShieldCheckIcon className="w-6 h-6"/> Access Denied: {error}</span>
        </div>
      </div>
    );
  }

  const rank = getRank(profile.karma_points || 0);

  return (
    <div className="relative min-h-screen w-full bg-[#0a0a12] text-white overflow-hidden font-sans flex items-center justify-center p-4">
      <style>{customStyles}</style>

      {/* --- Dynamic Background --- */}
      <div className="fixed inset-0 w-full h-full pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-20 mask-image-gradient"></div>
      </div>

      {/* --- Main ID Card --- */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-4xl backdrop-blur-2xl bg-[#13131f]/70 border border-white/10 rounded-[2rem] shadow-2xl shadow-black/50 overflow-hidden flex flex-col md:flex-row"
      >
        
        {/* Left Panel: Identity (35% width) */}
        <div className="relative w-full md:w-[35%] bg-gradient-to-b from-white/5 to-transparent p-8 flex flex-col items-center text-center border-b md:border-b-0 md:border-r border-white/10">
          
          {/* Avatar */}
          <motion.div variants={itemVariants} className="relative mb-6 group">
            <div className={`absolute inset-0 rounded-full blur-md opacity-50 bg-gradient-to-tr from-indigo-500 to-purple-500 group-hover:opacity-80 transition duration-500`}></div>
            <div className="relative w-32 h-32 rounded-full bg-[#0f0f16] border-2 border-white/20 flex items-center justify-center overflow-hidden shadow-inner">
              <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 to-purple-400">
                {profile.name.charAt(0).toUpperCase()}
              </span>
            </div>
            {/* Rank Badge */}
            <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#0a0a12] border ${rank.border} ${rank.color} text-[10px] font-bold uppercase tracking-widest shadow-lg`}>
              {rank.title}
            </div>
          </motion.div>

          {/* Name & Title */}
          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-1">{profile.name}</h2>
            <p className="text-sm text-gray-400 font-mono flex items-center justify-center gap-1">
              <ShieldCheckIcon className="w-4 h-4 text-emerald-400"/> Verified Member
            </p>
          </motion.div>

          {/* Mini Stats */}
          <motion.div variants={itemVariants} className="w-full grid grid-cols-1 gap-3">
            <div className="bg-black/30 rounded-xl p-3 border border-white/5">
              <span className="text-xs text-gray-500 uppercase tracking-wider block mb-1">Member Since</span>
              <span className="text-sm text-gray-300 flex items-center justify-center gap-2">
                <CalendarDaysIcon className="w-4 h-4"/> 
                {new Date(profile.createdAt || Date.now()).toLocaleDateString()}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right Panel: Details & Actions (65% width) */}
        <div className="flex-1 p-8 md:p-10 flex flex-col">
          
          <motion.div variants={itemVariants} className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-semibold text-gray-200 flex items-center gap-2">
              <UserCircleIcon className="w-6 h-6 text-indigo-400"/> Account Details
            </h3>
            <div className="h-px flex-1 bg-white/10 ml-4"></div>
          </motion.div>

          {/* Info Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="space-y-1">
              <label className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Email Address</label>
              <div className="flex items-center gap-3 text-gray-300 bg-white/5 p-3 rounded-lg border border-white/5">
                <EnvelopeIcon className="w-5 h-5 text-indigo-400"/>
                <span className="truncate">{profile.email}</span>
              </div>
            </div>
            
            {/* Karma Score HUD */}
            <div className="space-y-1">
              <label className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Karma Score</label>
              <div className="relative overflow-hidden flex items-center justify-between gap-3 text-white bg-gradient-to-r from-indigo-900/40 to-purple-900/40 p-3 rounded-lg border border-indigo-500/30 group">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <div className="flex items-center gap-2 relative z-10">
                  <TrophyIcon className="w-5 h-5 text-yellow-400"/>
                  <span className="font-bold text-lg">{profile.karma_points}</span>
                </div>
                <SparklesIcon className="w-5 h-5 text-purple-300 opacity-50 relative z-10"/>
              </div>
            </div>
          </motion.div>

          <div className="mt-auto">
            <motion.div variants={itemVariants} className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Quick Actions</h3>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link to="/my-items">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full group relative overflow-hidden rounded-xl bg-[#1a1a2e] border border-white/10 p-4 text-left hover:border-indigo-500/50 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <ArchiveBoxIcon className="w-8 h-8 text-indigo-400 mb-3 group-hover:text-indigo-300"/>
                  <span className="block text-white font-bold text-lg">My Reports</span>
                  <span className="text-xs text-gray-500">Manage lost & found items</span>
                </motion.button>
              </Link>

              <Link to="/my-claims">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full group relative overflow-hidden rounded-xl bg-[#1a1a2e] border border-white/10 p-4 text-left hover:border-purple-500/50 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <HandRaisedIcon className="w-8 h-8 text-purple-400 mb-3 group-hover:text-purple-300"/>
                  <span className="block text-white font-bold text-lg">My Claims</span>
                  <span className="text-xs text-gray-500">Track ownership requests</span>
                </motion.button>
              </Link>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
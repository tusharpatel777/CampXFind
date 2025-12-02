import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, SparklesIcon, MagnifyingGlassIcon, ShieldCheckIcon, MapPinIcon } from '@heroicons/react/24/outline';

// --- Animation & Background Styles ---
const customStyles = `
  @keyframes float {
    0% { transform: translate(0px, 0px) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
    100% { transform: translate(0px, 0px) scale(1); }
  }
  @keyframes float-reverse {
    0% { transform: translate(0px, 0px) rotate(0deg); }
    50% { transform: translate(-20px, 20px) rotate(10deg); }
    100% { transform: translate(0px, 0px) rotate(0deg); }
  }
  .animate-blob {
    animation: float 7s infinite;
  }
  .animate-float-slow {
    animation: float-reverse 6s ease-in-out infinite;
  }
  .animation-delay-2000 {
    animation-delay: 2s;
  }
  .animation-delay-4000 {
    animation-delay: 4s;
  }
  .text-glow {
    text-shadow: 0 0 40px rgba(168, 85, 247, 0.4);
  }
`;

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="relative min-h-screen w-full bg-[#0a0a12] text-white overflow-hidden font-sans selection:bg-purple-500/30  pt-[40px]">
      <style>{customStyles}</style>

      {/* --- 1. Dynamic Background FX --- */}
      <div className="fixed inset-0 w-full h-full pointer-events-none">
        {/* Gradient Blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-4000"></div>
        
        {/* Noise Texture overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      </div>

      {/* --- 2. Decorative Floating Icons (Visual Flair) --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-[10%] text-gray-700/20 animate-float-slow">
          <MagnifyingGlassIcon className="w-24 h-24 rotate-12" />
        </div>
        <div className="absolute bottom-1/4 right-[10%] text-gray-700/20 animate-float-slow animation-delay-2000">
          <MapPinIcon className="w-32 h-32 -rotate-12" />
        </div>
        <div className="absolute top-1/3 right-[20%] text-gray-700/20 animate-float-slow animation-delay-4000">
          <ShieldCheckIcon className="w-16 h-16 rotate-45" />
        </div>
      </div>

      {/* --- 3. Main Content --- */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-140px)] px-4 text-center">
        
        {/* Beta Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 animate-fadeIn">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-xs font-mono text-gray-300 tracking-widest uppercase">System Operational • v2.5 AI Live</span>
        </div>

        {/* Hero Heading */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 leading-[1.1]">
          <span className="block text-white text-glow">Recover.</span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient">
            Reconnect.
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          The next-generation Lost & Found network. Powered by <span className="text-purple-400 font-semibold">AI</span> to match items with owners instantly across campus.
        </p>

        {/* Auth State / Call to Action */} 
        {user ? (
          <div className="space-y-6 animate-slideUp">
            <div className="p-1 rounded-2xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500">
              <div className="px-8 py-6 bg-[#0f0f16] rounded-xl flex flex-col md:flex-row items-center gap-4">
                 <div className="text-left">
                    <p className="text-sm text-gray-400 font-mono uppercase">Logged in as</p>
                    <p className="text-2xl font-bold text-white">{user.name?.split(' ')[0] || 'User'}</p>
                 </div>
                 <div className="h-8 w-px bg-white/10 hidden md:block"></div>
                 <Link 
                    to="/dashboard"
                    className="group relative px-8 py-3 bg-white text-black font-bold rounded-lg overflow-hidden transition-transform active:scale-95 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-cyan-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative flex items-center gap-2">
                      Go to Dashboard <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
                    </span>
                 </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-5 animate-slideUp">
            <Link
              to="/login"
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-bold text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all hover:-translate-y-1 active:scale-95 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-500 skew-x-12 -translate-x-10"></div>
              <span className="relative flex items-center gap-2">
                Launch App <SparklesIcon className="w-5 h-5" />
              </span>
            </Link>
            
            <Link
              to="/register"
              className="px-8 py-4 rounded-2xl font-bold text-white border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all hover:-translate-y-1 active:scale-95 flex items-center gap-2"
            >
              Create Account
            </Link>
          </div>
        )}

        {/* Footer Stats / Decor */}
        <div className="absolute bottom-10 w-full flex justify-center gap-8 text-xs font-mono text-gray-600 uppercase tracking-widest opacity-50">
          <span>Secure</span>
          <span>•</span>
          <span>Fast</span>
          <span>•</span>
          <span>Intelligent</span>
        </div>

      </div>
    </div>
  );
};

export default HomePage;
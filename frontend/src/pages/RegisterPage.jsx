
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { 
  UserIcon, 
  EnvelopeIcon, 
  KeyIcon, 
  SparklesIcon, 
  ShieldCheckIcon 
} from '@heroicons/react/24/outline';

// --- Animation Styles (Consistent with Login) ---
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

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { user, register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/'); 
    }
  }, [user, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!name || !email || !password || !confirmPassword) {
      toast.error('Please fill in all fields.');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      setLoading(false);
      return;
    }

    const result = await register(name, email, password);

    if (!result.success) {
      toast.error(result.error || 'Registration failed. Please try again.');
    } else {
      toast.success("Identity created successfully!")
      navigate('/'); 
    }
    setLoading(false);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0a0a12] text-white overflow-hidden font-sans flex items-center justify-center p-4">
      <style>{customStyles}</style>

      {/* --- Background FX --- */}
      <div className="fixed inset-0 w-full h-full pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-blob"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      </div>

      {/* --- Main Glass Card --- */}
      <div className="relative z-10 w-full max-w-md bg-[#13131f]/60 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl p-8 md:p-10 overflow-hidden">
        
        {/* Top Decorative Gradient */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black tracking-tight mb-2">
            Create Identity
          </h1>
          <p className="text-gray-400 text-sm">
            Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-bold">CampXFind Network</span>
          </p>
        </div>

        <form onSubmit={submitHandler} className="space-y-5">
          
          {/* Name Input */}
          <div className="space-y-2 group">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider group-focus-within:text-cyan-400 transition-colors">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <UserIcon className="h-5 w-5 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-11 pr-4 py-3 bg-[#0a0a12]/50 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-300 sm:text-sm"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="space-y-2 group">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider group-focus-within:text-purple-400 transition-colors">
              College Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <EnvelopeIcon className="h-5 w-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
              </div>
              <input
                type="email"
                className="block w-full pl-11 pr-4 py-3 bg-[#0a0a12]/50 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300 sm:text-sm"
                placeholder="student@university.ac.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2 group">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider group-focus-within:text-pink-400 transition-colors">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <KeyIcon className="h-5 w-5 text-gray-500 group-focus-within:text-pink-400 transition-colors" />
              </div>
              <input
                type="password"
                className="block w-full pl-11 pr-4 py-3 bg-[#0a0a12]/50 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all duration-300 sm:text-sm"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className="space-y-2 group">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider group-focus-within:text-pink-400 transition-colors">
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <ShieldCheckIcon className="h-5 w-5 text-gray-500 group-focus-within:text-pink-400 transition-colors" />
              </div>
              <input
                type="password"
                className="block w-full pl-11 pr-4 py-3 bg-[#0a0a12]/50 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all duration-300 sm:text-sm"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`
              w-full mt-6 flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white uppercase tracking-wider transition-all duration-300
              ${loading 
                ? 'bg-gray-700 cursor-not-allowed' 
                : 'bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 hover:shadow-cyan-500/25 hover:scale-[1.02]'
              }
            `}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Registering...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Init Access <SparklesIcon className="w-4 h-4" />
              </span>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-cyan-400 hover:text-cyan-300 transition-colors underline decoration-transparent hover:decoration-cyan-300 underline-offset-4">
              Login Here
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default RegisterPage;
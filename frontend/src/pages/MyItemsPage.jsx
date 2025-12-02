
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

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
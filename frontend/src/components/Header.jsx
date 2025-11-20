// // // // // // // // // // client/src/components/Header.jsx
// // // // // // // // // import React from 'react';
// // // // // // // // // import { Link, useNavigate } from 'react-router-dom';
// // // // // // // // // import { useAuth } from '../context/AuthContext';
// // // // // // // // // // Optional: Add an icon for notifications later, e.g., @heroicons/react

// // // // // // // // // const Header = () => {
// // // // // // // // //   const { user, logout, loading } = useAuth();
// // // // // // // // //   const navigate = useNavigate();

// // // // // // // // //   const handleLogout = () => {
// // // // // // // // //     logout();
// // // // // // // // //     navigate('/login');
// // // // // // // // //   };

// // // // // // // // //   if (loading) {
// // // // // // // // //     return null;
// // // // // // // // //   }

// // // // // // // // //   return (
// // // // // // // // //     <header className="bg-indigo-700 text-white p-4 shadow-md">
// // // // // // // // //       <div className="container mx-auto flex justify-between items-center">
// // // // // // // // //         <Link to="/" className="text-2xl font-bold">FindIt</Link>
// // // // // // // // //         <nav>
// // // // // // // // //           <ul className="flex space-x-4 items-center">
// // // // // // // // //             <li>
// // // // // // // // //               <Link to="/items" className="hover:text-indigo-200">Browse Items</Link>
// // // // // // // // //             </li>
// // // // // // // // //             {user ? (
// // // // // // // // //               <>
// // // // // // // // //                 <li>
// // // // // // // // //                   <Link to="/dashboard" className="hover:text-indigo-200">Dashboard</Link>
// // // // // // // // //                 </li>
// // // // // // // // //                 <li>
// // // // // // // // //                   <Link to="/notifications" className="hover:text-indigo-200 relative">
// // // // // // // // //                     Notifications
// // // // // // // // //                     {/* You can add a badge here later for unread count */}
// // // // // // // // //                   </Link>
// // // // // // // // //                 </li>
// // // // // // // // //                 <li>
// // // // // // // // //                   <Link to="/profile" className="hover:text-indigo-200">
// // // // // // // // //                     Hello, {user.name?.split(' ')[0] || 'User'}
// // // // // // // // //                   </Link>
// // // // // // // // //                 </li>
// // // // // // // // //                 <li>
// // // // // // // // //                   <button
// // // // // // // // //                     onClick={handleLogout}
// // // // // // // // //                     className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-1 px-3 rounded-lg transition duration-300 ease-in-out"
// // // // // // // // //                   >
// // // // // // // // //                     Logout
// // // // // // // // //                   </button>
// // // // // // // // //                 </li>
// // // // // // // // //               </>
// // // // // // // // //             ) : (
// // // // // // // // //               <>
// // // // // // // // //                 <li>
// // // // // // // // //                   <Link to="/login" className="hover:text-indigo-200">Login</Link>
// // // // // // // // //                 </li>
// // // // // // // // //                 <li>
// // // // // // // // //                   <Link to="/register" className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-1 px-3 rounded-lg transition duration-300 ease-in-out">
// // // // // // // // //                     Register
// // // // // // // // //                   </Link>
// // // // // // // // //                 </li>
// // // // // // // // //               </>
// // // // // // // // //             )}
// // // // // // // // //           </ul>
// // // // // // // // //         </nav>
// // // // // // // // //       </div>
// // // // // // // // //     </header>
// // // // // // // // //   );
// // // // // // // // // };

// // // // // // // // // export default Header;
// // // // // // // // // client/src/components/Header.jsx
// // // // // // // // import React from 'react';
// // // // // // // // import { Link, useNavigate } from 'react-router-dom';
// // // // // // // // import { useAuth } from '../context/AuthContext';

// // // // // // // // const Header = () => {
// // // // // // // //   const { user, logout, loading } = useAuth();
// // // // // // // //   const navigate = useNavigate();

// // // // // // // //   const handleLogout = () => {
// // // // // // // //     logout();
// // // // // // // //     navigate('/login');
// // // // // // // //   };

// // // // // // // //   if (loading) {
// // // // // // // //     return null;
// // // // // // // //   }

// // // // // // // //   return (
// // // // // // // //     <header className="bg-indigo-700 text-white p-4 shadow-md">
// // // // // // // //       <div className="container mx-auto flex justify-between items-center">
// // // // // // // //         <Link to="/" className="text-2xl font-bold">FindIt</Link>
// // // // // // // //         <nav>
// // // // // // // //           <ul className="flex space-x-4 items-center">
// // // // // // // //             <li>
// // // // // // // //               <Link to="/items" className="hover:text-indigo-200">Browse Items</Link>
// // // // // // // //             </li>
// // // // // // // //             {user ? (
// // // // // // // //               <>
// // // // // // // //                 <li>
// // // // // // // //                   <Link to="/dashboard" className="hover:text-indigo-200">Dashboard</Link>
// // // // // // // //                 </li>
// // // // // // // //                 <li>
// // // // // // // //                   <Link to="/notifications" className="hover:text-indigo-200 relative">
// // // // // // // //                     Notifications
// // // // // // // //                   </Link>
// // // // // // // //                 </li>
// // // // // // // //                 <li>
// // // // // // // //                   <Link to="/my-claims" className="hover:text-indigo-200"> {/* New link */}
// // // // // // // //                     My Claims
// // // // // // // //                   </Link>
// // // // // // // //                 </li>
// // // // // // // //                 <li>
// // // // // // // //                   <Link to="/profile" className="hover:text-indigo-200">
// // // // // // // //                     Hello, {user.name?.split(' ')[0] || 'User'}
// // // // // // // //                   </Link>
// // // // // // // //                 </li>
// // // // // // // //                 <li>
// // // // // // // //                   <button
// // // // // // // //                     onClick={handleLogout}
// // // // // // // //                     className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-1 px-3 rounded-lg transition duration-300 ease-in-out"
// // // // // // // //                   >
// // // // // // // //                     Logout
// // // // // // // //                   </button>
// // // // // // // //                 </li>
// // // // // // // //               </>
// // // // // // // //             ) : (
// // // // // // // //               <>
// // // // // // // //                 <li>
// // // // // // // //                   <Link to="/login" className="hover:text-indigo-200">Login</Link>
// // // // // // // //                 </li>
// // // // // // // //                 <li>
// // // // // // // //                   <Link to="/register" className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-1 px-3 rounded-lg transition duration-300 ease-in-out">
// // // // // // // //                     Register
// // // // // // // //                   </Link>
// // // // // // // //                 </li>
// // // // // // // //               </>
// // // // // // // //             )}
// // // // // // // //           </ul>
// // // // // // // //         </nav>
// // // // // // // //       </div>
// // // // // // // //     </header>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // export default Header;
// // // // // // // // client/src/components/Header.jsx
// // // // // // // import React from 'react';
// // // // // // // import { Link, useNavigate } from 'react-router-dom';
// // // // // // // import { useAuth } from '../context/AuthContext';

// // // // // // // const Header = () => {
// // // // // // //   const { user, logout, loading } = useAuth();
// // // // // // //   const navigate = useNavigate();

// // // // // // //   const handleLogout = () => {
// // // // // // //     logout();
// // // // // // //     navigate('/login');
// // // // // // //   };

// // // // // // //   if (loading) {
// // // // // // //     return null;
// // // // // // //   }

// // // // // // //   return (
// // // // // // //     <header className="bg-indigo-700 text-white p-4 shadow-md">
// // // // // // //       <div className="container mx-auto flex justify-between items-center">
// // // // // // //         <Link to="/" className="text-2xl font-bold">FindIt</Link>
// // // // // // //         <nav>
// // // // // // //           <ul className="flex space-x-4 items-center">
// // // // // // //             <li>
// // // // // // //               <Link to="/items" className="hover:text-indigo-200">Browse Items</Link>
// // // // // // //             </li>
// // // // // // //             {user ? (
// // // // // // //               <>
// // // // // // //                 <li>
// // // // // // //                   <Link to="/dashboard" className="hover:text-indigo-200">Dashboard</Link>
// // // // // // //                 </li>
// // // // // // //                 <li>
// // // // // // //                   <Link to="/notifications" className="hover:text-indigo-200 relative">
// // // // // // //                     Notifications
// // // // // // //                   </Link>
// // // // // // //                 </li>
// // // // // // //                 <li>
// // // // // // //                   <Link to="/my-claims" className="hover:text-indigo-200">
// // // // // // //                     My Claims
// // // // // // //                   </Link>
// // // // // // //                 </li>
// // // // // // //                 <li>
// // // // // // //                   <Link to="/claims-on-my-items" className="hover:text-indigo-200"> {/* New link */}
// // // // // // //                     Claims on My Items
// // // // // // //                   </Link>
// // // // // // //                 </li>
// // // // // // //                 <li>
// // // // // // //                   <Link to="/profile" className="hover:text-indigo-200">
// // // // // // //                     Hello, {user.name?.split(' ')[0] || 'User'}
// // // // // // //                   </Link>
// // // // // // //                 </li>
// // // // // // //                 <li>
// // // // // // //                   <button
// // // // // // //                     onClick={handleLogout}
// // // // // // //                     className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-1 px-3 rounded-lg transition duration-300 ease-in-out"
// // // // // // //                   >
// // // // // // //                     Logout
// // // // // // //                   </button>
// // // // // // //                 </li>
// // // // // // //               </>
// // // // // // //             ) : (
// // // // // // //               <>
// // // // // // //                 <li>
// // // // // // //                   <Link to="/login" className="hover:text-indigo-200">Login</Link>
// // // // // // //                 </li>
// // // // // // //                 <li>
// // // // // // //                   <Link to="/register" className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-1 px-3 rounded-lg transition duration-300 ease-in-out">
// // // // // // //                     Register
// // // // // // //                   </Link>
// // // // // // //                 </li>
// // // // // // //               </>
// // // // // // //             )}
// // // // // // //           </ul>
// // // // // // //         </nav>
// // // // // // //       </div>
// // // // // // //     </header>
// // // // // // //   );
// // // // // // // };




// // // // // // // export default Header;

// // // // // // // client/src/components/Header.jsx
// // // // // // import React from 'react';
// // // // // // import { Link, useNavigate } from 'react-router-dom';
// // // // // // import { useAuth } from '../context/AuthContext';

// // // // // // const Header = () => {
// // // // // //   const { user, logout, loading } = useAuth();
// // // // // //   const navigate = useNavigate();

// // // // // //   const handleLogout = () => {
// // // // // //     logout();
// // // // // //     navigate('/login');
// // // // // //   };

// // // // // //   if (loading) {
// // // // // //     return null;
// // // // // //   }

// // // // // //   return (
// // // // // //     <header className="bg-indigo-700 text-white p-4 shadow-md">
// // // // // //       <div className="container mx-auto flex justify-between items-center">
// // // // // //         <Link to="/" className="text-2xl font-bold">FindIt</Link>
// // // // // //         <nav>
// // // // // //           <ul className="flex space-x-4 items-center">
// // // // // //             <li>
// // // // // //               <Link to="/items" className="hover:text-indigo-200">Browse Items</Link>
// // // // // //             </li>
// // // // // //             {user ? (
// // // // // //               <>
// // // // // //                 <li>
// // // // // //                   <Link to="/dashboard" className="hover:text-indigo-200">Dashboard</Link>
// // // // // //                 </li>
// // // // // //                 <li>
// // // // // //                   <Link to="/notifications" className="hover:text-indigo-200 relative">
// // // // // //                     Notifications
// // // // // //                   </Link>
// // // // // //                 </li>
// // // // // //                 <li>
// // // // // //                   <Link to="/my-claims" className="hover:text-indigo-200">
// // // // // //                     My Claims
// // // // // //                   </Link>
// // // // // //                 </li>
// // // // // //                 <li>
// // // // // //                   <Link to="/claims-on-my-items" className="hover:text-indigo-200">
// // // // // //                     Claims on My Items
// // // // // //                   </Link>
// // // // // //                 </li>
// // // // // //                 <li>
// // // // // //                   {/* Link "Hello, User" to the Profile Page */}
// // // // // //                   <Link to="/profile" className="hover:text-indigo-200">
// // // // // //                     Hello, {user.name?.split(' ')[0] || 'User'}
// // // // // //                   </Link>
// // // // // //                 </li>
// // // // // //                 <li>
// // // // // //                   <button
// // // // // //                     onClick={handleLogout}
// // // // // //                     className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-1 px-3 rounded-lg transition duration-300 ease-in-out"
// // // // // //                   >
// // // // // //                     Logout
// // // // // //                   </button>
// // // // // //                 </li>
// // // // // //               </>
// // // // // //             ) : (
// // // // // //               <>
// // // // // //                 <li>
// // // // // //                   <Link to="/login" className="hover:text-indigo-200">Login</Link>
// // // // // //                 </li>
// // // // // //                 <li>
// // // // // //                   <Link to="/register" className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-1 px-3 rounded-lg transition duration-300 ease-in-out">
// // // // // //                     Register
// // // // // //                   </Link>
// // // // // //                 </li>
// // // // // //               </>
// // // // // //             )}
// // // // // //           </ul>
// // // // // //         </nav>
// // // // // //       </div>
// // // // // //     </header>
// // // // // //   );
// // // // // // };

// // // // // // export default Header;
// // // // // import React from "react";
// // // // // import { Link, useNavigate } from "react-router-dom";
// // // // // import { motion } from "framer-motion";
// // // // // import { useAuth } from "../context/AuthContext";

// // // // // const Header = () => {
// // // // //   const { user, logout, loading } = useAuth();
// // // // //   const navigate = useNavigate();

// // // // //   const handleLogout = () => {
// // // // //     logout();
// // // // //     navigate("/login");
// // // // //   };

// // // // //   if (loading) return null;

// // // // //   return (
// // // // //     <motion.header
// // // // //       initial={{ y: -50, opacity: 0 }}
// // // // //       animate={{ y: 0, opacity: 1 }}
// // // // //       transition={{ duration: 0.6, ease: "easeOut" }}
// // // // //       className="
// // // // //         backdrop-blur-lg bg-white/10 
// // // // //         border-b border-white/20 
// // // // //         shadow-lg
// // // // //         sticky top-0 z-50
// // // // //       "
// // // // //     >
// // // // //       <div className="container mx-auto flex justify-between items-center p-4">
// // // // //         {/* Logo */}
// // // // //         <motion.div
// // // // //           whileHover={{ scale: 1.05 }}
// // // // //           className="text-3xl font-extrabold bg-gradient-to-r from-purple-500 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(168,85,247,0.6)] cursor-pointer"
// // // // //         >
// // // // //           <Link to="/">FindIt</Link>
// // // // //         </motion.div>

// // // // //         {/* Navigation */}
// // // // //         <nav>
// // // // //           <ul className="flex space-x-6 items-center text-white">

// // // // //             {/* Common: Browse Items */}
// // // // //             <NavItem to="/items" label="Browse Items" />

// // // // //             {user ? (
// // // // //               <>
// // // // //                 <NavItem to="/dashboard" label="Dashboard" />
// // // // //                 <NavItem to="/notifications" label="Notifications" />
// // // // //                 <NavItem to="/my-claims" label="My Claims" />
// // // // //                 <NavItem to="/claims-on-my-items" label="Claims on My Items" />

// // // // //                 {/* Hello User */}
// // // // //                 <motion.li
// // // // //                   whileHover={{ scale: 1.05 }}
// // // // //                   className="text-purple-200 font-semibold tracking-wide"
// // // // //                 >
// // // // //                   <Link
// // // // //                     to="/profile"
// // // // //                     className="hover:text-purple-300 transition-all"
// // // // //                   >
// // // // //                     Hello, {user.name?.split(" ")[0] || "User"}
// // // // //                   </Link>
// // // // //                 </motion.li>

// // // // //                 {/* Logout Button */}
// // // // //                 <motion.button
// // // // //                   whileHover={{ scale: 1.1 }}
// // // // //                   whileTap={{ scale: 0.9 }}
// // // // //                   onClick={handleLogout}
// // // // //                   className="
// // // // //                     bg-gradient-to-r from-purple-600 to-indigo-600 
// // // // //                     px-4 py-2 rounded-xl 
// // // // //                     text-white font-bold
// // // // //                     shadow-[0_0_10px_rgba(139,92,246,0.6)]
// // // // //                     hover:shadow-[0_0_20px_rgba(139,92,246,0.9)]
// // // // //                     transition-all
// // // // //                   "
// // // // //                 >
// // // // //                   Logout
// // // // //                 </motion.button>
// // // // //               </>
// // // // //             ) : (
// // // // //               <>
// // // // //                 <NavItem to="/login" label="Login" />

// // // // //                 <motion.li whileHover={{ scale: 1.08 }}>
// // // // //                   <Link
// // // // //                     to="/register"
// // // // //                     className="
// // // // //                       bg-gradient-to-r from-purple-600 to-indigo-600 
// // // // //                       px-4 py-2 rounded-xl 
// // // // //                       text-white font-bold
// // // // //                       shadow-[0_0_10px_rgba(168,85,247,0.6)]
// // // // //                       hover:shadow-[0_0_20px_rgba(168,85,247,0.9)]
// // // // //                       transition-all
// // // // //                     "
// // // // //                   >
// // // // //                     Register
// // // // //                   </Link>
// // // // //                 </motion.li>
// // // // //               </>
// // // // //             )}
// // // // //           </ul>
// // // // //         </nav>
// // // // //       </div>
// // // // //     </motion.header>
// // // // //   );
// // // // // };

// // // // // // 🔹 Small Component for Navigation + Animated Underline
// // // // // const NavItem = ({ to, label }) => (
// // // // //   <motion.li
// // // // //     whileHover={{ scale: 1.07 }}
// // // // //     className="relative group font-semibold text-white"
// // // // //   >
// // // // //     <Link to={to} className="hover:text-purple-300 transition">
// // // // //       {label}
// // // // //     </Link>

// // // // //     {/* Animated underline */}
// // // // //     <span
// // // // //       className="
// // // // //         absolute left-0 -bottom-1 w-0 h-[2px] 
// // // // //         bg-purple-400 rounded-full 
// // // // //         transition-all duration-300 group-hover:w-full
// // // // //       "
// // // // //     ></span>
// // // // //   </motion.li>
// // // // // );

// // // // // export default Header;
// // // // import React from "react";
// // // // import { Link, useNavigate } from "react-router-dom";
// // // // import { motion } from "framer-motion";
// // // // import { useAuth } from "../context/AuthContext";

// // // // const Header = () => {
// // // //   const { user, logout, loading } = useAuth();
// // // //   const navigate = useNavigate();

// // // //   const handleLogout = () => {
// // // //     logout();
// // // //     navigate("/login");
// // // //   };

// // // //   if (loading) return null;

// // // //   return (
// // // //     <motion.header
// // // //       initial={{ y: -30, opacity: 0 }}
// // // //       animate={{ y: 0, opacity: 1 }}
// // // //       transition={{ duration: 0.5 }}
// // // //       className="
// // // //         sticky top-0 z-50 
// // // //         backdrop-blur-xl  
// // // //         bg-[#0e0e10]/60 
// // // //         border-b border-white/10 
// // // //         shadow-lg
// // // //         supports-[backdrop-filter]:backdrop-blur-lg
// // // //       "
// // // //     >
// // // //       <div className="container mx-auto flex justify-between items-center p-4">

// // // //         {/* Logo */}
// // // //         <motion.div
// // // //           whileHover={{ scale: 1.05 }}
// // // //           className="
// // // //             text-3xl font-extrabold 
// // // //             bg-gradient-to-r from-purple-500 to-indigo-400
// // // //             bg-clip-text text-transparent 
// // // //             drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]
// // // //             cursor-pointer
// // // //           "
// // // //         >
// // // //           <Link to="/">FindIt</Link>
// // // //         </motion.div>

// // // //         {/* Navigation */}
// // // //         <nav>
// // // //           <ul className="flex space-x-6 items-center text-gray-100">

// // // //             <NavItem to="/items" label="Browse Items" />

// // // //             {user ? (
// // // //               <>
// // // //                 <NavItem to="/dashboard" label="Dashboard" />
// // // //                 <NavItem to="/notifications" label="Notifications" />
// // // //                 <NavItem to="/my-claims" label="My Claims" />
// // // //                 <NavItem to="/claims-on-my-items" label="Claims on My Items" />

// // // //                 {/* Hello User */}
// // // //                 <motion.li
// // // //                   whileHover={{ scale: 1.05 }}
// // // //                   className="text-gray-200 font-semibold tracking-wide"
// // // //                 >
// // // //                   <Link to="/profile" className="hover:text-purple-300">
// // // //                     Hello, {user.name?.split(" ")[0] || "User"}
// // // //                   </Link>
// // // //                 </motion.li>

// // // //                 {/* Logout */}
// // // //                 <motion.button
// // // //                   whileHover={{ scale: 1.1 }}
// // // //                   whileTap={{ scale: 0.9 }}
// // // //                   onClick={handleLogout}
// // // //                   className="
// // // //                     bg-gradient-to-r from-purple-600 to-indigo-600 
// // // //                     px-4 py-2 rounded-xl 
// // // //                     text-white font-bold
// // // //                     shadow-[0_0_15px_rgba(139,92,246,0.7)]
// // // //                     hover:shadow-[0_0_25px_rgba(139,92,246,1)]
// // // //                     transition-all
// // // //                   "
// // // //                 >
// // // //                   Logout
// // // //                 </motion.button>
// // // //               </>
// // // //             ) : (
// // // //               <>
// // // //                 <NavItem to="/login" label="Login" />

// // // //                 <motion.li whileHover={{ scale: 1.08 }}>
// // // //                   <Link
// // // //                     to="/register"
// // // //                     className="
// // // //                       bg-gradient-to-r from-purple-600 to-indigo-600 
// // // //                       px-4 py-2 rounded-xl 
// // // //                       text-white font-bold
// // // //                       shadow-[0_0_15px_rgba(168,85,247,0.7)]
// // // //                       hover:shadow-[0_0_25px_rgba(168,85,247,1)]
// // // //                       transition-all
// // // //                     "
// // // //                   >
// // // //                     Register
// // // //                   </Link>
// // // //                 </motion.li>
// // // //               </>
// // // //             )}
// // // //           </ul>
// // // //         </nav>
// // // //       </div>
// // // //     </motion.header>
// // // //   );
// // // // };


// // // // // 🔹 Animated Nav Item
// // // // const NavItem = ({ to, label }) => (
// // // //   <motion.li
// // // //     whileHover={{ scale: 1.07 }}
// // // //     className="relative group text-gray-100 font-semibold"
// // // //   >
// // // //     <Link className="hover:text-purple-300 transition" to={to}>
// // // //       {label}
// // // //     </Link>

// // // //     <span
// // // //       className="
// // // //         absolute left-0 -bottom-1 w-0 h-[2px] 
// // // //         bg-purple-400 rounded-full 
// // // //         transition-all duration-300 group-hover:w-full
// // // //       "
// // // //     ></span>
// // // //   </motion.li>
// // // // );

// // // // export default Header;

// // // // client/src/components/Header.jsx
// // // import React, { useState, useEffect } from "react";
// // // import { Link, useNavigate, useLocation } from "react-router-dom";
// // // import { motion, AnimatePresence } from "framer-motion";
// // // import { useAuth } from "../context/AuthContext";
// // // import { 
// // //   HomeIcon, 
// // //   Squares2X2Icon, 
// // //   BellIcon, 
// // //   ArchiveBoxIcon, 
// // //   InboxArrowDownIcon, 
// // //   UserCircleIcon,
// // //   ArrowRightOnRectangleIcon,
// // //   SparklesIcon,
// // //   Bars3Icon,
// // //   XMarkIcon
// // // } from "@heroicons/react/24/outline";

// // // const Header = () => {
// // //   const { user, logout, loading } = useAuth();
// // //   const navigate = useNavigate();
// // //   const location = useLocation();
// // //   const [scrolled, setScrolled] = useState(false);
// // //   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

// // //   // Detect scroll to intensify glass effect
// // //   useEffect(() => {
// // //     const handleScroll = () => setScrolled(window.scrollY > 20);
// // //     window.addEventListener("scroll", handleScroll);
// // //     return () => window.removeEventListener("scroll", handleScroll);
// // //   }, []);

// // //   const handleLogout = () => {
// // //     logout();
// // //     navigate("/login");
// // //     setMobileMenuOpen(false);
// // //   };

// // //   if (loading) return null;

// // //   return (
// // //     <motion.header
// // //       initial={{ y: -100 }}
// // //       animate={{ y: 0 }}
// // //       transition={{ duration: 0.6, ease: "circOut" }}
// // //       className={`
// // //         fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b
// // //         ${scrolled 
// // //           ? "bg-[#0a0a12]/80 backdrop-blur-xl border-white/10 shadow-lg shadow-purple-900/10 py-3" 
// // //           : "bg-transparent border-transparent py-5"
// // //         }
// // //       `}
// // //     >
// // //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">

// // //         {/* --- Logo --- */}
// // //         <Link to="/" className="group flex items-center gap-2 relative z-50">
// // //           <div className="p-2 bg-gradient-to-tr from-purple-600 to-blue-600 rounded-lg shadow-lg group-hover:shadow-purple-500/40 transition-all duration-300">
// // //             <SparklesIcon className="w-5 h-5 text-white" />
// // //           </div>
// // //           <span className="text-2xl font-black tracking-tighter text-white">
// // //             Find<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">It</span>
// // //             <span className="hidden sm:inline-block ml-2 text-[10px] uppercase tracking-widest text-gray-500 font-mono border border-white/10 px-2 py-0.5 rounded-full">
// // //               Beta
// // //             </span>
// // //           </span>
// // //         </Link>

// // //         {/* --- Desktop Nav --- */}
// // //         <nav className="hidden lg:flex items-center gap-1">
// // //           <NavItem to="/items" icon={HomeIcon} label="Browse" active={location.pathname === '/items'} />
          
// // //           {user && (
// // //             <>
// // //               <div className="w-px h-6 bg-white/10 mx-2"></div>
// // //               <NavItem to="/dashboard" icon={Squares2X2Icon} label="Dashboard" active={location.pathname === '/dashboard'} />
// // //               <NavItem to="/notifications" icon={BellIcon} label="Alerts" active={location.pathname === '/notifications'} />
              
// // //               {/* Claims Dropdown Group (Simplified for header) */}
// // //               <NavItem to="/my-claims" icon={ArchiveBoxIcon} label="My Claims" active={location.pathname === '/my-claims'} />
// // //               <NavItem to="/claims-on-my-items" icon={InboxArrowDownIcon} label="Incoming" active={location.pathname === '/claims-on-my-items'} />
// // //             </>
// // //           )}
// // //         </nav>

// // //         {/* --- User Actions (Desktop) --- */}
// // //         <div className="hidden lg:flex items-center gap-4">
// // //           {user ? (
// // //             <div className="flex items-center gap-4 pl-4 border-l border-white/10">
// // //               <Link to="/profile" className="group flex items-center gap-3">
// // //                 <div className="text-right hidden xl:block">
// // //                   <p className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
// // //                     {user.name?.split(" ")[0]}
// // //                   </p>
// // //                   <p className="text-[10px] text-gray-400 font-mono uppercase tracking-wider">
// // //                     KP: {user.karma_points || 0}
// // //                   </p>
// // //                 </div>
// // //                 <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-[2px] ring-2 ring-transparent group-hover:ring-purple-500/50 transition-all">
// // //                   <div className="w-full h-full rounded-full bg-[#0a0a12] flex items-center justify-center overflow-hidden">
// // //                      <span className="font-bold text-white">{user.name?.[0]}</span>
// // //                   </div>
// // //                 </div>
// // //               </Link>

// // //               <motion.button
// // //                 whileHover={{ scale: 1.05 }}
// // //                 whileTap={{ scale: 0.95 }}
// // //                 onClick={handleLogout}
// // //                 className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
// // //                 title="Logout"
// // //               >
// // //                 <ArrowRightOnRectangleIcon className="w-6 h-6" />
// // //               </motion.button>
// // //             </div>
// // //           ) : (
// // //             <div className="flex items-center gap-3">
// // //               <Link to="/login" className="text-sm font-bold text-gray-300 hover:text-white transition-colors px-4 py-2">
// // //                 Log In
// // //               </Link>
// // //               <Link 
// // //                 to="/register"
// // //                 className="relative px-6 py-2.5 bg-white text-black font-bold rounded-full text-sm hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all transform hover:-translate-y-0.5 active:scale-95"
// // //               >
// // //                 Get Started
// // //               </Link>
// // //             </div>
// // //           )}
// // //         </div>

// // //         {/* --- Mobile Menu Toggle --- */}
// // //         <button 
// // //           className="lg:hidden p-2 text-gray-300 hover:text-white"
// // //           onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
// // //         >
// // //           {mobileMenuOpen ? <XMarkIcon className="w-7 h-7"/> : <Bars3Icon className="w-7 h-7" />}
// // //         </button>

// // //       </div>

// // //       {/* --- Mobile Navigation Menu --- */}
// // //       <AnimatePresence>
// // //         {mobileMenuOpen && (
// // //           <motion.div
// // //             initial={{ opacity: 0, height: 0 }}
// // //             animate={{ opacity: 1, height: "auto" }}
// // //             exit={{ opacity: 0, height: 0 }}
// // //             className="lg:hidden bg-[#0a0a12] border-b border-white/10 overflow-hidden"
// // //           >
// // //             <div className="px-4 py-6 space-y-4">
// // //               <MobileNavItem to="/items" icon={HomeIcon} label="Browse Items" onClick={() => setMobileMenuOpen(false)} />
              
// // //               {user ? (
// // //                 <>
// // //                   <MobileNavItem to="/dashboard" icon={Squares2X2Icon} label="Dashboard" onClick={() => setMobileMenuOpen(false)} />
// // //                   <MobileNavItem to="/notifications" icon={BellIcon} label="Notifications" onClick={() => setMobileMenuOpen(false)} />
// // //                   <MobileNavItem to="/my-claims" icon={ArchiveBoxIcon} label="My Claims" onClick={() => setMobileMenuOpen(false)} />
// // //                   <MobileNavItem to="/claims-on-my-items" icon={InboxArrowDownIcon} label="Incoming Claims" onClick={() => setMobileMenuOpen(false)} />
// // //                   <MobileNavItem to="/profile" icon={UserCircleIcon} label="My Profile" onClick={() => setMobileMenuOpen(false)} />
                  
// // //                   <div className="pt-4 border-t border-white/10">
// // //                     <button 
// // //                       onClick={handleLogout}
// // //                       className="w-full flex items-center gap-3 px-4 py-3 text-red-400 bg-red-500/10 rounded-xl font-bold"
// // //                     >
// // //                       <ArrowRightOnRectangleIcon className="w-5 h-5" /> Logout
// // //                     </button>
// // //                   </div>
// // //                 </>
// // //               ) : (
// // //                 <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
// // //                    <Link 
// // //                     to="/login" 
// // //                     onClick={() => setMobileMenuOpen(false)}
// // //                     className="text-center py-3 rounded-xl bg-white/5 text-white font-bold border border-white/10"
// // //                   >
// // //                     Login
// // //                   </Link>
// // //                    <Link 
// // //                     to="/register" 
// // //                     onClick={() => setMobileMenuOpen(false)}
// // //                     className="text-center py-3 rounded-xl bg-purple-600 text-white font-bold shadow-lg shadow-purple-500/20"
// // //                   >
// // //                     Register
// // //                   </Link>
// // //                 </div>
// // //               )}
// // //             </div>
// // //           </motion.div>
// // //         )}
// // //       </AnimatePresence>
// // //     </motion.header>
// // //   );
// // // };

// // // // --- Components ---

// // // const NavItem = ({ to, icon: Icon, label, active }) => (
// // //   <Link to={to}>
// // //     <div className={`
// // //       relative px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-300 group
// // //       ${active ? "bg-white/10 text-white" : "text-gray-400 hover:text-white hover:bg-white/5"}
// // //     `}>
// // //       <Icon className={`w-4 h-4 ${active ? "text-purple-400" : "group-hover:text-purple-400 transition-colors"}`} />
// // //       <span className="text-sm font-medium">{label}</span>
      
// // //       {/* Active Glow Dot */}
// // //       {active && (
// // //         <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-purple-400 rounded-full shadow-[0_0_10px_rgba(168,85,247,1)]"></span>
// // //       )}
// // //     </div>
// // //   </Link>
// // // );

// // // const MobileNavItem = ({ to, icon: Icon, label, onClick }) => (
// // //   <Link 
// // //     to={to} 
// // //     onClick={onClick}
// // //     className="flex items-center gap-4 px-4 py-3 text-gray-300 hover:bg-white/5 rounded-xl transition-colors"
// // //   >
// // //     <Icon className="w-6 h-6 text-purple-500" />
// // //     <span className="font-semibold text-lg">{label}</span>
// // //   </Link>
// // // );

// // // export default Header;
// // // client/src/components/Header.jsx
// // import React, { useState, useEffect } from "react";
// // import { Link, useNavigate, useLocation } from "react-router-dom";
// // import { motion, AnimatePresence } from "framer-motion";
// // import { useAuth } from "../context/AuthContext";
// // import { 
// //   HomeIcon, 
// //   Squares2X2Icon, 
// //   BellIcon, 
// //   ArchiveBoxIcon, 
// //   InboxArrowDownIcon,
// //   UserCircleIcon,
// //   ArrowRightOnRectangleIcon,
// //   SparklesIcon,
// //   Bars3Icon,
// //   XMarkIcon
// // } from "@heroicons/react/24/outline";

// // const Header = () => {
// //   const { user, logout, loading } = useAuth();
// //   const navigate = useNavigate();
// //   const location = useLocation();
// //   const [scrolled, setScrolled] = useState(false);
// //   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

// //   // Detect scroll to intensify glass effect
// //   useEffect(() => {
// //     const handleScroll = () => setScrolled(window.scrollY > 20);
// //     window.addEventListener("scroll", handleScroll);
// //     return () => window.removeEventListener("scroll", handleScroll);
// //   }, []);

// //   const handleLogout = () => {
// //     logout();
// //     navigate("/login");
// //     setMobileMenuOpen(false);
// //   };

// //   if (loading) return null;

// //   return (
// //     <>
// //       <motion.header
// //         initial={{ y: -100 }}
// //         animate={{ y: 0 }}
// //         transition={{ duration: 0.5 }}
// //         className={`
// //           sticky top-0 z-50 w-full transition-all duration-300 border-b
// //           ${scrolled 
// //             ? "bg-[#0a0a12]/80 backdrop-blur-xl border-white/10 shadow-lg shadow-purple-900/10 py-3" 
// //             : "bg-[#0a0a12]/40 backdrop-blur-md border-transparent py-4"
// //           }
// //         `}
// //       >
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">

// //           {/* --- Logo --- */}
// //           <Link to="/" className="flex items-center gap-2 group">
// //             <div className="p-2 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg shadow-lg group-hover:shadow-purple-500/50 transition-all duration-300">
// //               <SparklesIcon className="w-5 h-5 text-white" />
// //             </div>
// //             <span className="text-2xl font-black tracking-tight text-white">
// //               Find<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">It</span>
// //             </span>
// //           </Link>

// //           {/* --- Desktop Nav --- */}
// //           <nav className="hidden lg:flex items-center gap-1">
// //             <NavItem to="/items" icon={HomeIcon} label="Browse" active={location.pathname === '/items'} />

// //             {user && (
// //               <>
// //                 <div className="w-px h-6 bg-white/10 mx-2"></div>
// //                 <NavItem to="/dashboard" icon={Squares2X2Icon} label="Dashboard" active={location.pathname === '/dashboard'} />
// //                 <NavItem to="/notifications" icon={BellIcon} label="Alerts" active={location.pathname === '/notifications'} />
// //                 <NavItem to="/my-claims" icon={ArchiveBoxIcon} label="Claims" active={location.pathname === '/my-claims'} />
// //                 <NavItem to="/claims-on-my-items" icon={InboxArrowDownIcon} label="Incoming" active={location.pathname === '/claims-on-my-items'} />
// //               </>
// //             )}
// //           </nav>

// //           {/* --- User Profile / Auth --- */}
// //           <div className="hidden lg:flex items-center gap-4">
// //             {user ? (
// //               <div className="flex items-center gap-3 pl-4 border-l border-white/10">
// //                 <Link to="/profile" className="flex items-center gap-3 group">
// //                   <div className="text-right hidden xl:block">
// //                     <p className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
// //                       {user.name?.split(" ")[0]}
// //                     </p>
// //                     <p className="text-[10px] text-gray-400 font-mono">XP: {user.karma_points || 0}</p>
// //                   </div>
// //                   <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 p-[2px]">
// //                     <div className="w-full h-full rounded-full bg-[#0a0a12] flex items-center justify-center">
// //                       <span className="font-bold text-white text-sm">{user.name?.[0]}</span>
// //                     </div>
// //                   </div>
// //                 </Link>
// //                 <button 
// //                   onClick={handleLogout}
// //                   className="p-2 text-gray-400 hover:text-white transition-colors"
// //                   title="Logout"
// //                 >
// //                   <ArrowRightOnRectangleIcon className="w-6 h-6" />
// //                 </button>
// //               </div>
// //             ) : (
// //               <div className="flex items-center gap-3">
// //                 <Link to="/login" className="text-sm font-bold text-gray-300 hover:text-white transition-colors">Login</Link>
// //                 <Link 
// //                   to="/register"
// //                   className="px-5 py-2 bg-white text-black font-bold rounded-full text-sm hover:scale-105 transition-transform"
// //                 >
// //                   Sign Up
// //                 </Link>
// //               </div>
// //             )}
// //           </div>

// //           {/* --- Mobile Toggle --- */}
// //           <button 
// //             className="lg:hidden p-2 text-gray-300 hover:text-white"
// //             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
// //           >
// //             {mobileMenuOpen ? <XMarkIcon className="w-7 h-7"/> : <Bars3Icon className="w-7 h-7" />}
// //           </button>
// //         </div>
// //       </motion.header>

// //       {/* --- Mobile Menu Overlay --- */}
// //       <AnimatePresence>
// //         {mobileMenuOpen && (
// //           <motion.div
// //             initial={{ opacity: 0, height: 0 }}
// //             animate={{ opacity: 1, height: "auto" }}
// //             exit={{ opacity: 0, height: 0 }}
// //             className="lg:hidden fixed inset-x-0 top-[72px] bg-[#0a0a12] border-b border-white/10 z-40 overflow-hidden shadow-2xl"
// //           >
// //             <div className="p-4 space-y-2">
// //               <MobileNavItem to="/items" icon={HomeIcon} label="Browse Items" onClick={() => setMobileMenuOpen(false)} />
// //               {user ? (
// //                 <>
// //                   <MobileNavItem to="/dashboard" icon={Squares2X2Icon} label="Dashboard" onClick={() => setMobileMenuOpen(false)} />
// //                   <MobileNavItem to="/notifications" icon={BellIcon} label="Notifications" onClick={() => setMobileMenuOpen(false)} />
// //                   <MobileNavItem to="/my-claims" icon={ArchiveBoxIcon} label="My Claims" onClick={() => setMobileMenuOpen(false)} />
// //                   <MobileNavItem to="/profile" icon={UserCircleIcon} label="Profile" onClick={() => setMobileMenuOpen(false)} />
// //                   <button 
// //                     onClick={handleLogout}
// //                     className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-white/5 rounded-xl transition-colors mt-4 border-t border-white/10"
// //                   >
// //                     <ArrowRightOnRectangleIcon className="w-6 h-6" />
// //                     <span className="font-bold">Logout</span>
// //                   </button>
// //                 </>
// //               ) : (
// //                 <div className="grid grid-cols-2 gap-4 mt-4">
// //                    <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="py-3 text-center rounded-xl bg-white/5 text-white font-bold border border-white/10">Login</Link>
// //                    <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="py-3 text-center rounded-xl bg-purple-600 text-white font-bold">Register</Link>
// //                 </div>
// //               )}
// //             </div>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>
// //     </>
// //   );
// // };

// // // --- Sub Components ---

// // const NavItem = ({ to, icon: Icon, label, active }) => (
// //   <Link to={to}>
// //     <div className={`
// //       relative px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-200
// //       ${active ? "text-white bg-white/10" : "text-gray-400 hover:text-white hover:bg-white/5"}
// //     `}>
// //       <Icon className={`w-4 h-4 ${active ? "text-purple-400" : "group-hover:text-purple-400"}`} />
// //       <span className="text-sm font-medium">{label}</span>
// //       {active && (
// //         <motion.div 
// //           layoutId="nav-glow"
// //           className="absolute inset-0 rounded-full bg-white/5 shadow-[0_0_10px_rgba(168,85,247,0.2)]"
// //           transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
// //         />
// //       )}
// //     </div>
// //   </Link>
// // );

// // const MobileNavItem = ({ to, icon: Icon, label, onClick }) => (
// //   <Link 
// //     to={to} 
// //     onClick={onClick}
// //     className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
// //   >
// //     <Icon className="w-6 h-6 text-purple-500" />
// //     <span className="font-semibold">{label}</span>
// //   </Link>
// // );

// // export default Header;
// // client/src/components/Header.jsx
// import React, { useState, useEffect } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { useAuth } from "../context/AuthContext";
// import { 
//   HomeIcon, 
//   Squares2X2Icon, 
//   BellIcon, 
//   ArchiveBoxIcon, 
//   InboxArrowDownIcon,
//   UserCircleIcon,
//   ArrowRightOnRectangleIcon,
//   SparklesIcon,
//   Bars3Icon,
//   XMarkIcon
// } from "@heroicons/react/24/outline";

// const Header = () => {
//   const { user, logout, loading } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [scrolled, setScrolled] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//     setMobileMenuOpen(false);
//   };

//   if (loading) return null;

//   return (
//     <>
//       <motion.header
//         initial={{ y: -100 }}
//         animate={{ y: 0 }}
//         transition={{ duration: 0.5 }}
//         className={`
//           sticky top-0 z-50 w-full transition-all duration-300 border-b
//           ${scrolled 
//             /* Scrolled: Solid dark glass, distinct border */
//             ? "bg-[#030305]/90 backdrop-blur-xl border-white/10 shadow-lg shadow-black/50 py-3" 
//             : "bg-[#030305]/60 backdrop-blur-lg border-white/5 py-4" 
//             /* Top: Semi-transparent dark glass, subtle border */
//           }
//         `}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">

//           {/* --- Logo --- */}
//           <Link to="/" className="flex items-center gap-2 group">
//             <div className="p-2 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg shadow-lg group-hover:shadow-purple-500/50 transition-all duration-300">
//               <SparklesIcon className="w-5 h-5 text-white" />
//             </div>
//             <span className="text-2xl font-black tracking-tight text-white drop-shadow-md">
//               Find<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">It</span>
//             </span>
//           </Link>

//           {/* --- Desktop Nav --- */}
//           <nav className="hidden lg:flex items-center gap-1 bg-white/5 rounded-full px-2 py-1 border border-white/5">
//             <NavItem to="/items" icon={HomeIcon} label="Browse" active={location.pathname === '/items'} />

//             {user && (
//               <>
//                 <div className="w-px h-5 bg-white/20 mx-2"></div>
//                 <NavItem to="/dashboard" icon={Squares2X2Icon} label="Dashboard" active={location.pathname === '/dashboard'} />
//                 <NavItem to="/notifications" icon={BellIcon} label="Alerts" active={location.pathname === '/notifications'} />
//                 <NavItem to="/my-claims" icon={ArchiveBoxIcon} label="Claims" active={location.pathname === '/my-claims'} />
//                 <NavItem to="/claims-on-my-items" icon={InboxArrowDownIcon} label="Incoming" active={location.pathname === '/claims-on-my-items'} />
//               </>
//             )}
//           </nav>

//           {/* --- User Profile / Auth --- */}
//           <div className="hidden lg:flex items-center gap-4">
//             {user ? (
//               <div className="flex items-center gap-3 pl-4 border-l border-white/10">
//                 <Link to="/profile" className="flex items-center gap-3 group">
//                   <div className="text-right hidden xl:block">
//                     {/* Improved Text Contrast */}
//                     <p className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors shadow-black drop-shadow-sm">
//                       {user.name?.split(" ")[0]}
//                     </p>
//                     <p className="text-[10px] text-gray-300 font-mono">XP: {user.karma_points || 0}</p>
//                   </div>
//                   <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 p-[2px] shadow-lg shadow-purple-500/20">
//                     <div className="w-full h-full rounded-full bg-[#0a0a12] flex items-center justify-center">
//                       <span className="font-bold text-white text-sm">{user.name?.[0]}</span>
//                     </div>
//                   </div>
//                 </Link>
//                 <button 
//                   onClick={handleLogout}
//                   className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-colors"
//                   title="Logout"
//                 >
//                   <ArrowRightOnRectangleIcon className="w-6 h-6" />
//                 </button>
//               </div>
//             ) : (
//               <div className="flex items-center gap-3">
//                 <Link to="/login" className="text-sm font-bold text-gray-200 hover:text-white transition-colors">Login</Link>
//                 <Link 
//                   to="/register"
//                   className="px-5 py-2 bg-white text-black font-bold rounded-full text-sm hover:scale-105 transition-transform shadow-lg shadow-white/10"
//                 >
//                   Sign Up
//                 </Link>
//               </div>
//             )}
//           </div>

//           {/* --- Mobile Toggle --- */}
//           <button 
//             className="lg:hidden p-2 text-gray-200 hover:text-white"
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//           >
//             {mobileMenuOpen ? <XMarkIcon className="w-7 h-7"/> : <Bars3Icon className="w-7 h-7" />}
//           </button>
//         </div>
//       </motion.header>

//       {/* --- Mobile Menu Overlay --- */}
//       <AnimatePresence>
//         {mobileMenuOpen && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             className="lg:hidden fixed inset-x-0 top-[72px] bg-[#050508] border-b border-white/10 z-40 overflow-hidden shadow-2xl"
//           >
//             <div className="p-4 space-y-2">
//               <MobileNavItem to="/items" icon={HomeIcon} label="Browse Items" onClick={() => setMobileMenuOpen(false)} />
//               {user ? (
//                 <>
//                   <MobileNavItem to="/dashboard" icon={Squares2X2Icon} label="Dashboard" onClick={() => setMobileMenuOpen(false)} />
//                   <MobileNavItem to="/notifications" icon={BellIcon} label="Notifications" onClick={() => setMobileMenuOpen(false)} />
//                   <MobileNavItem to="/my-claims" icon={ArchiveBoxIcon} label="My Claims" onClick={() => setMobileMenuOpen(false)} />
//                   <MobileNavItem to="/claims-on-my-items" icon={InboxArrowDownIcon} label="Incoming Claims" onClick={() => setMobileMenuOpen(false)} />
//                   <MobileNavItem to="/profile" icon={UserCircleIcon} label="Profile" onClick={() => setMobileMenuOpen(false)} />
//                   <button 
//                     onClick={handleLogout}
//                     className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-white/5 rounded-xl transition-colors mt-4 border-t border-white/10"
//                   >
//                     <ArrowRightOnRectangleIcon className="w-6 h-6" />
//                     <span className="font-bold">Logout</span>
//                   </button>
//                 </>
//               ) : (
//                 <div className="grid grid-cols-2 gap-4 mt-4">
//                    <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="py-3 text-center rounded-xl bg-white/5 text-white font-bold border border-white/10">Login</Link>
//                    <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="py-3 text-center rounded-xl bg-purple-600 text-white font-bold">Register</Link>
//                 </div>
//               )}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// // --- Sub Components ---

// const NavItem = ({ to, icon: Icon, label, active }) => (
//   <Link to={to}>
//     <div className={`
//       relative px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-200
//       ${active 
//         ? "text-white bg-white/10 shadow-inner" 
//         : "text-gray-300 hover:text-white hover:bg-white/5" // Lighter gray text for better visibility
//       }
//     `}>
//       <Icon className={`w-4 h-4 ${active ? "text-purple-400" : "group-hover:text-purple-400"}`} />
//       <span className="text-sm font-medium drop-shadow-sm">{label}</span>
//       {active && (
//         <motion.div 
//           layoutId="nav-glow"
//           className="absolute inset-0 rounded-full bg-white/5 shadow-[0_0_10px_rgba(168,85,247,0.2)]"
//           transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
//         />
//       )}
//     </div>
//   </Link>
// );

// const MobileNavItem = ({ to, icon: Icon, label, onClick }) => (
//   <Link 
//     to={to} 
//     onClick={onClick}
//     className="flex items-center gap-3 px-4 py-3 text-gray-200 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
//   >
//     <Icon className="w-6 h-6 text-purple-500" />
//     <span className="font-semibold">{label}</span>
//   </Link>
// );

// export default Header;
// client/src/components/Header.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { 
  HomeIcon, 
  Squares2X2Icon, 
  BellIcon, 
  ArchiveBoxIcon, 
  InboxArrowDownIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  SparklesIcon,
  Bars3Icon,
  XMarkIcon
} from "@heroicons/react/24/outline";

const Header = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMobileMenuOpen(false);
  };

  if (loading) return null;

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-500
          ${scrolled 
            /* SCROLLED: Dark Glassy Look */
            ? "bg-[#0a0a12]/80 backdrop-blur-md border-b border-white/10 py-3 shadow-lg shadow-black/50" 
            /* TOP: Fully Transparent (No grey bar) */
            : "bg-transparent border-b border-transparent py-5" 
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">

          {/* --- Logo --- */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-gradient-to-tr from-purple-600 to-blue-600 rounded-lg shadow-lg shadow-purple-500/30 transition-all duration-300 group-hover:shadow-purple-500/50">
              <SparklesIcon className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-black tracking-tight text-white drop-shadow-md">
              CampX<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Find</span>
            </span>
          </Link>

          {/* --- Desktop Nav --- */}
          <nav className={`hidden lg:flex items-center gap-1 transition-all duration-500 ${scrolled ? "bg-white/5 rounded-full px-2 py-1 border border-white/5" : ""}`}>
            <NavItem to="/items" icon={HomeIcon} label="Browse" active={location.pathname === '/items'} />

            {user && (
              <>
                <div className={`w-px h-5 mx-2 ${scrolled ? "bg-white/20" : "bg-white/10"}`}></div>
                <NavItem to="/dashboard" icon={Squares2X2Icon} label="Dashboard" active={location.pathname === '/dashboard'} />
                <NavItem to="/notifications" icon={BellIcon} label="Alerts" active={location.pathname === '/notifications'} />
                <NavItem to="/my-claims" icon={ArchiveBoxIcon} label="Claims" active={location.pathname === '/my-claims'} />
                <NavItem to="/claims-on-my-items" icon={InboxArrowDownIcon} label="Incoming" active={location.pathname === '/claims-on-my-items'} />
              </>
            )}
          </nav>

          {/* --- User Profile / Auth --- */}
          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                <Link to="/profile" className="flex items-center gap-3 group">
                  <div className="text-right hidden xl:block">
                    <p className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors shadow-black drop-shadow-sm">
                      {user.name?.split(" ")[0]}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 p-[2px] shadow-lg shadow-purple-500/20">
                    <div className="w-full h-full rounded-full bg-[#0a0a12] flex items-center justify-center">
                      <span className="font-bold text-white text-sm">{user.name?.[0]}</span>
                    </div>
                  </div>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                  title="Logout"
                >
                  <ArrowRightOnRectangleIcon className="w-6 h-6" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="text-sm font-bold text-gray-200 hover:text-white transition-colors">Login</Link>
                <Link 
                  to="/register"
                  className="px-5 py-2 bg-white text-black font-bold rounded-full text-sm hover:scale-105 transition-transform shadow-lg shadow-white/10"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* --- Mobile Toggle --- */}
          <button 
            className="lg:hidden p-2 text-gray-200 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <XMarkIcon className="w-7 h-7"/> : <Bars3Icon className="w-7 h-7" />}
          </button>
        </div>
      </motion.header>

      {/* --- Mobile Menu Overlay --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden fixed inset-x-0 top-[70px] bg-[#0a0a12]/95 border-b border-white/10 z-40 overflow-hidden shadow-2xl backdrop-blur-xl"
          >
            <div className="p-4 space-y-2">
              <MobileNavItem to="/items" icon={HomeIcon} label="Browse Items" onClick={() => setMobileMenuOpen(false)} />
              {user ? (
                <>
                  <MobileNavItem to="/dashboard" icon={Squares2X2Icon} label="Dashboard" onClick={() => setMobileMenuOpen(false)} />
                  <MobileNavItem to="/notifications" icon={BellIcon} label="Notifications" onClick={() => setMobileMenuOpen(false)} />
                  <MobileNavItem to="/my-claims" icon={ArchiveBoxIcon} label="My Claims" onClick={() => setMobileMenuOpen(false)} />
                  <MobileNavItem to="/claims-on-my-items" icon={InboxArrowDownIcon} label="Incoming Claims" onClick={() => setMobileMenuOpen(false)} />
                  <MobileNavItem to="/profile" icon={UserCircleIcon} label="Profile" onClick={() => setMobileMenuOpen(false)} />
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-white/5 rounded-xl transition-colors mt-4 border-t border-white/10"
                  >
                    <ArrowRightOnRectangleIcon className="w-6 h-6" />
                    <span className="font-bold">Logout</span>
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-4 mt-4">
                   <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="py-3 text-center rounded-xl bg-white/5 text-white font-bold border border-white/10">Login</Link>
                   <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="py-3 text-center rounded-xl bg-purple-600 text-white font-bold">Register</Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// --- Sub Components ---

const NavItem = ({ to, icon: Icon, label, active }) => (
  <Link to={to}>
    <div className={`
      relative px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-200
      ${active 
        ? "text-white bg-white/10 shadow-inner" 
        : "text-gray-300 hover:text-white hover:bg-white/5" 
      }
    `}>
      <Icon className={`w-4 h-4 ${active ? "text-purple-400" : "group-hover:text-purple-400"}`} />
      <span className="text-sm font-medium drop-shadow-sm">{label}</span>
      {active && (
        <motion.div 
          layoutId="nav-glow"
          className="absolute inset-0 rounded-full bg-white/5 shadow-[0_0_10px_rgba(168,85,247,0.2)]"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </div>
  </Link>
);

const MobileNavItem = ({ to, icon: Icon, label, onClick }) => (
  <Link 
    to={to} 
    onClick={onClick}
    className="flex items-center gap-3 px-4 py-3 text-gray-200 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
  >
    <Icon className="w-6 h-6 text-purple-500" />
    <span className="font-semibold">{label}</span>
  </Link>
);

export default Header;
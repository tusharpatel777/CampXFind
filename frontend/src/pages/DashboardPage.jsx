// // // // // // // // client/src/pages/DashboardPage.jsx
// // // // // // // import React from 'react';
// // // // // // // import { useAuth } from '../context/AuthContext';

// // // // // // // const DashboardPage = () => {
// // // // // // //   const { user } = useAuth();

// // // // // // //   return (
// // // // // // //     <div className="min-h-[calc(100vh-64px)] bg-white flex flex-col items-center justify-center p-4">
// // // // // // //       <h1 className="text-4xl font-bold text-gray-800 mb-6"> Welcome to your Dashboard, {user?.name?.split(' ')[0] || 'User'}!</h1>
// // // // // // //       <p className="text-lg text-gray-600 mb-8">
// // // // // // //         This is where you'll manage your lost and found items.
// // // // // // //       </p>
// // // // // // //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
// // // // // // //         <div className="bg-blue-50 p-6 rounded-lg shadow-md text-center">
// // // // // // //           <h2 className="text-2xl font-semibold text-blue-700 mb-3">Report Lost Item</h2>
// // // // // // //           <p className="text-gray-700">Tell us what you've lost, and our AI will help find it.</p>
// // // // // // //           <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg">Report Lost</button>
// // // // // // //         </div>
// // // // // // //         <div className="bg-green-50 p-6 rounded-lg shadow-md text-center">
// // // // // // //           <h2 className="text-2xl font-semibold text-green-700 mb-3">Report Found Item</h2>
// // // // // // //           <p className="text-gray-700">Help someone out! Upload a picture of what you found.</p>
// // // // // // //           <button className="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg">Report Found</button>
// // // // // // //         </div>
// // // // // // //         <div className="bg-yellow-50 p-6 rounded-lg shadow-md text-center">
// // // // // // //           <h2 className="text-2xl font-semibold text-yellow-700 mb-3">My Items</h2>
// // // // // // //           <p className="text-gray-700">View and manage all items you've reported.</p>
// // // // // // //           <button className="mt-4 bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-lg">View Items</button>
// // // // // // //         </div>
// // // // // // //       </div>
// // // // // // //       <p className="mt-8 text-xl text-gray-700">
// // // // // // //         Your Karma Points: <span className="font-bold text-indigo-600">{user?.karma_points || 0}</span>
// // // // // // //       </p>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };


// // // // // // // export default DashboardPage;
// // // // // // // client/src/pages/DashboardPage.jsx
// // // // // // import React from 'react';
// // // // // // import { Link } from 'react-router-dom'; // Import Link
// // // // // // import { useAuth } from '../context/AuthContext';

// // // // // // const DashboardPage = () => {
// // // // // //   const { user } = useAuth();

// // // // // //   return (
// // // // // //     <div className="min-h-[calc(100vh-64px)] bg-white flex flex-col items-center justify-center p-4">
// // // // // //       <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome to your Dashboard, {user?.name?.split(' ')[0] || 'User'}!</h1>
// // // // // //       <p className="text-lg text-gray-600 mb-8">
// // // // // //         This is where you'll manage your lost and found items.
// // // // // //       </p>
// // // // // //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
// // // // // //         <div className="bg-blue-50 p-6 rounded-lg shadow-md text-center">
// // // // // //           <h2 className="text-2xl font-semibold text-blue-700 mb-3">Report Lost Item</h2>
// // // // // //           <p className="text-gray-700">Tell us what you've lost, and our AI will help find it.</p>
// // // // // //           <Link to="/report-item?type=LOST" className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg">Report Lost</Link>
// // // // // //         </div>
// // // // // //         <div className="bg-green-50 p-6 rounded-lg shadow-md text-center">
// // // // // //           <h2 className="text-2xl font-semibold text-green-700 mb-3">Report Found Item</h2>
// // // // // //           <p className="text-gray-700">Help someone out! Upload a picture of what you found.</p>
// // // // // //           <Link to="/report-item?type=FOUND" className="mt-4 inline-block bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg">Report Found</Link>
// // // // // //         </div>
// // // // // //         <div className="bg-yellow-50 p-6 rounded-lg shadow-md text-center">
// // // // // //           <h2 className="text-2xl font-semibold text-yellow-700 mb-3">My Items</h2>
// // // // // //           <p className="text-gray-700">View and manage all items you've reported.</p>
// // // // // //           <Link to="/my-items" className="mt-4 inline-block bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-lg">View Items</Link> {/* This will be another protected route */}
// // // // // //         </div>
// // // // // //       </div>
// // // // // //       <p className="mt-8 text-xl text-gray-700">
// // // // // //         Your Karma Points: <span className="font-bold text-indigo-600">{user?.karma_points || 0}</span>
// // // // // //       </p>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default DashboardPage;
// // // // // // client/src/pages/DashboardPage.jsx
// // // // // import React from 'react';
// // // // // import { Link } from 'react-router-dom';
// // // // // import { useAuth } from '../context/AuthContext';

// // // // // const DashboardPage = () => {
// // // // //   const { user } = useAuth();

// // // // //   return (
// // // // //     <div className="min-h-[calc(100vh-64px)] bg-white flex flex-col items-center justify-center p-4">
// // // // //       <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome to your Dashboard, {user?.name?.split(' ')[0] || 'User'}!</h1>
// // // // //       <p className="text-lg text-gray-600 mb-8">
// // // // //         This is where you'll manage your lost and found items.
// // // // //       </p>
// // // // //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
// // // // //         <div className="bg-blue-50 p-6 rounded-lg shadow-md text-center">
// // // // //           <h2 className="text-2xl font-semibold text-blue-700 mb-3">Report Lost Item</h2>
// // // // //           <p className="text-gray-700">Tell us what you've lost, and our AI will help find it.</p>
// // // // //           <Link to="/report-item?type=LOST" className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg">Report Lost</Link>
// // // // //         </div>
// // // // //         <div className="bg-green-50 p-6 rounded-lg shadow-md text-center">
// // // // //           <h2 className="text-2xl font-semibold text-green-700 mb-3">Report Found Item</h2>
// // // // //           <p className="text-gray-700">Help someone out! Upload a picture of what you found.</p>
// // // // //           <Link to="/report-item?type=FOUND" className="mt-4 inline-block bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg">Report Found</Link>
// // // // //         </div>
// // // // //         <div className="bg-yellow-50 p-6 rounded-lg shadow-md text-center">
// // // // //           <h2 className="text-2xl font-semibold text-yellow-700 mb-3">My Items</h2>
// // // // //           <p className="text-gray-700">View and manage all items you've reported.</p>
// // // // //           <Link to="/my-items" className="mt-4 inline-block bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-lg">View Items</Link> {/* Link now points to actual MyItemsPage */}
// // // // //         </div>
// // // // //       </div>
// // // // //       <p className="mt-8 text-xl text-gray-700">
// // // // //         Your Karma Points: <span className="font-bold text-indigo-600">{user?.karma_points || 0}</span>
// // // // //       </p>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default DashboardPage;
// // // // // client/src/pages/DashboardPage.jsx
// // // // import React from 'react';
// // // // import { Link } from 'react-router-dom';
// // // // import { useAuth } from '../context/AuthContext';
// // // // import AuthLayout from '../layouts/AuthLayout'; // Import AuthLayout
// // // // import { DocumentMagnifyingGlassIcon, PlusCircleIcon, ListBulletIcon } from '@heroicons/react/24/outline'; // Import Heroicons

// // // // const DashboardPage = () => {
// // // //   const { user } = useAuth();

// // // //   return (
// // // //     <AuthLayout> {/* Wrap the content with AuthLayout */}
// // // //       <h1 className="text-4xl font-bold text-white mb-6 text-center shining-text">
// // // //         Welcome to your Dashboard, <span className="text-indigo-400">{user?.name?.split(' ')[0] || 'User'}!</span>
// // // //       </h1>
// // // //       <p className="text-lg text-gray-300 mb-8 text-center max-w-8xl mx-auto">
// // // //         This is where you'll manage your lost and found items and track your contributions.
// // // //       </p>
// // // //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl mx-auto">
// // // //         {/* Report Lost Item Card */}
// // // //         <div className="bg-blue-900 bg-opacity-20 backdrop-filter backdrop-blur-md border border-blue-700 border-opacity-30 p-6 rounded-xl shadow-lg text-center transform hover:scale-105 transition duration-300">
// // // //           <DocumentMagnifyingGlassIcon className="h-12 w-12 text-blue-400 mx-auto mb-4" />
// // // //           <h2 className="text-2xl font-semibold text-blue-300 mb-3">Report Lost Item</h2>
// // // //           <p className="text-gray-300">Tell us what you've lost, and our AI will help find it.</p>
// // // //           <Link to="/report-item?type=LOST" className="mt-4 inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition duration-300">
// // // //             <PlusCircleIcon className="h-5 w-5 mr-2" /> Report Lost
// // // //           </Link>
// // // //         </div>

// // // //         {/* Report Found Item Card */}
// // // //         <div className="bg-green-900 bg-opacity-20 backdrop-filter backdrop-blur-md border border-green-700 border-opacity-30 p-6 rounded-xl shadow-lg text-center transform hover:scale-105 transition duration-300">
// // // //           <PlusCircleIcon className="h-12 w-12 text-green-400 mx-auto mb-4" />
// // // //           <h2 className="text-2xl font-semibold text-green-300 mb-3">Report Found Item</h2>
// // // //           <p className="text-gray-300">Help someone out! Upload a picture of what you found.</p>
// // // //           <Link to="/report-item?type=FOUND" className="mt-4 inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition duration-300">
// // // //             <PlusCircleIcon className="h-5 w-5 mr-2" /> Report Found
// // // //           </Link>
// // // //         </div>

// // // //         {/* My Items Card */}
// // // //         <div className="bg-yellow-900 bg-opacity-20 backdrop-filter backdrop-blur-md border border-yellow-700 border-opacity-30 p-6 rounded-xl shadow-lg text-center transform hover:scale-105 transition duration-300">
// // // //           <ListBulletIcon className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
// // // //           <h2 className="text-2xl font-semibold text-yellow-300 mb-3">My Items</h2>
// // // //           <p className="text-gray-300">View and manage all items you've reported.</p>
// // // //           <Link to="/my-items" className="mt-4 inline-flex items-center justify-center bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-lg font-medium transition duration-300">
// // // //             <ListBulletIcon className="h-5 w-5 mr-2" /> View Items
// // // //           </Link>
// // // //         </div>
// // // //       </div>
// // // //       <p className="mt-10 text-xl text-gray-300 text-center">
// // // //         Your Karma Points: <span className="font-bold text-indigo-400">{user?.karma_points || 0}</span>
// // // //       </p>
// // // //     </AuthLayout>
// // // //   );
// // // // };

// // // // export default DashboardPage;
// // // // client/src/pages/DashboardPage.jsx
// // // import React from 'react';
// // // import { Link } from 'react-router-dom';
// // // import { useAuth } from '../context/AuthContext';
// // // import AuthLayout from '../layouts/AuthLayout';

// // // import {
// // //   DocumentMagnifyingGlassIcon,
// // //   PlusCircleIcon,
// // //   ListBulletIcon,
// // // } from '@heroicons/react/24/outline';

// // // const DashboardPage = () => {
// // //   const { user } = useAuth();

// // //   return (
// // //     <AuthLayout>
// // //       {/* Heading */}
// // //       <h1 className="text-4xl font-bold text-white mb-4 text-center shining-text drop-shadow-lg">
// // //         Welcome, <span className="text-indigo-400">{user?.name?.split(' ')[0] || 'User'}</span>! 👋
// // //       </h1>

// // //       <p className="text-lg text-gray-300 mb-10 text-center max-w-5xl mx-auto opacity-90">
// // //         Manage your lost & found reports and track your helpful contributions.
// // //       </p>

// // //       {/* Cards */}
// // //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl mx-auto">

// // //         {/* LOST ITEM CARD */}
// // //         <div className="
// // //           bg-white/10 border border-blue-500/30 backdrop-blur-xl
// // //           rounded-2xl shadow-[0_0_25px_rgba(59,130,246,0.25)]
// // //           p-6 text-center transition transform hover:-translate-y-2 hover:shadow-[0_0_35px_rgba(59,130,246,0.5)]
// // //         ">
// // //           <DocumentMagnifyingGlassIcon className="h-14 w-14 text-blue-400 mx-auto mb-4 drop-shadow-md" />

// // //           <h2 className="text-2xl font-semibold text-blue-300 mb-2">
// // //             Report Lost Item
// // //           </h2>

// // //           <p className="text-gray-300 mb-4 opacity-90">
// // //             Tell us what you’ve lost — AI will assist in finding it.
// // //           </p>

// // //           <Link
// // //             to="/report-item?type=LOST"
// // //             className="
// // //               mt-3 inline-flex items-center justify-center
// // //               bg-blue-600 hover:bg-blue-700
// // //               text-white px-5 py-2.5 rounded-xl font-medium
// // //               shadow-md hover:shadow-lg transition
// // //             "
// // //           >
// // //             <PlusCircleIcon className="h-5 w-5 mr-2" />
// // //             Report Lost
// // //           </Link>
// // //         </div>

// // //         {/* FOUND ITEM CARD */}
// // //         <div className="
// // //           bg-white/10 border border-green-500/30 backdrop-blur-xl
// // //           rounded-2xl shadow-[0_0_25px_rgba(34,197,94,0.25)]
// // //           p-6 text-center transition transform hover:-translate-y-2 hover:shadow-[0_0_35px_rgba(34,197,94,0.5)]
// // //         ">
// // //           <PlusCircleIcon className="h-14 w-14 text-green-400 mx-auto mb-4 drop-shadow-md" />

// // //           <h2 className="text-2xl font-semibold text-green-300 mb-2">
// // //             Report Found Item
// // //           </h2>

// // //           <p className="text-gray-300 mb-4 opacity-90">
// // //             Upload details of the item you found and help someone.
// // //           </p>

// // //           <Link
// // //             to="/report-item?type=FOUND"
// // //             className="
// // //               mt-3 inline-flex items-center justify-center
// // //               bg-green-600 hover:bg-green-700
// // //               text-white px-5 py-2.5 rounded-xl font-medium
// // //               shadow-md hover:shadow-lg transition
// // //             "
// // //           >
// // //             <PlusCircleIcon className="h-5 w-5 mr-2" />
// // //             Report Found
// // //           </Link>
// // //         </div>

// // //         {/* MY ITEMS CARD */}
// // //         <div className="
// // //           bg-white/10 border border-yellow-500/30 backdrop-blur-xl
// // //           rounded-2xl shadow-[0_0_25px_rgba(234,179,8,0.25)]
// // //           p-6 text-center transition transform hover:-translate-y-2 hover:shadow-[0_0_35px_rgba(234,179,8,0.5)]
// // //         ">
// // //           <ListBulletIcon className="h-14 w-14 text-yellow-400 mx-auto mb-4 drop-shadow-md" />

// // //           <h2 className="text-2xl font-semibold text-yellow-300 mb-2">
// // //             My Items
// // //           </h2>

// // //           <p className="text-gray-300 mb-4 opacity-90">
// // //             View and manage all your lost or found reports.
// // //           </p>

// // //           <Link
// // //             to="/my-items"
// // //             className="
// // //               mt-3 inline-flex items-center justify-center
// // //               bg-yellow-600 hover:bg-yellow-700
// // //               text-white px-5 py-2.5 rounded-xl font-medium
// // //               shadow-md hover:shadow-lg transition
// // //             "
// // //           >
// // //             <ListBulletIcon className="h-5 w-5 mr-2" />
// // //             View Items
// // //           </Link>
// // //         </div>
// // //       </div>

// // //       {/* Karma Points */}
// // //       <p className="mt-12 text-xl text-gray-200 text-center">
// // //         Your Karma Points:{' '}
// // //         <span className="font-bold text-indigo-400">
// // //           {user?.karma_points || 0}
// // //         </span>
// // //       </p>
// // //     </AuthLayout>
// // //   );
// // // };

// // // export default DashboardPage;

// // // client/src/pages/DashboardPage.jsx

// // import React from "react";
// // import { Link } from "react-router-dom";
// // import { useAuth } from "../context/AuthContext";
// // import AuthLayout from "../layouts/AuthLayout";

// // import {
// //   DocumentMagnifyingGlassIcon,
// //   PlusCircleIcon,
// //   ListBulletIcon,
// // } from "@heroicons/react/24/outline";

// // const DashboardPage = () => {
// //   const { user } = useAuth();

// //   return (
// //     <AuthLayout>
// //       {/* Full-Width Premium Wrapper */}
// //       <div className="w-full px-4 md:px-10 lg:px-20 py-10">

// //         {/* Title */}
// //         <h1
// //           className="text-4xl md:text-5xl font-extrabold text-center text-white mb-4 
// //           shining-text drop-shadow-2xl animate-fadeIn"
// //         >
// //           Welcome,{" "}
// //           <span className="text-indigo-400">
// //             {user?.name?.split(" ")[0] || "User"}
// //           </span>
// //           👋
// //         </h1>

// //         <p className="text-lg text-gray-300 text-center mb-12 max-w-4xl mx-auto opacity-90 animate-fadeInSlow">
// //           Manage your lost & found reports — your contribution makes a
// //           difference 💙
// //         </p>

// //         {/* Cards Grid */}
// //         <div
// //           className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10
// //           animate-slideUp"
// //         >
// //           {/* LOST ITEM */}
// //           <GlassCard
// //             color="blue"
// //             title="Report Lost Item"
// //             desc="Tell us what you’ve lost — AI will assist in finding it."
// //             link="/report-item?type=LOST"
// //             Icon={DocumentMagnifyingGlassIcon}
// //             button="Report Lost"
// //           />

// //           {/* FOUND ITEM */}
// //           <GlassCard
// //             color="green"
// //             title="Report Found Item"
// //             desc="Upload details of the item you found and help someone."
// //             link="/report-item?type=FOUND"
// //             Icon={PlusCircleIcon}
// //             button="Report Found"
// //           />

// //           {/* MY ITEMS */}
// //           <GlassCard
// //             color="yellow"
// //             title="My Items"
// //             desc="View and manage all items you reported."
// //             link="/my-items"
// //             Icon={ListBulletIcon}
// //             button="View Items"
// //           />
// //         </div>

// //         {/* Karma Points */}
// //         <p className="mt-16 text-xl text-gray-200 text-center animate-fadeInSlow">
// //           Your Karma Points:{" "}
// //           <span className="font-bold text-indigo-400 text-2xl">
// //             {user?.karma_points || 0}
// //           </span>
// //         </p>
// //       </div>
// //     </AuthLayout>
// //   );
// // };

// // export default DashboardPage;

// // /* ---------------------- Reusable Premium Card Component ---------------------- */
// // const GlassCard = ({ color, title, desc, Icon, link, button }) => {
// //   const colors = {
// //     blue: "border-blue-400/40 shadow-[0_0_30px_rgba(59,130,246,0.35)] hover:shadow-[0_0_55px_rgba(59,130,246,0.6)]",
// //     green:
// //       "border-green-400/40 shadow-[0_0_30px_rgba(34,197,94,0.35)] hover:shadow-[0_0_55px_rgba(34,197,94,0.6)]",
// //     yellow:
// //       "border-yellow-400/40 shadow-[0_0_30px_rgba(234,179,8,0.35)] hover:shadow-[0_0_55px_rgba(234,179,8,0.6)]",
// //   };

// //   const bg = {
// //     blue: "bg-blue-500 hover:bg-blue-600",
// //     green: "bg-green-500 hover:bg-green-600",
// //     yellow: "bg-yellow-500 hover:bg-yellow-600",
// //   };

// //   return (
// //     <div
// //       className={`
// //         w-full h-full p-8 rounded-3xl 
// //         bg-white/10 backdrop-blur-2xl 
// //         border ${colors[color]} 
// //         transition duration-500 transform hover:-translate-y-3
// //         hover:scale-[1.03] animate-grandEnter 
// //       `}
// //     >
// //       <Icon className="h-16 w-16 mx-auto mb-5 text-white drop-shadow-xl" />

// //       <h2
// //         className={`text-2xl font-semibold text-${color}-300 text-center mb-3`}
// //       >
// //         {title}
// //       </h2>

// //       <p className="text-gray-300 mb-6 text-center opacity-85">{desc}</p>

// //       <Link
// //         to={link}
// //         className={`
// //           ${bg[color]} text-white 
// //           w-full py-2.5 rounded-xl block text-center font-medium
// //           shadow-lg hover:shadow-xl transition
// //         `}
// //       >
// //         {button}
// //       </Link>
// //     </div>
// //   );
// // };

// // client/src/pages/DashboardPage.jsx
// import React from "react";
// import { Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// import {
//   DocumentMagnifyingGlassIcon,
//   PlusCircleIcon,
//   ListBulletIcon,
// } from "@heroicons/react/24/outline";

// const DashboardPage = () => {
//   const { user } = useAuth();

//   return (
//     <div className="relative min-h-[calc(100vh-64px)] bg-gray-900 overflow-hidden flex flex-col items-center justify-center p-4">
//       {/* Background Grid Animation (Applied directly here) */}
//       <div className="absolute inset-0 z-0 opacity-10 grid-animation-bg"></div>

//       {/* Main Dashboard Content Wrapper (Glassmorphism Card) */}
//       <div className="relative z-10 w-full max-w-5xl bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm border border-gray-700 border-opacity-30 rounded-3xl shadow-2xl p-6 md:p-10 lg:p-12 text-white flex flex-col items-center">

//         {/* Title */}
//         <h1
//           className="text-4xl md:text-5xl font-extrabold text-center text-white mb-4
//           shining-text drop-shadow-2xl animate-fadeIn"
//         >
//           Welcome,{" "}
//           <span className="text-indigo-400">
//             {user?.name?.split(" ")[0] || "User"}
//           </span>
//           👋
//         </h1>

//         <p className="text-lg text-gray-300 text-center mb-12 max-w-4xl mx-auto opacity-90 animate-fadeInSlow">
//           Manage your lost & found reports — your contribution makes a
//           difference 💙
//         </p>

//         {/* Cards Grid */}
//         <div
//           className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8
//           animate-slideUp"
//         >
//           {/* LOST ITEM */}
//           <GlassCard
//             color="blue"
//             title="Report Lost Item"
//             desc="Tell us what you’ve lost — AI will assist in finding it."
//             link="/report-item?type=LOST"
//             Icon={DocumentMagnifyingGlassIcon}
//             button="Report Lost"
//           />

//           {/* FOUND ITEM */}
//           <GlassCard
//             color="green"
//             title="Report Found Item"
//             desc="Upload details of the item you found and help someone."
//             link="/report-item?type=FOUND"
//             Icon={PlusCircleIcon}
//             button="Report Found"
//           />

//           {/* MY ITEMS */}
//           <GlassCard
//             color="yellow"
//             title="My Items"
//             desc="View and manage all items you reported."
//             link="/my-items"
//             Icon={ListBulletIcon}
//             button="View Items"
//           />
//         </div>

//         {/* Karma Points */}
//         <p className="mt-16 text-xl text-gray-200 text-center animate-fadeInSlow">
//           Your Karma Points:{" "}
//           <span className="font-bold text-indigo-400 text-2xl">
//             {user?.karma_points || 0}
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default DashboardPage;

// /* ---------------------- Reusable Premium Card Component ---------------------- */
// const GlassCard = ({ color, title, desc, Icon, link, button }) => {
//   const colors = {
//     blue: "border-blue-400/40 shadow-[0_0_30px_rgba(59,130,246,0.35)] hover:shadow-[0_0_55px_rgba(59,130,246,0.6)]",
//     green:
//       "border-green-400/40 shadow-[0_0_30px_rgba(34,197,94,0.35)] hover:shadow-[0_0_55px_rgba(34,197,94,0.6)]",
//     yellow:
//       "border-yellow-400/40 shadow-[0_0_30px_rgba(234,179,8,0.35)] hover:shadow-[0_0_55px_rgba(234,179,8,0.6)]",
//   };

//   const bg = {
//     blue: "bg-blue-600 hover:bg-blue-700", // Adjusted to match screenshot button colors
//     green: "bg-green-600 hover:bg-green-700", // Adjusted
//     yellow: "bg-yellow-600 hover:bg-yellow-700", // Adjusted
//   };

//   // Tailwind class for the icon color
//   const iconColor = {
//       blue: "text-blue-400",
//       green: "text-green-400",
//       yellow: "text-yellow-400",
//   };

//   // Tailwind class for the text color of the card heading
//   const headingColor = {
//       blue: "text-blue-300",
//       green: "text-green-300",
//       yellow: "text-yellow-300",
//   };

//   return (
//     <div
//       className={`
//         w-full h-full p-8 rounded-3xl
//         bg-white/10 backdrop-blur-2xl
//         border ${colors[color]}
//         transition duration-500 transform hover:-translate-y-3
//         hover:scale-[1.03] animate-grandEnter
//         flex flex-col items-center justify-between {/* Added for internal layout */}
//       `}
//     >
//       <Icon className={`h-16 w-16 mx-auto mb-5 ${iconColor[color]} drop-shadow-xl`} />

//       <h2
//         className={`text-2xl font-semibold ${headingColor[color]} text-center mb-3`}
//       >
//         {title}
//       </h2>

//       <p className="text-gray-300 mb-6 text-center opacity-85 flex-grow">{desc}</p> {/* flex-grow for desc */}

//       <Link
//         to={link}
//         className={`
//           ${bg[color]} text-white
//           w-full py-2.5 rounded-xl block text-center font-medium
//           shadow-lg hover:shadow-xl transition inline-flex items-center justify-center {/* Added for icon alignment */}
//         `}
//       >
//         {/* Using Icon component for button text too, as per screenshot */}
//         {color === 'blue' && <DocumentMagnifyingGlassIcon className="h-5 w-5 mr-2" />}
//         {color === 'green' && <PlusCircleIcon className="h-5 w-5 mr-2" />}
//         {color === 'yellow' && <ListBulletIcon className="h-5 w-5 mr-2" />}
//         {button}
//       </Link>
//     </div>
//   );
// };
// client/src/pages/DashboardPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  DocumentMagnifyingGlassIcon,
  PlusCircleIcon,
  ListBulletIcon,
} from "@heroicons/react/24/outline";

// Reusing the floating animation styles for consistency
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

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <div className="relative min-h-[calc(100vh-64px)] w-full bg-[#0a0a12] text-white overflow-hidden font-sans flex flex-col items-center justify-center p-4  pt-[90px]">
      <style>{customStyles}</style>

      {/* --- Background Elements (Unified with ItemList) --- */}
      <div className="fixed inset-0 w-full h-full pointer-events-none">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-20 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      </div>

      {/* --- Main Glass Container --- */}
      <div className="relative z-10 w-full max-w-6xl bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl shadow-black/50 p-6 md:p-12 flex flex-col items-center overflow-hidden">
        
        {/* Decorative Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50 blur-sm"></div>

        {/* Header Section */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-4">
            <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">User Dashboard</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white">
            Welcome back,{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 animate-gradient">
              {user?.name?.split(" ")[0] || "Explorer"}
            </span>
          </h1>
          
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Manage your contributions to the community. Every item reported brings us closer to a connected campus.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          
          {/* LOST ITEM (Purple/Pink Theme) */}
          <GlassCard
            variant="lost"
            title="Report Lost Item"
            desc="Missing something? Let our AI-powered matching system help you find it."
            link="/report-item?type=LOST"
            Icon={DocumentMagnifyingGlassIcon}
            buttonText="Report Lost"
          />

          {/* FOUND ITEM (Cyan/Blue Theme) */}
          <GlassCard
            variant="found"
            title="Report Found Item"
            desc="Found something? Be a hero and help return it to its rightful owner."
            link="/report-item?type=FOUND"
            Icon={PlusCircleIcon}
            buttonText="Report Found"
          />

          {/* MY ITEMS (Amber/Gold Theme) */}
          <GlassCard
            variant="manage"
            title="My Activity"
            desc="Track the status of your reported items and manage your history."
            link="/my-items"
            Icon={ListBulletIcon}
            buttonText="View History"
          />
        </div>

        {/* Karma Points HUD */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative px-8 py-4 bg-[#0f0f16] ring-1 ring-white/10 rounded-xl flex items-center gap-4">
            <div className="flex flex-col text-right">
              <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Karma Points</span>
              <span className="text-xs text-gray-600">Community Score</span>
            </div>
            <div className="h-10 w-px bg-white/10"></div>
            <span className="text-4xl font-black text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
              {user?.karma_points || 0}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardPage;

/* ---------------------- Premium Glass Card Component ---------------------- */
const GlassCard = ({ variant, title, desc, Icon, link, buttonText }) => {
  
  // Config based on variant
  const styles = {
    lost: {
      border: "hover:border-purple-500/50",
      glow: "hover:shadow-[0_0_50px_-10px_rgba(168,85,247,0.4)]",
      iconBg: "bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20 group-hover:text-purple-300",
      btn: "from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-purple-500/25",
      title: "group-hover:text-purple-300"
    },
    found: {
      border: "hover:border-cyan-500/50",
      glow: "hover:shadow-[0_0_50px_-10px_rgba(6,182,212,0.4)]",
      iconBg: "bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20 group-hover:text-cyan-300",
      btn: "from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-cyan-500/25",
      title: "group-hover:text-cyan-300"
    },
    manage: {
      border: "hover:border-amber-500/50",
      glow: "hover:shadow-[0_0_50px_-10px_rgba(245,158,11,0.4)]",
      iconBg: "bg-amber-500/10 text-amber-400 group-hover:bg-amber-500/20 group-hover:text-amber-300",
      btn: "from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 shadow-amber-500/25",
      title: "group-hover:text-amber-300"
    }
  };

  const theme = styles[variant];

  return (
    <div
      className={`
        group relative flex flex-col h-full p-8
        bg-[#13131f]/60 backdrop-blur-xl
        border border-white/5 rounded-3xl
        transition-all duration-500 ease-out
        hover:-translate-y-2 ${theme.border} ${theme.glow}
      `}
    >
      {/* Icon Bubble */}
      <div className={`w-16 h-16 rounded-2xl ${theme.iconBg} flex items-center justify-center mb-6 transition-colors duration-300`}>
        <Icon className="h-8 w-8" />
      </div>

      {/* Content */}
      <h2 className={`text-2xl font-bold text-white mb-3 transition-colors duration-300 ${theme.title}`}>
        {title}
      </h2>
      <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-grow">
        {desc}
      </p>

      {/* Gradient Button */}
      <Link
        to={link}
        className={`
          w-full py-4 rounded-xl
          bg-gradient-to-r ${theme.btn}
          text-white font-bold text-sm tracking-wide uppercase
          shadow-lg transition-all duration-300
          flex items-center justify-center gap-2
          transform group-hover:scale-[1.02]
        `}
      >
        <span>{buttonText}</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
      </Link>
    </div>
  );
};
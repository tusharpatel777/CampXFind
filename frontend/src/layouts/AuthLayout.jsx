// // client/src/layouts/AuthLayout.jsx
// import React from 'react';

// const AuthLayout = ({ children }) => {
//   return (
//     <div className="relative min-h-screen bg-gray-900 overflow-hidden flex items-center justify-center p-4">
//       {/* Background Grid Animation (Reused from HomePage) */}
//       <div className="absolute inset-0 z-0 opacity-20 grid-animation-bg"></div>

//       {/* Card Container for Auth Forms */}
//       <div className="relative z-10 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border border-gray-700 border-opacity-30 rounded-xl shadow-2xl p-8 w-full max-w-md text-white">
//         {children}
//       </div>
//     </div>
//   );
// };

// export default AuthLayout;
// client/src/layouts/AuthLayout.jsx
import React from 'react';

const AuthLayout = ({ children, applyGlassmorphismCard = true }) => { // Added a prop
  return (
    <div className="relative min-h-screen bg-gray-900 overflow-hidden flex items-center justify-center p-4">
      {/* Background Grid Animation */}
      <div className="absolute inset-0 z-0 opacity-20 grid-animation-bg"></div>

      {/* Conditional Card Container */}
      {applyGlassmorphismCard ? (
        <div className="relative z-10 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border border-gray-700 border-opacity-30 rounded-xl shadow-2xl p-8 w-full max-w-md text-white">
          {children}
        </div>
      ) : (
        <div className="relative z-10 w-full max-w-4xl text-white"> {/* No outer card, allow children to define layout */}
          {children}
        </div>
      )}
    </div>
  );
};

export default AuthLayout;
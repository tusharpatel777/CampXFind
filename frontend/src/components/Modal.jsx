// // client/src/components/Modal.jsx
// import React from 'react';
// import { createPortal } from 'react-dom';

// const Modal = ({ isOpen, onClose, title, children }) => {
//   if (!isOpen) return null;

//   return createPortal(
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
//       <div className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden">
//         <div className="flex justify-between items-center border-b p-4">
//           <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
//           >
//             &times;
//           </button>
//         </div>
//         <div className="p-4">
//           {children}
//         </div>
//       </div>
//     </div>,
//     document.getElementById('modal-root') // This needs to exist in public/index.html
//   );
// };

// export default Modal;
// client/src/components/Modal.jsx
import React from "react";
import { createPortal } from "react-dom";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center 
        bg-black/70 backdrop-blur-sm p-4 animate-fadeIn">
      
      {/* MODAL BOX */}
      <div
        className="relative w-full max-w-lg rounded-2xl 
        bg-black/40 backdrop-blur-xl 
        border border-blue-500/40 shadow-[0_0_30px_5px_rgba(0,150,255,0.3)]
        text-white p-6 animate-scaleIn"
      >
        {/* HEADER */}
        <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-4">
          <h2 className="text-2xl font-semibold tracking-wide">{title}</h2>

          <button
            onClick={onClose}
            className="text-white/70 hover:text-white hover:scale-110 
            transition-transform text-2xl font-bold"
          >
            ✕
          </button>
        </div>

        {/* CONTENT */}
        <div className="text-gray-200">{children}</div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;

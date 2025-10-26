
// LogoutModal.jsx
import React from "react";
import { X, LogOut } from "lucide-react";

const LogoutModal = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl shadow-xl w-[400px] p-6 relative animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Icon & Heading */}
        <div className="flex flex-col items-center gap-4 text-center">
          <LogOut size={40} className="text-red-500" />
          <h2 className="text-xl font-semibold text-gray-800">
            Are you sure you want to logout?
          </h2>
          <p className="text-gray-500 text-sm">
            You will need to login again to access your account.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;

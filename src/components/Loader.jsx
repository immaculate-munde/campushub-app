// src/components/Loader.jsx
import React from "react";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* App logo or initials */}
      <div className="flex items-center justify-center mb-6">
        <div className="w-20 h-20 bg-blue-600 text-white flex items-center justify-center rounded-2xl text-3xl font-bold shadow-lg animate-bounce">
          <img 
            src="/logo.png" 
            alt="CampusHub Logo" 
            className="w-20 h-20 animate-bounce"
          />

        </div>
      </div>

      {/* Loading text */}
      <p className="text-xl font-semibold text-gray-700 animate-pulse">
        Loading CampusHub...
      </p>

      {/* Spinner ring */}
      <div className="mt-6 h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;

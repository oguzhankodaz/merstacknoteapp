/** @format */

import React from "react";

const RateLimited = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white px-4">
      <div className="bg-gray-800 border border-pink-500 rounded-2xl shadow-xl max-w-md w-full p-8 text-center space-y-4">
        <h1 className="text-3xl font-bold text-pink-500">Too Many Requests</h1>
        <p className="text-gray-300">
          You have sent too many requests in a short period of time.
        </p>
        <p className="text-gray-400 text-sm">
          Please wait a few minutes before trying again.
        </p>
        <div className="mt-4">
          <h1
            
            className="px-4 py-2 bg-pink-600 hover:bg-pink-700 rounded-xl transition-all font-semibold"
          >
            Daha sonra tekrar deneyin
          </h1>
        </div>
      </div>
    </div>
  );
};

export default RateLimited;

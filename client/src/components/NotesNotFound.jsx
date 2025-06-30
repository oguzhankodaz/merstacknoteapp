/** @format */

import React from "react";
import { Link } from "react-router";

const NotesNotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br text-white px-4">
      <div className="bg-gray-800 border border-pink-500 rounded-2xl shadow-xl max-w-md w-full p-8 text-center space-y-4">
        <h1 className="text-5xl font-bold text-pink-500">
          There are no notes.
        </h1>
        <p className="text-gray-300 text-2xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
          asperiores fuga ipsum molestias, autem vero commodi provident nulla
          ratione sequi.
        </p>
        <p className="text-gray-400 text-xl">
          Lorem ipsum dolor sit amet consectetur.
        </p>
        <div className="mt-4">
          <Link
            className="inline-flex items-center bg-pink-500 text-white font-bold text-3xl px-6 py-3 rounded-xl transition-all hover:bg-pink-600"
            to={"/create"}
          >
            Create a new note
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotesNotFound;

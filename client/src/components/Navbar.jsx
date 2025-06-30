/** @format */

import React from "react";
import { Link } from "react-router";
import { PlusIcon } from "lucide-react";

const Navbar = () => {
  return (
    <div className="w-full px-6 py-4 bg-gray-900 rounded-2xl border-purple-400 border text-white shadow-md">
      <div className="flex max-w-5xl mx-auto items-center justify-between">
        <Link
          to="/"
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
        >
          Note App
        </Link>
        <Link
          to={"/create"}
          className=" flex items-center justify-between gap-2 border border-white p-2 rounded-xl hover:bg-purple-600 hover:text-white transition"
        >
          <PlusIcon className="size-5"></PlusIcon>
          Create Note
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

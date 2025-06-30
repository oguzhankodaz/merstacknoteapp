/** @format */

import axios from "axios";
import { ArrowLeftIcon, Backpack, SkipBack } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("Bütün alanları doldur");
      return;
    }
    setLoading(true);
    try {
      await axios.post("http://localhost:5001/api/notes", {
        title,
        content,
      });
      setTitle("");
      setContent("");
      toast.success("Succesful");
      // navigate("/");
    } catch (error) {
      toast.error("Bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-t from-gray-900 via-gray-800 to-gray-700 text-white px-4 py-10">
      <div className="max-w-2xl mx-auto">
        {/* Geri Dön Linki */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-white font-medium mb-6 transition-all hover:text-pink-400"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Back to Notes
        </Link>

        {/* Not Oluşturma Formu */}
        <div className="bg-gray-100 text-gray-900 rounded-2xl shadow-lg border border-pink-400 p-8">
          <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-pink-500 bg-clip-text text-transparent">
            Create a New Note
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Input */}
            <div>
              <label className="block text-sm font-semibold mb-1">Title</label>
              <input
                type="text"
                placeholder="Enter note title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            {/* Content Textarea */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Content
              </label>
              <textarea
                placeholder="Write your note here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-40 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white font-bold py-2 px-4 rounded-md transition-all ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-pink-500 hover:bg-pink-600"
              }`}
            >
              {loading ? "Creating..." : "Save Note"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;

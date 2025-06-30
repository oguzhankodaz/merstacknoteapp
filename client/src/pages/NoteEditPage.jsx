/** @format */

import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon } from "lucide-react";

const NoteEditPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      const res = await axios.get(`http://localhost:5001/api/notes/${id}`);
      setNote(res.data);

      try {
      } catch (error) {
        toast.error("failed to fetch");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("please add a title or content");
      return;
    }
    setSaving(true);

    try {
      const res = await axios.put(`http://localhost:5001/api/notes/${id}`, {
        title: note.title,
        content: note.content,
      });

      toast.success("note was recorded.");
    } catch (error) {
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10"></LoaderIcon>
      </div>
    );
  }

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
                value={note.title}
                onChange={(e) => setNote({ ...note, title: e.target.value })}
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
                value={note.content}
                onChange={(e) => setNote({ ...note, content: e.target.value })}
                className="w-full h-40 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={saving}
              className={`w-full text-white font-bold py-2 px-4 rounded-md transition-all ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-pink-500 hover:bg-pink-600"
              }`}
            >
              {saving ? "Saving..." : "Save Note"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NoteEditPage;

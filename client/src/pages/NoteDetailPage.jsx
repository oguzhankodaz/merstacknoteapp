/** @format */

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon } from "lucide-react";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        toast.error("Failed to fetch note");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  if (!note) {
    return <div className="text-center mt-10 text-white">Note not found.</div>;
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

        {/* Note Detay Kartı */}
        <div className="bg-gray-100 text-gray-900 rounded-2xl shadow-lg border border-pink-400 p-8">
          <h2 className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 to-pink-500 bg-clip-text text-transparent">
            {note.title}
          </h2>
          <p className="whitespace-pre-line text-gray-800 text-lg leading-relaxed">
            {note.content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;

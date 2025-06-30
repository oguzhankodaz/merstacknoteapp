import { PenSquareIcon, Trash2Icon } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router";
import { formattedDate } from "../lib/utils";
import axios from "axios";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const navigate = useNavigate();

  const handleDelete = async (e, id) => {
    e.stopPropagation(); // Kart yönlendirmesini engelle
    try {
      await axios.delete(`http://localhost:5001/api/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));
      toast.success("Note deleted successfully");
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const handleEdit = (e, id) => {
    e.stopPropagation(); // Kart yönlendirmesini engelle
    navigate(`/note/${id}`);
  };

  const handleViewDetail = () => {
    navigate(`/note/${note._id}/detail`);
  };

  return (
    <div
      onClick={handleViewDetail}
      className="bg-white shadow-md rounded-xl p-5 border border-gray-200 hover:shadow-lg transition-all cursor-pointer"
    >
      <h2 className="text-xl font-bold text-blue-700 mb-2 truncate whitespace-nowrap overflow-hidden">
        {note.title}
      </h2>

      <p className="text-gray-700 mb-4 break-words line-clamp-4">
        {note.content}
      </p>

      <div className="text-sm text-gray-500">
        Created on: {formattedDate(note.createdAt)}
      </div>

      <div className="text-black flex items-center justify-end p-2 gap-2">
        <button onClick={(e) => handleEdit(e, note._id)}>
          <PenSquareIcon className="cursor-pointer" />
        </button>
        <button onClick={(e) => handleDelete(e, note._id)}>
          <Trash2Icon className="text-red-700 cursor-pointer" />
        </button>
      </div>
    </div>
  );
};

export default NoteCard;

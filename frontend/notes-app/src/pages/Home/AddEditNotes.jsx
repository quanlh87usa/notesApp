import React, { useState } from "react";
import TagInput from "../../components/Input/TagInput";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosinstance";

const AddEditNotes = ({ noteData, type, onClose, getNotesInfo, showToastMessage }) => {
  const [title, setTitle] = useState(noteData?.title || "")
  const [content, setContent] = useState(noteData?.content || "")
  const [tags, setTags] = useState(noteData?.tags || [])
  const [error, setError] = useState(null)

  // Add note
  const onAddNote = async () => {
    try {
      const response = await axiosInstance.post("/add-note", {
        title,
        content,
        tags,
      });
      // handle successful add note response
      if (response.data && response.data.note) {
        showToastMessage("Note Added successful","add")
        getNotesInfo()
        onClose()
      }
      
    } catch (error) {
      // handle register error
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  // Edit note
  const onEditNote = async () => {
    const noteId = noteData._id
    try {
      const response = await axiosInstance.put("/edit-note/" + noteId, {
        title,
        content,
        tags,
      });
      // handle successful edit note response
      if (response.data && response.data.note) {
        showToastMessage("Note updated successful","edit")
        getNotesInfo()
        onClose()
      }
      
    } catch (error) {
      // handle edit note error
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleAddNote = () => {
    if (!title) {
      setError("Please enter the title");
      return;
    }
    if (!content) {
      setError("Please enter the content");
      return;
    }
    setError("");

    // CALL API add note
    if (type === "edit") {
      onEditNote();
    } else {
      onAddNote();
    }
  };
  return (
    <div className="relative">
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute top-2 right-2 hover:bg-slate-500"
        onClick={onClose}
      >
        <MdClose className="text-xl text-slate-400" />
      </button>
      <div className="flex flex-col gap-2">
        <label className="input-label">TITLE</label>
        <input
          type="text"
          className="text-2xl text-slate-950 outline-none"
          placeholder="Go to Gym At 10th"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">CONTENT</label>
        <textarea
          typeof="text"
          className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
          placeholder="content"
          rows={10}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </div>

      <div className="mt-3">
        <label className="input-label">TAGS</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>
      {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
      <button
        className="w-full bg-blue-400 hover:bg-blue-500 font-medium mt-5 p-3"
        onClick={handleAddNote}
      >
        {type === 'edit' ? 'UPDATE': 'ADD'}
      </button>
    </div>
  );
};

export default AddEditNotes;

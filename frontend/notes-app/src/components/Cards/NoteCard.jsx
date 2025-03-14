import React, { useContext } from "react";
import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md";
import { ThemeContext } from "../ThemeContext/ThemeContext";

const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  const themeContext = useContext(ThemeContext);
  return (
    <div className={`${themeContext.theme === "darkTheme" ? "bg-gray-500 text-white" : "bg-gray-200 text-black"} border rounded hover:shadow-xl transition-all ease-in-out`}>
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-sm font-medium">Title: {title}</h6>
          <span className="text-xs">Add Date: {date}</span>
        </div>
        <MdOutlinePushPin
          className={`icon-btn ${
            isPinned ? "text-blue-600" : "text-slate-300"
          }`}
          onClick={onPinNote}
        />
      </div>
      <p className="text-xs mt-2">
        Content: {content?.slice(0, 60)}
      </p>

      <div className="fex items-center justify-between mt-2">
        <div className="text-xs flex-nowrap">
          Tags:
          {tags}
        </div>
        <div className="flex items-center gap-2">
          <MdCreate
            className="icon-btn hover:text-green-600"
            onClick={onEdit}
          />
          <MdDelete
            className="icon-btn hover:text-red-500"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;

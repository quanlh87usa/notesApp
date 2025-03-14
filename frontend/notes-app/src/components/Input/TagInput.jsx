import React, { useEffect, useState } from "react"
import { MdAdd, MdClose } from "react-icons/md"

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddNewTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, " #" + inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddNewTag();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    if (inputValue.trim() !== "") {
      setTags(tags.filter((tag) => tag !== tagToRemove));
    }
  }
  
  return (
    <div>
      {tags?.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mt-2">
          {tags.map((item, index) => (
            
              <span key={index} className="flex flex-wrap items-center gap-2 text-sm text-slate-900 bg-slate-100 px-3 py-1 rounded">
                {item}
                <button
                  onClick={() => {
                    handleRemoveTag(item);
                  }}
                >
                  <MdClose />
                </button>
              </span>
          ))}
        </div>
      )}
      <div className="flex items-center gap-4 mt-3">
        <input
          type="text"
          className="text-sm bg-transparent border px-3 py-2 rounded outline-none"
          placeholder="Add tags"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button
          className="w-8 h-8 flex items-center justify-center rounded border 
                border-blue-500 hover:bg-blue-600"
          onClick={() => {
            handleAddNewTag();
          }}
        >
          <MdAdd className="text-2xl text-blue-700 hover:text-white" />
        </button>
      </div>
    </div>
  )
}

export default TagInput;

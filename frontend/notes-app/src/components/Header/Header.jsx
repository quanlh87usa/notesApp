import React, { useContext, useState } from "react";
import Profile from "../Cards/Profile";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { ThemeContext } from "../ThemeContext/ThemeContext";

const Header = ({ userInfo, onSearchNote, handleClearSearch }) => {
  const themeContext = useContext(ThemeContext);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  };

  const onChangeTheme = () => {
    themeContext.toggleTheme();
  };

  return (
    <div className={`${themeContext.theme} shadow-xl flex items-center justify-between px-6 py-2 drop-shadow`}>
      <h2 className="text-xl font-black py-2">Notes</h2>
      <SearchBar
        userInfo={userInfo}
        value={searchQuery}
        onChange={({ target }) => {
          setSearchQuery(target.value);
        }}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />
      {userInfo && (
      <label class="inline-flex items-center">
        <input type="checkbox" value="" class="sr-only peer" />
        <div
          class="cursor-pointer bg-white relative w-11 h-6 border 
          peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full 
          after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-600
        after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-black 
        peer-checked:bg-white rounded-full"
          onClick={onChangeTheme}
        ></div>
        <span class={`${themeContext.theme === 'darkTheme' ? "text-white" : "text-black"} ms-3 text-sm font-medium`}>
        {themeContext.theme === 'darkTheme' ? "Dark Theme" : "Light Theme"}
        </span>
      </label>
      )}
      <Profile userInfo={userInfo} onLogout={onLogout} />
    </div>
    
  );
};

export default Header;

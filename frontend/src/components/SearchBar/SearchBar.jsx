import React, { useContext } from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { IoMdClose } from 'react-icons/io'
import { ThemeContext } from '../ThemeContext/ThemeContext'


const SearchBar = ({userInfo, value, onChange, handleSearch, onClearSearch}) => {
  
    const themContext = useContext(ThemeContext)
    return (
    <>
    {userInfo && (
    <div className={`${themContext.theme == "darkTheme" ? "bg-gray-600" : "bg-white "} w-80 border flex items-center px-4 rounded-md`}>
        <input
            type='text'
            placeholder='Search Notes'
            className='w-full text-xs bg-transparent py-[11px] outline-none'
            value={value}
            onChange={onChange}
        />
        {value && (<IoMdClose className={`${themContext.theme == "darkTheme" ? "bg-gray-600 text-white" : "bg-white text-black "}  cursor-pointer`} onClick={onClearSearch} />)}
        <FaMagnifyingGlass className={`${themContext.theme == "darkTheme" ? "bg-gray-600 text-white" : "bg-white text-black "}  cursor-pointer`} onClick={handleSearch} />
    </div>
    )}
    </>
  )
}

export default SearchBar
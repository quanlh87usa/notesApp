import React, { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'
import { ThemeContext } from './components/ThemeContext/ThemeContext'

function App() {
  const themeContext = useContext(ThemeContext);
  return (
    <div className={`${themeContext.theme === "darkTheme" ? "bg-gray-400" : "bg-white"} h-[738px]`}>
      <Router>
        <Routes>
          <Route path='/dashboard' exact element={<Home />} />
          <Route path='/login' exact element={<Login />} />
          <Route path='/' exact element={<Login />} />
          <Route path='/signup' exact element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
import React, { createContext, useState } from 'react'

export const ThemeContext = createContext()

export function ThemeProvider ({ children }) {
    const [theme, setTheme] = useState('lightTheme')

    const toggleTheme = () => {

        console.log("aaaa")
        setTheme(theme === 'darkTheme' ? 'lightTheme' : 'darkTheme')
    }

    const valueTheme = { theme, toggleTheme}

    return (
        <ThemeContext.Provider value={valueTheme}>
            {children}
        </ThemeContext.Provider>
    )
}
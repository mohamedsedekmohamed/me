import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';


export const DarkModeProvider = ({ children }) => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    const [darkMode, setDarkMode] = useState(savedDarkMode);
    const savedLanguage = localStorage.getItem("language") || "en";
    const [language, setLanguage] = useState(savedLanguage);
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('darkMode', darkMode);
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <DarkModeContext.Provider value={{ darkMode, toggleDarkMode, language, setLanguage }}>
            {children}
        </DarkModeContext.Provider>
    );
};
DarkModeProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
  
  export const DarkModeContext = createContext();

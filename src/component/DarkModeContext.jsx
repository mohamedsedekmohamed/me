import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import i18n from '../i18n/i18n.js';

export const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  const savedDarkMode = localStorage.getItem('darkMode') === 'true';
  const [darkMode, setDarkMode] = useState(savedDarkMode);

  const savedLanguage = localStorage.getItem('language') || 'en';
  const [language, setLanguageState] = useState(savedLanguage);

  // sync i18n on mount
  useEffect(() => {
    i18n.changeLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  // setLanguage يغير الـ state والـ i18n معاً
  const setLanguage = (lang) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    i18n.changeLanguage(lang);
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

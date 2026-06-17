import PropTypes from 'prop-types';
import { IoIosSunny } from "react-icons/io";
import { FaMoon } from "react-icons/fa";
import { DarkModeContext } from './DarkModeContext.jsx';
import { useContext, useState, useEffect } from "react";
import { FaHome, FaInfoCircle, FaCode, FaEnvelope } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

function Navbar({ section1Ref, section2Ref, section3Ref, scrollToSection, section4Ref }) {
  const { darkMode, toggleDarkMode, language, setLanguage } = useContext(DarkModeContext);
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  // تتبع الـ scroll لتغيير شكل الـ navbar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const texts = {
    en: { switchLanguage: "AR" },
    ar: { switchLanguage: "EN" },
  };

  const navLinks = [
    { name: t('nav.home'),     icon: <FaHome />,       ref: section1Ref },
    { name: t('nav.about'),    icon: <FaInfoCircle />, ref: section2Ref },
    { name: t('nav.projects'), icon: <FaCode />,       ref: section3Ref },
    { name: t('nav.contact'),  icon: <FaEnvelope />,   ref: section4Ref },
  ];

  const toggleLanguage = () => {
    const newLang = language === "en" ? "ar" : "en";
    setLanguage(newLang);
  };

  const isAr = language === 'ar';

  return (
    <motion.div
      className="fixed w-full top-4 z-50 px-4"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
    >
      <nav className={`max-w-4xl mx-auto flex justify-between items-center rounded-2xl py-3 px-5 
        shadow-2xl transition-all duration-500 border backdrop-blur-xl
        ${scrolled
          ? darkMode
            ? 'bg-black/90 border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
            : 'bg-blue-700/95 border-blue-500/20 shadow-[0_8px_32px_rgba(37,99,235,0.3)]'
          : darkMode
            ? 'bg-black/70 border-white/5'
            : 'bg-blue-600/85 border-blue-400/20'
        }`}
      >

        {/* Language toggle */}
        <motion.button
          onClick={toggleLanguage}
          className={`w-10 h-10 flex items-center justify-center rounded-full font-black text-xs
            transition-colors duration-300 shadow-lg select-none
            ${darkMode ? 'bg-white text-black hover:bg-blue-100' : 'bg-white text-blue-700 hover:bg-blue-50'}`}
          whileHover={{ scale: 1.1, rotate: 10 }}
          whileTap={{ scale: 0.88 }}
          style={{ fontFamily: "'Cairo', 'Inter', sans-serif" }}
        >
          {texts[language].switchLanguage}
        </motion.button>

        {/* Nav links */}
        <ul
          className="flex items-center gap-1 md:gap-2"
          dir={isAr ? 'rtl' : 'ltr'}
        >
          {navLinks.map((link, index) => (
            <li key={index}>
              <motion.button
                onClick={() => { setActiveIndex(index); scrollToSection(link.ref); }}
                className="relative flex flex-col items-center justify-center px-3 py-2 rounded-xl
                  text-white group overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.93 }}
              >
                {/* Active / hover background pill */}
                {activeIndex === index && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-xl bg-white/20"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}

                {/* Icon (mobile) */}
                <span className="text-lg md:hidden relative z-10 transition-transform group-hover:scale-110">
                  {link.icon}
                </span>

                {/* Text (desktop) */}
                <span
                  className={`hidden md:inline text-sm font-bold relative z-10 transition-opacity
                    ${activeIndex === index ? 'opacity-100' : 'opacity-75 group-hover:opacity-100'}`}
                  style={{ fontFamily: isAr ? "'Cairo', sans-serif" : "'Inter', sans-serif" }}
                >
                  {link.name}
                </span>

                {/* Active dot */}
                {activeIndex === index && (
                  <motion.span
                    layoutId="nav-dot"
                    className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-white"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            </li>
          ))}
        </ul>

        {/* Dark mode toggle */}
        <motion.button
          onClick={toggleDarkMode}
          className={`relative w-10 h-10 rounded-full flex items-center justify-center
            select-none border transition-colors duration-300
            ${darkMode
              ? "bg-zinc-800 border-zinc-700 shadow-[0_4px_0_0_#000]"
              : "bg-blue-700 border-blue-500 shadow-[0_4px_0_0_#1e40af]"
            }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.88, y: 3 }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={darkMode ? "moon" : "sun"}
              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.25 }}
              className="text-white text-lg"
            >
              {darkMode ? <FaMoon className="text-blue-400" /> : <IoIosSunny className="text-yellow-200" />}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </nav>
    </motion.div>
  );
}

Navbar.propTypes = {
  section1Ref: PropTypes.object.isRequired,
  section2Ref: PropTypes.object.isRequired,
  section3Ref: PropTypes.object.isRequired,
  section4Ref: PropTypes.object.isRequired,
  scrollToSection: PropTypes.func.isRequired,
};

export default Navbar;

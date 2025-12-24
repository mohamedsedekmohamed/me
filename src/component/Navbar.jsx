import PropTypes from 'prop-types';
import { IoIosSunny } from "react-icons/io";
import { FaMoon } from "react-icons/fa";
import { DarkModeContext } from './DarkModeContext.jsx';
import { useContext } from "react";
import { FaHome, FaInfoCircle, FaCode, FaEnvelope } from 'react-icons/fa';

function Navbar({ section1Ref, section2Ref, section3Ref, scrollToSection, section4Ref }) {
  const { darkMode, toggleDarkMode, language, setLanguage } = useContext(DarkModeContext);

  const texts = {
    en: {
      home: "Home",
      about: "About",
      content: "Projects",
      contact: "Contact",
      switchLanguage: "AR",
    },
    ar: {
      home: "الرئيسية",
      about: "من أنا",
      content: "المشاريع",
      contact: "التواصل",
      switchLanguage: "EN",
    },
  };

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "ar" : "en";
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  const navLinks = [
    { name: texts[language].home, icon: <FaHome />, ref: section1Ref },
    { name: texts[language].about, icon: <FaInfoCircle />, ref: section2Ref },
    { name: texts[language].content, icon: <FaCode />, ref: section3Ref },
    { name: texts[language].contact, icon: <FaEnvelope />, ref: section4Ref },
  ];

  return (
    <div className="fixed w-full top-4 z-50 px-4">
      <nav 
        // الأنميشن هنا يجعل النافبار ينزلق من الأعلى للأسفل عند تحميل الصفحة
        data-aos="fade-down"
        data-aos-duration="1000"
        className={`max-w-4xl mx-auto flex justify-between items-center rounded-2xl py-3 px-6 shadow-2xl transition-all duration-300 border backdrop-blur-md ${
          darkMode ? 'bg-black/80 border-white/10' : 'bg-blue-600/90 border-blue-400/20'
        }`}
      >
        
        {/* زر اللغة مع أنميشن ظهور من اليسار (أو اليمين حسب اللغة) */}
        <div data-aos="fade-right" data-aos-delay="400">
          <button
            onClick={toggleLanguage}
            className={`w-10 h-10 flex items-center justify-center rounded-full font-bold text-xs transition-all hover:rotate-12 active:scale-90 shadow-lg ${
              darkMode ? 'bg-white text-black' : 'bg-white text-blue-600'
            }`}
          >
            {texts[language].switchLanguage}
          </button>
        </div>

        {/* روابط الـ Navbar مع أنميشن تتابعي (Delay) */}
        <ul className="flex items-center gap-2 md:gap-8" dir={language === 'ar' ? 'rtl' : 'ltr'}>
          {navLinks.map((link, index) => (
            <li 
              key={index} 
              data-aos="zoom-in" 
              data-aos-delay={500 + (index * 100)} // كل لينك يتأخر 100ms عن اللي قبله
            >
              <button
                onClick={() => scrollToSection(link.ref)}
                className="group relative flex flex-col items-center justify-center text-white"
              >
                <span className="text-xl md:hidden transition-transform group-hover:scale-125">
                  {link.icon}
                </span>
                <span className="hidden md:inline text-sm font-bold tracking-wide transition-all group-hover:opacity-100 opacity-80">
                  {link.name}
                </span>
                <span className="absolute -bottom-1 w-0 h-0.5 bg-white transition-all group-hover:w-full rounded-full"></span>
              </button>
            </li>
          ))}
        </ul>

        {/* زر الـ Dark Mode مع أنميشن ظهور من اليمين */}
        <div data-aos="fade-left" data-aos-delay="400">
          <div
            onClick={toggleDarkMode}
            className={`relative cursor-pointer w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 active:translate-y-1 select-none border ${
              darkMode 
                ? "bg-zinc-800 border-zinc-700 [box-shadow:0_4px_0_0_#000,0_6px_0_0_#00000080] active:[box-shadow:0_0px_0_0_#000]" 
                : "bg-blue-700 border-blue-500 [box-shadow:0_4px_0_0_#1e40af,0_6px_0_0_#1e40af80] active:[box-shadow:0_0px_0_0_#1e40af]"
            }`}
          >
            <span className="text-white text-lg transition-transform hover:scale-110">
              {darkMode ? <FaMoon className="text-blue-400" /> : <IoIosSunny className="text-white" />}
            </span>
          </div>
        </div>
      </nav>
    </div>
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
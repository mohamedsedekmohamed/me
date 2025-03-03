import PropTypes from 'prop-types';
import { IoIosSunny } from "react-icons/io";
import { FaMoon } from "react-icons/fa";
import { DarkModeContext } from './DarkModeContext.jsx';
import { useContext } from "react";
import { FaHome, FaInfoCircle, FaCode, FaEnvelope } from 'react-icons/fa'; // استيراد الأيقونات

function Navbar({ section1Ref, section2Ref, section3Ref, scrollToSection, section4Ref }) {
  const { darkMode, toggleDarkMode, language, setLanguage } = useContext(DarkModeContext);

  const texts = {
    en: {
      home: "Home",
      about: "About",
      content: "skills",
      contact: "Contact",
      switchLanguage: " AR",
    },
    ar: {
      home: "الرئيسية",
      about: "من أنا  ",
      content: "المهارات",
      contact: " للتواصل",
      switchLanguage: " EN ",
    },
  };

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "ar" : "en";
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  return (
    <div className="container mx-auto sticky top-0 z-50">
      <nav className={`w-[80%] mx-auto flex justify-between items-center rounded-full mt-2  border-2 border-white p-5 ${darkMode ? 'bg-black' : 'bg-yellow-600'}`}>
        <div
          className={`button ${
            darkMode ? "bg-black border-black" : "bg-yellow-700 border-yellow-600"
          } cursor-pointer select-none
          active:translate-y-2 flex flex-col absolute top-50% right-0 p-2 ${
            darkMode
              ? "active:[box-shadow:0_0px_0_0_#000000,0_0px_0_0_#00000080] [box-shadow:0_10px_0_0_#000000,0_15px_0_0_#00000080]"
              : "active:[box-shadow:0_0px_0_0_#eab308,0_0px_0_0_#eab30880] [box-shadow:0_10px_0_0_#eab308,0_15px_0_0_#eab30880]"
          }
          active:border-b-[0px]
          transition-all duration-150
          rounded-full border-[1px]`}
          onClick={toggleDarkMode}
        >
          <span className='flex flex-col justify-center items-center h-full text-white font-bold text-sm   '>
            {darkMode ? <i className='text-yellow-600'><FaMoon /></i> : <i className='text-black'> <IoIosSunny /></i>}
          </span>
        </div>
        <div className="flex flex-col absolute top-50% left-0 p-5">
          <button
            className={`${darkMode ? 'text-black' : 'text-yellow-600'} p-1 bg-white rounded-b-full text-sm  sm:text-2xl  transition-all duration-500 ease-in-out
              transform hover:-translate-y-1 hover:scale-110`}
            onClick={toggleLanguage}
          >
            {texts[language].switchLanguage}
          </button>
        </div>
        <ul className="flex w-full justify-around">
          <li className="mx-2">
            <button onClick={() => scrollToSection(section1Ref)} className={`font-bold text-white flex items-center`}>
              <span className="hidden sm:inline">{texts[language].home}</span> {/* إخفاء النص في الشاشات الصغيرة */}
              <span className="sm:hidden"><FaHome /></span> {/* إظهار الأيقونة في الشاشات الصغيرة */}
            </button>
          </li>
          <li className="mx-2">
            <button onClick={() => scrollToSection(section2Ref)} className={`font-bold text-white flex items-center`}>
              <span className="hidden sm:inline">{texts[language].about}</span>
              <span className="sm:hidden"><FaInfoCircle /></span>
            </button>
          </li>
          <li className="mx-2">
            <button onClick={() => scrollToSection(section3Ref)} className={`font-bold text-white flex items-center`}>
              <span className="hidden sm:inline">{texts[language].content}</span>
              <span className="sm:hidden"><FaCode /></span>
            </button>
          </li>
          <li className="mx-2">
            <button onClick={() => scrollToSection(section4Ref)} className={`font-bold text-white flex items-center`}>
              <span className="hidden sm:inline">{texts[language].contact}</span>
              <span className="sm:hidden"><FaEnvelope /></span>
            </button>
          </li>
        </ul>
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
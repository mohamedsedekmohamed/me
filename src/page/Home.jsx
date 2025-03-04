import { useEffect, useMemo, useState, useContext } from "react";
import onepic from "../assets/pic.svg";
import { DarkModeContext } from '../component/DarkModeContext.jsx';
import { FaFacebookSquare } from "react-icons/fa";
import { FaWhatsappSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { MdAddCall } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
const Home = () => {
  const {darkMode, language } = useContext(DarkModeContext);

  const texts = useMemo(() => ({
    en: ["Mohamed Sedek", "Web Developer", "Designer", "Creative Thinker"],
    ar: ["محمد صديق", "مطور ويب", "مصمم", "مفكر إبداعي"],
  }), []);

  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typeSpeed = 100;
    const deleteSpeed = 50;
    const pauseAfterType = 2000;
    const pauseAfterDelete = 500;
    const currentTextLength = currentText.length;
    const fullText = texts[language][currentIndex]; // Use language-based text

    if (!isDeleting) {
      if (currentTextLength < fullText.length) {
        const timeout = setTimeout(() => {
          setCurrentText(fullText.substring(0, currentTextLength + 1));
        }, typeSpeed);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pauseAfterType);
        return () => clearTimeout(timeout);
      }
    } else {
      if (currentTextLength > 0) {
        const timeout = setTimeout(() => {
          setCurrentText(fullText.substring(0, currentTextLength - 1));
        }, deleteSpeed);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setIsDeleting(false);
          setCurrentIndex((prevIndex) => (prevIndex + 1) % texts[language].length); // Update text on language basis
        }, pauseAfterDelete);
        return () => clearTimeout(timeout);
      }
    }
  }, [currentText, isDeleting, currentIndex, language, texts]);

  return (
    <section className="flex items-center justify-around w-full h-screen mx-3 mt-3">

      <div className="w-1/2 flex items-center justify-center relative">
        <img
          src={onepic}
          alt="Mohamed Sedek"
          className="max-h-100 max-w-300 z-10 rounded-full object-cover"
        />
        <div className="absolute inset-0 flex justify-center items-center">
          <div className={`w-100 h-100 bg-white   rounded-full ${darkMode?"animate-back":"animate-backsun"}  `}></div>
        </div>
      </div>

      <div className="text-center w-1/2 z-30">
        <div>
          <span className={`font-bold text-3xl text-white`}>
            {language === 'en' ? 'Welcome to my site' : 'مرحبا في موقعي'}
          </span>

          <h2 className={`font-bold text-5xl my-3 text-white`}>
            {language === 'en' ? 'I am' : 'أنا أكون'}
          </h2>
        </div>
        <h1 className={`font-medium text-4xl text-white`}>
          {currentText}<span className="ml-1 animate-blink">|</span>
        </h1>
        <div className="w-full  flex justify-center gap-4 items-center mt-4">
      <i className={` text-2xl md:text-4xl  transition ease-in hover:scale-120 ${!darkMode ? 'text-white' : 'text-black'}`}>
      <a href="https://www.facebook.com/share/19wsEt1wcs/">
            <FaFacebookSquare />
          </a>
        </i>
        <i className={`text-2xl md:text-4xl transition ease-in hover:scale-120 ${!darkMode ? 'text-white' : 'text-black'}`}>
          <a href="https://github.com/mohamedsedekmohamed">
            <FaGithub />
          </a>
        </i>
        <i className={`text-2xl md:text-4xl transition ease-in hover:scale-120 ${!darkMode ? 'text-white' : 'text-black'}`}>
          <a href="https://wa.me/01550622443">
            <FaWhatsappSquare />
          </a>
        </i>
        <i className={`text-2xl md:text-4xl transition ease-in hover:scale-120 ${!darkMode ? 'text-white' : 'text-black'}`}>
          <a href="https://www.linkedin.com/in/mohamed-seddek/">
            <FaLinkedin />
          </a>
        </i>
        <i className={`text-2xl md:text-4xl  transition ease-in hover:scale-120 ${!darkMode ? 'text-white' : 'text-black'}`}>
          <a href="tel:+201550622443">
            <MdAddCall />
          </a>
        </i>
      </div>
      </div>
    </section>
  );
};

Home.propTypes = {};

export default Home;

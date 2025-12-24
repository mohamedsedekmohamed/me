import { useEffect, useMemo, useState, useContext } from "react";
import onepic from "../assets/pic.svg";
import { DarkModeContext } from '../component/DarkModeContext.jsx';
import { FaFacebookSquare, FaWhatsappSquare, FaGithub, FaLinkedin } from "react-icons/fa";
import { MdAddCall } from "react-icons/md";
import cv from '../assets/cv.pdf'
import styled from 'styled-components';

const Home = () => {
  const { darkMode, language } = useContext(DarkModeContext);

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
    const fullText = texts[language][currentIndex];

    let timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < fullText.length) {
          setCurrentText(fullText.substring(0, currentText.length + 1));
        } else {
          setIsDeleting(true);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(fullText.substring(0, currentText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts[language].length);
        }
      }
    }, isDeleting ? deleteSpeed : (currentText.length === fullText.length ? pauseAfterType : typeSpeed));

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentIndex, language, texts]);

  return (
    <section 
      className="flex flex-col md:flex-row items-center justify-center w-full min-h-screen px-6 md:px-16 py-20 gap-10 overflow-hidden"
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      
      {/* الجانب النصي */}
      <div 
        className={`w-full md:w-1/2 text-center ${language === 'ar' ? 'md:text-right' : 'md:text-left'} z-20`}
        data-aos={language === 'ar' ? "fade-left" : "fade-right"}
      >
        <div className="space-y-6">
          <h2 className="text-5xl md:text-6xl font-black leading-tight tracking-tighter">
            <span className={`${darkMode ? 'text-blue-400' : 'text-blue-500'} transition-colors duration-500`}>
               {language === 'en' ? 'I am' : 'أنا '}
            </span>
            {/* اللون هنا أصبح متدرج ليعطي ثقل بصري */}
            <span className={`block mt-2 min-h-[1.2em] bg-clip-text text-transparent bg-gradient-to-r 
              ${darkMode ? 'from-blue-400 via-sky-300 to-indigo-400' : 'from-blue-900 via-blue-700 to-indigo-900'} 
              drop-shadow-xl transition-all duration-500`}>
              {currentText}<span className={`${darkMode ? 'text-blue-400' : 'text-blue-900'} animate-pulse`}>|</span>
            </span>
          </h2>
          
          <p className={`text-lg md:text-2xl max-w-xl font-semibold leading-relaxed 
            ${darkMode ? 'text-blue-300/90' : 'text-blue-700'} transition-colors duration-500`}>
            {language === 'en' 
              ? 'Building modern, interactive, and high-performance web applications with passion.' 
              : 'أقوم ببناء تطبيقات ويب حديثة، تفاعلية وعالية الأداء بكل شغف وإبداع.'}
          </p>
        </div>

        {/* أيقونات التواصل */}
        <div className={`flex justify-center ${language === 'ar' ? 'md:justify-start' : 'md:justify-start'} gap-8 mt-12`}>
          {[
            { icon: <FaFacebookSquare />, link: "https://www.facebook.com/share/19wsEt1wcs/" },
            { icon: <FaGithub />, link: "https://github.com/mohamedsedekmohamed" },
            { icon: <FaWhatsappSquare />, link: "https://wa.me/01550622443" },
            { icon: <FaLinkedin />, link: "https://www.linkedin.com/in/mohamed-seddek/" },
            { icon: <MdAddCall />, link: "tel:+201550622443" }
          ].map((item, i) => (
            <a key={i} href={item.link} target="_blank" rel="noreferrer" 
               className={`text-4xl transition-all duration-500 hover:scale-125 
               ${darkMode ? 'text-blue-400 hover:text-blue-400' : 'text-blue-600 hover:text-blue-800'} 
               drop-shadow-lg`}>
              {item.icon}
            </a>
          ))}
        </div>

        {/* زر التحميل */}
        <div className={`mt-12 flex justify-center ${language === 'ar' ? 'md:justify-start' : 'md:justify-start'}`}> 
          <StyledWrapper darkMode={darkMode}>
            <a href={cv} download="cvMohamedSedek.pdf" className="button shadow-[0_10px_30px_rgba(0,0,0,0.1)]">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon">
                <path d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {language === 'en' ? 'Download CV' : 'تحميل السيرة الذاتية'}
            </a>
          </StyledWrapper>
        </div>
      </div>

      {/* جانب الصورة */}
      <div 
        className="w-full md:w-1/2 flex items-center justify-center relative"
        data-aos="zoom-in"
      >
        <div className="relative w-72 h-72 md:w-[500px] md:h-[500px]">
          {/* تحسين الهالة خلف الصورة لتكون أثقل وأعمق */}
          <div className={`absolute inset-0 rounded-full blur-[80px] opacity-50 transition-all duration-1000 
            ${darkMode ? 'bg-blue-900/40 shadow-[0_0_100px_#1e3a8a]' : 'bg-blue-200 shadow-[0_0_100px_#bfdbfe]'}`}></div>
          
          <img
            src={onepic}
            alt="Mohamed Sedek"
            className="relative z-10 w-full h-full object-contain rounded-full 
            drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-transform duration-700 hover:scale-105"
          />
          
          <div className={`absolute -inset-8 border-2 border-dashed rounded-full animate-spin-slow 
            ${darkMode ? 'border-blue-700/50' : 'border-blue-900/10'}`}></div>
        </div>
      </div>
    </section>
  );
};

const StyledWrapper = styled.div`
  .button {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 18px 40px;
    border-radius: 16px;
    font-weight: 800;
    font-size: 1.1rem;
    letter-spacing: 0.5px;
    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
    text-decoration: none;
    backdrop-filter: blur(5px);

    ${props => props.darkMode 
      ? `background: rgba(255, 255, 255, 0.95); 
         color: #0f172a; 
         border: 1px solid rgba(255, 255, 255, 0.1);` 
      : `background: #0f172a; 
         color: #ffffff; 
         border: 1px solid #0f172a;`}
  }

  .button:hover {
    transform: tranblueY(-5px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    ${props => props.darkMode 
      ? 'background: #ffffff; color: #1e40af;' 
      : 'background: #1e40af; border-color: #1e40af;'}
  }

  .icon { width: 24px; height: 24px; }

  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .animate-spin-slow { animation: spin-slow 25s linear infinite; }
`;

export default Home;
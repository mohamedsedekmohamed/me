import { useEffect, useMemo, useState, useContext } from "react";
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';
import onepic from "../assets/pic.svg";
import { DarkModeContext } from '../component/DarkModeContext.jsx';
import { FaFacebookSquare, FaWhatsappSquare, FaGithub, FaLinkedin } from "react-icons/fa";
import { MdAddCall } from "react-icons/md";
import cv from '../assets/Cv11.pdf';
import styled from 'styled-components';
import Particles from '../component/Particles.jsx';
import FloatingShapes from '../component/FloatingShapes.jsx';

const arFont = { fontFamily: "'Cairo', sans-serif" };
const enFont = { fontFamily: "'Inter', sans-serif" };

const Home = () => {
  const { darkMode, language } = useContext(DarkModeContext);
  const { t } = useTranslation();

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

  const socialLinks = [
    { icon: <FaFacebookSquare />, link: "https://www.facebook.com/share/19wsEt1wcs/", label: "Facebook" },
    { icon: <FaGithub />, link: "https://github.com/mohamedsedekmohamed", label: "GitHub" },
    { icon: <FaWhatsappSquare />, link: "https://wa.me/01550622443", label: "WhatsApp" },
    { icon: <FaLinkedin />, link: "https://www.linkedin.com/in/mohamed-seddek/", label: "LinkedIn" },
    { icon: <MdAddCall />, link: "tel:+201550622443", label: "Call" },
  ];

  const particleColors = darkMode
    ? ["#3b82f6", "#818cf8", "#a78bfa", "#60a5fa"]
    : ["#1d4ed8", "#3b82f6", "#6366f1", "#0ea5e9"];

  return (
    <section
      className="relative flex flex-col md:flex-row items-center justify-center w-full min-h-screen px-6 md:px-16 py-20 gap-10 overflow-hidden"
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Particles Background */}
      <div className="absolute inset-0 z-0">
        <Particles
          particleCount={60}
          speed={0.05}
          particleColors={particleColors}
          particleBaseSize={80}
          moveParticlesOnHover={true}
          particleHoverFactor={2}
        />
      </div>

      {/* Floating 3D Shapes */}
      <FloatingShapes darkMode={darkMode} />

      {/* الجانب النصي */}
      <motion.div
        className={`w-full md:w-1/2 text-center ${language === 'ar' ? 'md:text-right' : 'md:text-left'} z-20`}
        initial={{ opacity: 0, x: language === 'ar' ? 80 : -80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
      >
        <div className="space-y-6">
          {/* "I am" label */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span
              className={`text-sm font-bold tracking-widest uppercase px-4 py-1.5 rounded-full border
                ${darkMode
                  ? 'text-blue-400 border-blue-400/30 bg-blue-400/10'
                  : 'text-blue-600 border-blue-600/30 bg-blue-600/10'
                }`}
              style={language === 'ar' ? { ...arFont, letterSpacing: '0.05em', fontSize: '0.95rem' } : enFont}
            >
              {t('home.greeting')}
            </span>
          </motion.div>

          {/* Typing text */}
          <motion.h1
            className="text-5xl md:text-6xl font-black leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            style={language === 'ar' ? { ...arFont, lineHeight: 1.4 } : { ...enFont, letterSpacing: '-0.03em' }}
          >
            <span className={`block min-h-[1.2em] bg-clip-text text-transparent
              ${darkMode
                ? 'bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400'
                : 'bg-gradient-to-r from-blue-900 via-blue-700 to-indigo-900'
              }
              drop-shadow-xl`}
              style={{ WebkitBackgroundClip: "text", backgroundClip: "text" }}
            >
              {currentText}
              <span className={`${darkMode ? 'text-blue-400' : 'text-blue-900'} animate-pulse`}>|</span>
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className={`text-lg md:text-xl max-w-xl font-medium
              ${darkMode ? 'text-blue-300/90' : 'text-blue-700'}`}
            style={language === 'ar'
              ? { ...arFont, lineHeight: 2, fontSize: '1.1rem' }
              : { ...enFont, lineHeight: 1.7 }
            }
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            {language === 'en'
              ? 'Building modern, interactive, and high-performance web applications with passion.'
              : t('home.description')}
          </motion.p>
        </div>

        {/* Social Icons */}
        <motion.div
          className={`flex justify-center ${language === 'ar' ? 'md:justify-start' : 'md:justify-start'} gap-6 mt-10`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
        >
          {socialLinks.map((item, i) => (
            <motion.a
              key={i}
              href={item.link}
              target="_blank"
              rel="noreferrer"
              aria-label={item.label}
              className={`text-4xl transition-colors duration-300
                ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}
                drop-shadow-lg`}
              whileHover={{ scale: 1.3, y: -5 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + i * 0.1 }}
            >
              {item.icon}
            </motion.a>
          ))}
        </motion.div>

        {/* CV Button */}
        <motion.div
          className={`mt-10 flex justify-center ${language === 'ar' ? 'md:justify-start' : 'md:justify-start'}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2 }}
        >
          <StyledWrapper darkMode={darkMode}>
            <a href={cv} download="cvMohamedSedek.pdf" className="button shadow-[0_10px_30px_rgba(0,0,0,0.15)]"
              style={language === 'ar' ? arFont : enFont}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon">
                <path d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {t('home.downloadCv')}
            </a>
          </StyledWrapper>
        </motion.div>
      </motion.div>

      {/* صورة البروفيل */}
      <motion.div
        className="w-full md:w-1/2 flex items-center justify-center relative z-20"
        initial={{ opacity: 0, scale: 0.7, rotateY: 30 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        style={{ perspective: "1000px" }}
      >
        <div className="relative w-72 h-72 md:w-[460px] md:h-[460px]">
          {/* Glow */}
          <motion.div
            className={`absolute inset-0 rounded-full blur-[80px] opacity-50
              ${darkMode ? 'bg-blue-900/40' : 'bg-blue-200'}`}
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Outer rotating ring */}
          <motion.div
            className={`absolute -inset-6 border-2 border-dashed rounded-full
              ${darkMode ? 'border-blue-700/50' : 'border-blue-900/20'}`}
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />

          {/* Inner rotating ring (opposite) */}
          <motion.div
            className={`absolute -inset-12 border border-dotted rounded-full
              ${darkMode ? 'border-indigo-600/30' : 'border-indigo-400/20'}`}
            animate={{ rotate: -360 }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          />

          {/* 3D floating dots on ring */}
          {[0, 60, 120, 180, 240, 300].map((angle, i) => (
            <motion.div
              key={i}
              className={`absolute w-3 h-3 rounded-full
                ${darkMode ? 'bg-blue-400' : 'bg-blue-600'}`}
              style={{
                top: "50%",
                left: "50%",
                transformOrigin: "0 0",
              }}
              animate={{
                rotate: [angle, angle + 360],
                x: [
                  Math.cos((angle * Math.PI) / 180) * 160 - 6,
                  Math.cos(((angle + 360) * Math.PI) / 180) * 160 - 6,
                ],
                y: [
                  Math.sin((angle * Math.PI) / 180) * 160 - 6,
                  Math.sin(((angle + 360) * Math.PI) / 180) * 160 - 6,
                ],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
                delay: 0,
              }}
            />
          ))}

          {/* Profile image */}
          <motion.img
            src={onepic}
            alt="Mohamed Sedek"
            className="relative z-10 w-full h-full object-contain rounded-full
              drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
            whileHover={{
              scale: 1.05,
              rotateY: 10,
              rotateX: -5,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            style={{ transformStyle: "preserve-3d" }}
          />
        </div>
      </motion.div>
    </section>
  );
};

const StyledWrapper = styled.div`
  .button {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 36px;
    border-radius: 16px;
    font-weight: 800;
    font-size: 1.05rem;
    letter-spacing: 0.5px;
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
    text-decoration: none;
    backdrop-filter: blur(5px);
    position: relative;
    overflow: hidden;

    ${props => props.darkMode
      ? `background: rgba(255,255,255,0.95); color: #0f172a; border: 1px solid rgba(255,255,255,0.2);`
      : `background: #0f172a; color: #ffffff; border: 1px solid #0f172a;`}
  }

  .button::before {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 100%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
  }

  .button:hover::before { left: 100%; }

  .button:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0,0,0,0.25);
    ${props => props.darkMode
      ? 'background: #ffffff; color: #1e40af;'
      : 'background: #1e40af; border-color: #1e40af;'}
  }

  .icon { width: 22px; height: 22px; }
`;

export default Home;

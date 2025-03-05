import { useEffect, useMemo, useState, useContext } from "react";
import onepic from "../assets/pic.svg";
import { DarkModeContext } from '../component/DarkModeContext.jsx';
import { FaFacebookSquare } from "react-icons/fa";
import { FaWhatsappSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { MdAddCall } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import cv from '../assets/cv.pdf'
import styled from 'styled-components';

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

      <div className="w-[40%] flex items-center justify-center relative">
        <img
          src={onepic}
          alt="Mohamed Sedek"
          className="max-h-100 max-w-300 z-10 rounded-full object-cover"
        />
        <div className="absolute inset-0 flex justify-center items-center">
          <div className={`w-100 h-100 bg-white   rounded-full ${darkMode?"animate-back":"animate-backsun"}  `}></div>
        </div>
      </div>

      <div className="text-center w-[60%] z-30">
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
        <div className="w-full  flex justify-center gap-4 items-center mt-4 mx-2">
      <i className={` text-md md:text-4xl  transition ease-in hover:scale-150 ${!darkMode ? 'text-white' : 'text-black'}`}>
      <a href="https://www.facebook.com/share/19wsEt1wcs/">
            <FaFacebookSquare />
          </a>
        </i>
        <i className={` text-md md:text-4xl transition ease-in hover:scale-150 ${!darkMode ? 'text-white' : 'text-black'}`}>
          <a href="https://github.com/mohamedsedekmohamed">
            <FaGithub />
          </a>
        </i>
        <i className={` text-md md:text-4xl transition ease-in hover:scale-150 ${!darkMode ? 'text-white' : 'text-black'}`}>
          <a href="https://wa.me/01550622443">
            <FaWhatsappSquare />
          </a>
        </i>
        <i className={` text-md md:text-4xl transition ease-in hover:scale-150 ${!darkMode ? 'text-white' : 'text-black'}`}>
          <a href="https://www.linkedin.com/in/mohamed-seddek/">
            <FaLinkedin />
          </a>
        </i>
        <i className={` text-md md:text-4xl  transition ease-in hover:scale-150 ${!darkMode ? 'text-white' : 'text-black'}`}>
          <a href="tel:+201550622443">
            <MdAddCall />
          </a>
        </i>
      </div>

<div className="mt-5 flex justify-center w-full "> 
 <StyledWrapper>
  <a href={cv} download="cvMohamedSedek.pdf" >
      <button className="button">
        <svg id="UploadToCloud" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" height="16px" width="16px" className="icon">
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path className="color000000 svgShape" fill="#000000" d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l4.65-4.65c.2-.2.51-.2.71 0L17 13h-3z" />
        </svg>
        Upload CV
      </button>
      </a>
    </StyledWrapper>
    </div>
      </div>
    </section>
  );
};

const StyledWrapper = styled.div`
  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background: linear-gradient(45deg, #ffc75d, #ffc708);
    box-shadow: 0 0 24px #ffb20861;
    border: 2px solid #ffe825;
    border-radius: 100px;
    transition: background-color 0.3s ease, box-shadow 0.3s ease,
      text-shadow 0.3s ease;
    padding: 10px 20px;
    color: #09090b;
    font-weight: bold;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3); /* Text drop shadow */
  }

  .button:hover {
    background-color: #ffc75d !important;
    box-shadow: 0 0 34px #ffb20861 !important;
    text-shadow: 0 0 4px #ffe825; /* Hover text shadow */
    border-color: #ffe825 !important;
  }

  .icon {
    margin-right: 5px;
    filter: drop-shadow(2px 2px 5px rgba(0, 0, 0, 0.3)); /* Icon drop shadow */
  }`;
Home.propTypes = {};

export default Home;

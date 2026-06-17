import { useContext } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { DarkModeContext } from '../component/DarkModeContext.jsx';
import { FaHtml5, FaCss3Alt, FaBootstrap, FaGitSquare, FaGithub } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { RiTailwindCssLine } from "react-icons/ri";
import { SiReact, SiShadcnui, SiTypescript, SiPostman, SiRedux, SiNextdotjs } from "react-icons/si";
import { RxFigmaLogo } from "react-icons/rx";
import styled, { keyframes } from 'styled-components';
import AnimatedContent from '../component/AnimatedContent.jsx';
import ScrollFloat from '../component/ScrollFloat.jsx';

const arFont = { fontFamily: "'Cairo', sans-serif" };
const enFont = { fontFamily: "'Inter', sans-serif" };

const Me = () => {
  const { language, darkMode } = useContext(DarkModeContext);
  const { t } = useTranslation();
  const isAr = language === 'ar';

  const skills = [
    { name: "HTML",       icon: <FaHtml5 className="text-[#E34F26]" /> },
    { name: "CSS",        icon: <FaCss3Alt className="text-[#1572B6]" /> },
    { name: "JavaScript", icon: <IoLogoJavascript className="text-[#F7DF1E]" /> },
    { name: "React",      icon: <SiReact className="text-[#61DAFB]" /> },
    { name: "Tailwind",   icon: <RiTailwindCssLine className="text-[#06B6D4]" /> },
    { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6]" /> },
    { name: "Bootstrap",  icon: <FaBootstrap className="text-[#7952B3]" /> },
    { name: "Shadcn UI",  icon: <SiShadcnui className={darkMode ? "text-white" : "text-black"} /> },
    { name: "Git",        icon: <FaGitSquare className="text-[#F05032]" /> },
    { name: "GitHub",     icon: <FaGithub className={darkMode ? "text-white" : "text-black"} /> },
    { name: "Postman",    icon: <SiPostman className="text-[#FF6C37]" /> },
    { name: "Figma",      icon: <RxFigmaLogo className="text-[#F24E1E]" /> },
    { name: "Redux",      icon: <SiRedux className="text-[#764ABC]" /> },
    { name: "Next.js",    icon: <SiNextdotjs className={darkMode ? "text-white" : "text-black"} /> },
  ];

  const scrollSkills = [...skills, ...skills];

  const stats = [
    { value: "2+",  label: t('about.yearsExp') },
    { value: "10+", label: t('about.projectsDone') },
    { value: "7+",  label: t('about.productionSites') },
  ];

  const textStyle = isAr ? { ...arFont, lineHeight: 1.9 } : enFont;

  return (
    <div className={`flex flex-col items-center py-20 w-full overflow-hidden transition-colors duration-300
      ${darkMode ? "bg-black text-white" : "bg-white text-gray-800"}`}>

      {/* Title */}
      <AnimatedContent distance={60} direction="vertical" delay={0}>
        <div className="text-center mb-4">
          <ScrollFloat
            containerClassName={`text-5xl md:text-6xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}
            stagger={0.04}
            animationDuration={1.2}
          >
            {t('about.title')}
          </ScrollFloat>
          <motion.div
            className={`h-1.5 w-16 mx-auto mt-3 rounded-full ${darkMode ? 'bg-blue-400' : 'bg-blue-600'}`}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
        </div>
      </AnimatedContent>

      {/* Stats */}
      <AnimatedContent distance={40} direction="vertical" delay={0.1} className="w-full">
        <div className="flex justify-center gap-8 md:gap-16 my-10 flex-wrap px-4">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className={`text-center px-6 py-4 rounded-2xl border
                ${darkMode ? 'border-blue-500/20 bg-blue-500/5' : 'border-blue-200 bg-blue-50'}`}
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className={`text-4xl font-black ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}
                style={enFont}>
                {stat.value}
              </div>
              <div className={`text-sm font-medium mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
                style={isAr ? { ...arFont, fontSize: '0.9rem' } : enFont}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatedContent>

      {/* Bio */}
      <AnimatedContent distance={50} direction="vertical" delay={0.2} className="w-full flex justify-center">
        <p
          className={`w-[85%] md:w-[60%] text-center font-medium mb-16
            ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
          dir={isAr ? 'rtl' : 'ltr'}
          style={isAr
            ? { ...arFont, lineHeight: 2.1, fontSize: '1.1rem' }
            : { ...enFont, lineHeight: 1.8, fontSize: '1.1rem' }
          }
        >
          {t('about.bio')}
        </p>
      </AnimatedContent>

      {/* Tech Stack title */}
      <AnimatedContent distance={30} direction="vertical" delay={0}>
        <h3
          className={`text-2xl font-bold mb-8 text-center ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}
          style={isAr ? { ...arFont, letterSpacing: '0.02em' } : { ...enFont, letterSpacing: '0.05em' }}
        >
          {t('about.techStack')}
        </h3>
      </AnimatedContent>

      {/* Marquee */}
      <div className="relative w-full flex overflow-hidden py-6">
        <MarqueeContainer>
          <div className="marquee-content">
            {scrollSkills.map((skill, index) => (
              <motion.div
                key={index}
                className="skill-card flex items-center gap-3 px-8"
                whileHover={{ scale: 1.15, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="text-4xl">{skill.icon}</span>
                <span className={`text-xl font-bold uppercase tracking-wider
                  ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}
                  style={enFont}>
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </div>
        </MarqueeContainer>

        <div className={`absolute top-0 left-0 h-full w-24 z-10 pointer-events-none bg-gradient-to-r
          ${darkMode ? 'from-black to-transparent' : 'from-white to-transparent'}`} />
        <div className={`absolute top-0 right-0 h-full w-24 z-10 pointer-events-none bg-gradient-to-l
          ${darkMode ? 'from-black to-transparent' : 'from-white to-transparent'}`} />
      </div>
    </div>
  );
};

const scroll = keyframes`
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const MarqueeContainer = styled.div`
  display: flex;
  width: max-content;
  .marquee-content {
    display: flex;
    white-space: nowrap;
    animation: ${scroll} 30s linear infinite;
  }
  .skill-card {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    cursor: default;
  }
`;

export default Me;

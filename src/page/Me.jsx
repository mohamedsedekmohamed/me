import { useContext } from 'react';
import { DarkModeContext } from '../component/DarkModeContext.jsx';
import { FaHtml5, FaCss3Alt, FaBootstrap, FaGitSquare, FaGithub } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { RiTailwindCssLine } from "react-icons/ri";
import { SiReact, SiShadcnui, SiTypescript, SiPostman } from "react-icons/si";
import { RxFigmaLogo } from "react-icons/rx";
import { SiRedux } from "react-icons/si";
import styled, { keyframes } from 'styled-components';

const Me = () => {
  const { language, darkMode } = useContext(DarkModeContext);

  const skills = [
    { name: "HTML", icon: <FaHtml5 className="text-[#E34F26]" /> },
    { name: "CSS", icon: <FaCss3Alt className="text-[#1572B6]" /> },
    { name: "JavaScript", icon: <IoLogoJavascript className="text-[#F7DF1E]" /> },
    { name: "React", icon: <SiReact className="text-[#61DAFB]" /> },
    { name: "Tailwind", icon: <RiTailwindCssLine className="text-[#06B6D4]" /> },
    { name: "Typescript", icon: <SiTypescript className="text-[#3178C6]" /> },
    { name: "Bootstrap", icon: <FaBootstrap className="text-[#7952B3]" /> },
    { name: "Shadcn UI", icon: <SiShadcnui className={darkMode ? "text-white" : "text-black"} /> },
    { name: "Git", icon: <FaGitSquare className="text-[#F05032]" /> },
    { name: "GitHub", icon: <FaGithub className={darkMode ? "text-white" : "text-black"} /> },
    { name: "Postman", icon: <SiPostman className="text-[#FF6C37]" /> },
    { name: "Figma", icon: <RxFigmaLogo className="text-[#F24E1E]" /> },
    { name: "Redux", icon: <SiRedux className="text-[#5d2d79]" /> },
  ];

  // نكرر المصفوفة مرتين لضمان استمرارية الحركة اللانهائية
  const scrollSkills = [...skills, ...skills];

  return (
    <div className={`flex flex-col items-center py-20 w-full overflow-hidden transition-colors duration-300 ${darkMode ? "bg-black text-white" : "bg-white text-gray-800"}`}>
      
      {/* نص السيرة الذاتية */}
      <h2 className="w-[85%] md:w-[70%] text-center text-lg md:text-xl leading-relaxed font-medium mb-16">
        {language === "en" ?
          "I am a passionate web developer with an interest in developing user interfaces. I started my journey in the world of programming through self-learning, where I decided to learn the front-end path from scratch. Through continuous research and experimentation, I acquired the skills I needed to build interactive and engaging websites and web applications."
          :
          "أنا مطور ويب شغوف ومهتم بتطوير واجهات المستخدم. بدأت رحلتي في عالم البرمجة من خلال التعلم الذاتي، حيث قررت تعلم مسار الواجهة الأمامية من الصفر. ومن خلال البحث والتجريب المستمر، اكتسبت المهارات التي أحتاجها لبناء مواقع وتطبيقات ويب تفاعلية وجذابة."
        }
      </h2>

      {/* شريط المهارات المتحرك */}
      <div className="relative w-full flex overflow-hidden py-10">
        <MarqueeContainer>
          <div className="marquee-content">
            {scrollSkills.map((skill, index) => (
              <div key={index} className="skill-card flex items-center gap-3 px-8">
                <span className="text-4xl">{skill.icon}</span>
                <span className="text-xl font-bold uppercase tracking-wider">{skill.name}</span>
              </div>
            ))}
          </div>
        </MarqueeContainer>
        
        {/* تظليل جانبي يعطي جمالية للحواف */}
        <div className={`absolute top-0 left-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r ${darkMode ? 'from-black to-transparent' : 'from-white to-transparent'}`}></div>
        <div className={`absolute top-0 right-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-l ${darkMode ? 'from-black to-transparent' : 'from-white to-transparent'}`}></div>
      </div>
    </div>
  );
}

// الانيميشن والستايل
const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const MarqueeContainer = styled.div`
  display: flex;
  width: max-content;

  .marquee-content {
    display: flex;
    white-space: nowrap;
    animation: ${scroll} 30s linear infinite;
    
    /* سرعة الحركة: 30s تعني حركة متوسطة، قلل الرقم لزيادة السرعة */
  }

  .skill-card {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    transition: transform 0.3s;
    
    &:hover {
      transform: scale(1.1);
      color: #2563eb; /* يميل للأزرق عند التمرير */
    }
  }
`;

export default Me;
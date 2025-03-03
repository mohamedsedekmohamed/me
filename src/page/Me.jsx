import { useContext } from 'react';
import { DarkModeContext } from '../component/DarkModeContext.jsx';
import { FaHtml5, FaCss3Alt, FaBootstrap, FaGitSquare, FaGithub } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { RiTailwindCssLine } from "react-icons/ri";
import { SiReact } from "react-icons/si";

const Me = () => {
  const {  language } = useContext(DarkModeContext);

  const skills = [
    { name: "HTML", icon: <FaHtml5 />, label: "react" },
    { name: "CSS", icon: <FaCss3Alt />, label: "react" },
    { name: "JavaScript", icon: <IoLogoJavascript />, label: "react" },
    { name: "Bootstrap", icon: <FaBootstrap />, label: "react" },
    { name: "Tailwind", icon: <RiTailwindCssLine />, label: "react" },
    { name: "React", icon: <SiReact />, label: "react" },
    { name: "Git", icon: <FaGitSquare />, label: "react" },
    { name: "GitHub", icon: <FaGithub />, label: "react" },
  ];

  return (
    <div className="flex flex-col items-center h-screen w-full justify-center my-20 ">
      <h2 className="w-[75%] text-center">
        {language === "en" ?
          "I am a passionate web developer with an interest in developing user interfaces. I started my journey in the world of programming through self-learning, where I decided to learn the front-end path from scratch. Through continuous research and experimentation, I acquired the skills I needed to build interactive and engaging websites and web applications."
          :
          "أنا مطور ويب شغوف ومهتم بتطوير واجهات المستخدم. بدأت رحلتي في عالم البرمجة من خلال التعلم الذاتي، حيث قررت تعلم مسار الواجهة الأمامية من الصفر. ومن خلال البحث والتجريب المستمر، اكتسبت المهارات التي أحتاجها لبناء مواقع وتطبيقات ويب تفاعلية وجذابة."
        }
      </h2>
      
      <div className='flex   w-full   flex-wrap justify-center items-center gap-4 mt-5'>
        {skills.map((skill, index) => (
          <div key={index} className=' flex-col w-[30%]   gap-1 flex justify-center items-center '>
            <p className="uppercase font-semibold">{skill.name}</p>
           <i className='text-4xl'>{skill.icon}</i> 
          </div>
        ))}
      </div>
    </div>
  );
}

export default Me;

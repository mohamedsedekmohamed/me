import Navbar from "./component/Navbar"
import Home from "./page/Home"
import Footer from "./component/Footer";
import { useRef ,useContext} from 'react';
import Me from './page/Me';
import { DarkModeContext } from './component/DarkModeContext.jsx';
import Pro from "./page/Pro.jsx";
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // استيراد ملف الستايل الخاص بالمكتبة

const App = () => {
// داخل App.js
const { darkMode, language } = useContext(DarkModeContext);

useEffect(() => {
  AOS.init({
    duration: 1000,
    once: false,
    mirror: true, // يضمن عودة الأنميشن عند السكرول لأعلى ولأسفل
  });
}, []);

// تحديث AOS عند تغيير الحالة
useEffect(() => {
  // refreshHard تعيد بناء الحسابات من الصفر (أقوى من refresh العادية)
  AOS.refresh(); 
}, [darkMode, language]);
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const section4Ref = useRef(null);
  const scrollToSection = (sectionRef) => {
  if (sectionRef.current) {
  sectionRef.current.scrollIntoView({ behavior: 'smooth' });
}

  };

  return (
    <div className="overflow-hidden" ref={section1Ref}> 
          <Navbar   section4Ref={section4Ref} section1Ref={section1Ref} section2Ref={section2Ref} section3Ref={section3Ref} scrollToSection={scrollToSection}/>
      <div className="relative max-w-screen ">
    <div   className={`sticky top-0 h-screen flex flex-col items-center justify-center ${darkMode?"bg-gradient-to-t  from-black to-white" :"bg-gradient-to-t  from-blue-800 to-white"}  `}>
    <Home   />
    </div>
    <div ref={section2Ref} className={`relative  h-fit p-1 flex flex-col items-center justify-center  text-white ${darkMode?" bg-gradient-to-t  from-white to-black ":"bg-gradient-to-b  from-white to-blue-800 "} `}>
<Me/>
    </div>

    
    <div ref={section3Ref} className={`relative  h-fit p-30 flex flex-col items-center justify-center ${darkMode?"bg-gradient-to-t  from-black to-white" :"bg-gradient-to-t  from-blue-800 to-white"}  `}>
       
<Pro/>
    </div>
    
    <div  ref={section4Ref} className={`relative  h-fit  flex flex-col items-center justify-center  text-white ${darkMode?"bg-black ":"bg-gradient-to-b  from-white to-blue-800 "} `}>
    <Footer  />
    </div>

</div>

    </div>
  )
}

export default App

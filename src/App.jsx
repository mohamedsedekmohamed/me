import Navbar from "./component/Navbar"
import Home from "./page/Home"
import Footer from "./component/Footer";
import { useRef ,useContext, useState} from 'react';
import Me from './page/Me';
import { DarkModeContext } from './component/DarkModeContext.jsx';
import Pro from "./page/Pro.jsx";
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // استيراد ملف الستايل الخاص بالمكتبة

const App = () => {
// داخل App.js
const { darkMode, language } = useContext(DarkModeContext);
const [loading, setLoading] = useState(true); // حالة التحميل
useEffect(() => {
    // محاكاة وقت التحميل أو انتظار جلب البيانات
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // سيختفي بعد ثانيتين

    // تهيئة AOS
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
    });

    return () => clearTimeout(timer);
  }, []);

  // تحديث AOS عند تغيير الحالة
  useEffect(() => {
    if (!loading) {
      AOS.refresh();
    }
  }, [darkMode, language, loading]);
useEffect(() => {
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
const LoadingScreen = () => (
<div className="fixed inset-0 z-[9999] flex overflow-hidden pointer-events-none">
      {/* البوابة اليسرى */}
      <div 
        className={`gate-bg h-full w-1/2 relative flex items-center justify-end border-r-2 border-blue-500/50 glow-line-left
        ${!loading ? 'gate-open-left' : ''} transition-all duration-500`}
      >
        <div className={`flex flex-col items-end mr-4 transition-opacity duration-500 ${!loading ? 'opacity-0' : 'opacity-100'}`}>
          <span className="text-5xl font-black text-white tracking-tighter pulse-glow">
            PORT
          </span>
          <div className="h-1 w-20 bg-blue-500 mt-2"></div>
        </div>
      </div>

      {/* البوابة اليمنى */}
      <div 
        className={`gate-bg h-full w-1/2 relative flex items-center justify-start border-l-2 border-blue-500/50 glow-line-right
        ${!loading ? 'gate-open-right' : ''} transition-all duration-500`}
      >
        <div className={`flex flex-col items-start ml-4 transition-opacity duration-500 ${!loading ? 'opacity-0' : 'opacity-100'}`}>
          <span className="text-5xl font-black text-blue-500 tracking-tighter pulse-glow">
            FOLIO
          </span>
          <div className="h-1 w-20 bg-white mt-2"></div>
        </div>
      </div>

      {/* الـ Spinner في المنتصف تماماً - يظهر فقط عندما يكون loading=true */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-[10000]">
          <div className="relative">
             {/* حلقة خارجية ثابتة */}
             <div className="w-24 h-24 rounded-full border-2 border-blue-500/20"></div>
             {/* حلقة متحركة */}
             <div className="absolute top-0 left-0 w-24 h-24 rounded-full border-t-2 border-blue-500 animate-spin"></div>
             {/* نقطة مضيئة في المركز */}
             <div className="absolute inset-0 m-auto w-2 h-2 bg-white rounded-full shadow-[0_0_15px_#fff]"></div>
          </div>
        </div>
      )}
    </div>
);
if (loading) {
    return <LoadingScreen />;
  }
  return (
    <div className="overflow-hidden" ref={section1Ref}> 
          <Navbar   section4Ref={section4Ref} section1Ref={section1Ref} section2Ref={section2Ref} section3Ref={section3Ref} scrollToSection={scrollToSection}/>
      <div className="relative max-w-screen ">
    <div   className={`sticky top-30 md:top-20 lg:top-0 h-screen flex flex-col items-center justify-center ${darkMode?"bg-gradient-to-t  from-black to-white" :"bg-gradient-to-t  from-blue-800 to-white"}  `}>
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

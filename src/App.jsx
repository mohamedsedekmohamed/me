import { useRef, useContext, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from "./component/Navbar";
import Home from "./page/Home";
import Footer from "./component/Footer";
import Me from './page/Me';
import Pro from "./page/Pro.jsx";
import { DarkModeContext } from './component/DarkModeContext.jsx';
import PageTransition, { usePageTransition } from './component/PageTransition.jsx';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const { darkMode, language } = useContext(DarkModeContext);
  const [loading, setLoading] = useState(true);
  const { isAnimating, triggerTransition } = usePageTransition();

  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const section4Ref = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) ScrollTrigger.refresh();
  }, [darkMode, language, loading]);

  // scroll مع أنيميشن transition
  const scrollToSection = (sectionRef) => {
    triggerTransition(() => {
      if (sectionRef.current) {
        sectionRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    });
  };

  // ===== LOADING SCREEN =====
  if (loading) {
    return <LoadingScreen loading={loading} />;
  }

  return (
    <>
      {/* Page Transition Overlay */}
      <PageTransition isAnimating={isAnimating} />

      <div className="overflow-hidden" ref={section1Ref}>
        <Navbar
          section4Ref={section4Ref}
          section1Ref={section1Ref}
          section2Ref={section2Ref}
          section3Ref={section3Ref}
          scrollToSection={scrollToSection}
        />

        <div className="relative max-w-screen">
          {/* Home */}
          <div className={`sticky top-30 md:top-20 lg:top-0 h-screen flex flex-col items-center justify-center
            ${darkMode ? "bg-gradient-to-b from-[#050510] to-[#0a0a20]" : "bg-gradient-to-b from-white to-blue-100"}`}>
            <Home />
          </div>

          {/* About */}
          <div ref={section2Ref}
            className={`relative h-fit flex flex-col items-center justify-center
              ${darkMode ? "bg-gradient-to-b from-[#0a0a20] to-black" : "bg-gradient-to-b from-blue-100 to-white"}`}>
            <Me />
          </div>

          {/* Projects */}
          <div ref={section3Ref}
            className={`relative h-fit flex flex-col items-center justify-center
              ${darkMode ? "bg-gradient-to-b from-black to-[#050510]" : "bg-gradient-to-b from-white to-blue-50"}`}>
            <Pro />
          </div>

          {/* Contact */}
          <div ref={section4Ref}
            className={`relative h-fit flex flex-col items-center justify-center
              ${darkMode ? "bg-[#050510]" : "bg-gradient-to-b from-blue-50 to-blue-800"}`}>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

// ===== LOADING SCREEN COMPONENT =====
const LoadingScreen = ({ loading }) => {
  const [phase, setPhase] = useState("in"); // "in" | "hold" | "out"
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress bar
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return p + Math.random() * 12;
      });
    }, 80);

    // Phase: hold then out
    const holdTimer = setTimeout(() => setPhase("out"), 900);

    return () => {
      clearInterval(interval);
      clearTimeout(holdTimer);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden bg-[#050510]">
      {/* Grid background */}
      <div className="absolute inset-0 gate-bg opacity-60" />

      {/* Animated corner accents */}
      <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-blue-500/60" />
      <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-blue-500/60" />
      <div className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-blue-500/60" />
      <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-blue-500/60" />

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-8">

        {/* Logo / Name */}
        <div className="flex flex-col items-center gap-2">
          {/* Spinning outer ring */}
          <div className="relative w-28 h-28 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-blue-500/20" />
            <div className="absolute inset-0 rounded-full border-t-2 border-blue-500 animate-spin"
              style={{ animationDuration: "1.2s" }} />
            <div className="absolute inset-2 rounded-full border border-blue-400/10" />
            <div className="absolute inset-2 rounded-full border-b border-blue-400/40 animate-spin"
              style={{ animationDuration: "2s", animationDirection: "reverse" }} />

            {/* Center initials */}
            <span className="text-2xl font-black text-white tracking-widest z-10"
              style={{ fontFamily: "'Inter', sans-serif" }}>
              MS
            </span>
          </div>

          {/* Name */}
          <div className="text-center mt-2">
            <p className="text-blue-400 text-xs tracking-[0.4em] uppercase font-medium">
              Mohamed Sedek
            </p>
            <p className="text-white/40 text-xs tracking-[0.3em] uppercase mt-1">
              Frontend Developer
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-48 flex flex-col items-center gap-2">
          <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-150"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <span className="text-white/30 text-[10px] tracking-widest">
            {Math.min(Math.round(progress), 100)}%
          </span>
        </div>
      </div>

      {/* Bottom text */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <p className="text-white/20 text-[10px] tracking-[0.5em] uppercase">
          Portfolio · 2025
        </p>
      </div>
    </div>
  );
};

export default App;

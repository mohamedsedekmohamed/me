import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Hook للـ Navbar
export const usePageTransition = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  const triggerTransition = useCallback(
    (callback) => {
      if (isAnimating) return;
      setIsAnimating(true);

      // بعد 400ms (نص الـ curtain نزل) نفذ الـ scroll
      setTimeout(() => {
        callback();
      }, 400);

      // بعد 900ms ارفع الـ curtain
      setTimeout(() => {
        setIsAnimating(false);
      }, 900);
    },
    [isAnimating]
  );

  return { isAnimating, triggerTransition };
};

// الـ curtain panels
const panelVariants = {
  hidden: { scaleY: 0 },
  visible: { scaleY: 1, transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } },
  exit:   { scaleY: 0, transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1], delay: 0.1 } },
};

const PageTransition = ({ isAnimating }) => {
  return (
    <AnimatePresence>
      {isAnimating && (
        <div
          className="fixed inset-0 z-[9998] flex pointer-events-none"
          aria-hidden="true"
        >
          {/* Panel يسار */}
          <motion.div
            className="w-1/2 h-full bg-[#0a0a1a]"
            style={{ transformOrigin: "bottom" }}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          />
          {/* Panel يمين - تأخير بسيط */}
          <motion.div
            className="w-1/2 h-full bg-[#0a0a1a]"
            style={{ transformOrigin: "bottom" }}
            variants={{
              hidden: { scaleY: 0 },
              visible: { scaleY: 1, transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1], delay: 0.05 } },
              exit:   { scaleY: 0, transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1], delay: 0.05 } },
            }}
            initial="hidden"
            animate="visible"
            exit="exit"
          />
        </div>
      )}
    </AnimatePresence>
  );
};

export default PageTransition;

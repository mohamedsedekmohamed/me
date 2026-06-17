import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AnimatedContent = ({
  children,
  distance = 80,
  direction = "vertical",
  reverse = false,
  duration = 0.8,
  ease = "power3.out",
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  threshold = 0.1,
  delay = 0,
  className = "",
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const axis = direction === "horizontal" ? "x" : "y";
    const fromVal = reverse ? -distance : distance;

    const fromProps = {
      [axis]: fromVal,
      opacity: animateOpacity ? initialOpacity : 1,
      scale,
    };

    const toProps = {
      [axis]: 0,
      opacity: 1,
      scale: 1,
      duration,
      ease,
      delay,
    };

    gsap.set(el, fromProps);

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top bottom-=50px",
      toggleActions: "play none none reverse",
      onEnter: () => gsap.to(el, toProps),
      onLeaveBack: () => gsap.set(el, fromProps),
    });

    return () => {
      trigger.kill();
    };
  }, [distance, direction, reverse, duration, ease, initialOpacity, animateOpacity, scale, threshold, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default AnimatedContent;

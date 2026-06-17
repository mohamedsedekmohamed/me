import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SplitText = ({
  text = "",
  className = "",
  delay = 50,
  duration = 1.25,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "center",
  onLetterAnimationComplete,
  tag: Tag = "p",
}) => {
  const ref = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Split text into spans
    const chars = text.split("");
    el.innerHTML = chars
      .map((char) =>
        char === " "
          ? `<span style="display:inline-block;white-space:pre"> </span>`
          : `<span style="display:inline-block;overflow:hidden"><span style="display:inline-block">${char}</span></span>`
      )
      .join("");

    const innerSpans = el.querySelectorAll("span > span");

    gsap.set(innerSpans, from);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top bottom" + rootMargin,
        toggleActions: "play none none reverse",
        threshold,
      },
      onComplete: onLetterAnimationComplete,
    });

    tl.to(innerSpans, {
      ...to,
      duration,
      ease,
      stagger: delay / 1000,
    });

    animationRef.current = tl;

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [text, delay, duration, ease, from, to, threshold, rootMargin, onLetterAnimationComplete]);

  return (
    <Tag
      ref={ref}
      className={className}
      style={{ textAlign, display: "block" }}
    />
  );
};

export default SplitText;

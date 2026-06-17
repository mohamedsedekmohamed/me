import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// هل النص عربي؟
const isArabic = (text) => /[\u0600-\u06FF]/.test(text);

const ScrollFloat = ({
  children,
  containerClassName = "",
  animationDuration = 1,
  ease = "back.inOut(2)",
  scrollStart = "center bottom+=50%",
  scrollEnd = "bottom bottom-=40%",
  stagger = 0.03,
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const text = typeof children === "string" ? children : "";
    if (!text) return;

    const arabic = isArabic(text);

    if (arabic) {
      // عربي: split على الكلمات عشان الحروف ما تتفصلش
      const words = text.split(" ");
      el.innerHTML = words
        .map((word) => `<span style="display:inline-block;margin:0 4px">${word}</span>`)
        .join("");
    } else {
      // إنجليزي: split على الحروف
      el.innerHTML = text
        .split("")
        .map((char) =>
          char === " "
            ? `<span style="display:inline-block;white-space:pre"> </span>`
            : `<span style="display:inline-block">${char}</span>`
        )
        .join("");
    }

    const units = el.querySelectorAll("span");

    gsap.fromTo(
      units,
      { y: 60, opacity: 0, rotateX: arabic ? -60 : -90 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: animationDuration,
        ease,
        stagger: arabic ? stagger * 2.5 : stagger,
        scrollTrigger: {
          trigger: el,
          start: scrollStart,
          end: scrollEnd,
          scrub: false,
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [children, animationDuration, ease, scrollStart, scrollEnd, stagger]);

  return (
    <div
      ref={containerRef}
      className={containerClassName}
      style={{
        perspective: "800px",
        display: "block",
        fontFamily: isArabic(typeof children === "string" ? children : "")
          ? "'Cairo', sans-serif"
          : undefined,
        direction: isArabic(typeof children === "string" ? children : "") ? "rtl" : undefined,
      }}
    />
  );
};

export default ScrollFloat;

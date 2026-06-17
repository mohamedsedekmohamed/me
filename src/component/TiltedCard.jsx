import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const TiltedCard = ({
  imageSrc,
  altText = "Tilted card image",
  captionText = "",
  containerHeight = "310px",
  containerWidth = "230px",
  imageHeight = "100%",
  imageWidth = "100%",
  scaleOnHover = 1.05,
  rotateAmplitude = 12,
  showTooltip = true,
  displayOverlayContent = false,
  overlayContent = null,
  children,
}) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 300, damping: 30 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [rotateAmplitude, -rotateAmplitude]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-rotateAmplitude, rotateAmplitude]), springConfig);
  const scaleMotion = useMotionValue(1);
  const scale = useSpring(scaleMotion, springConfig);

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    scaleMotion.set(1);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      style={{
        width: containerWidth,
        height: containerHeight,
        rotateX,
        rotateY,
        scale,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => { setIsHovered(true); scaleMotion.set(scaleOnHover); }}
      onMouseLeave={handleMouseLeave}
      className="relative cursor-pointer"
    >
      {/* Glare effect */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          background: isHovered
            ? `radial-gradient(circle at ${
                ((x.get() + 0.5) * 100).toFixed(0)
              }% ${((y.get() + 0.5) * 100).toFixed(0)}%, rgba(255,255,255,0.15) 0%, transparent 60%)`
            : "none",
          zIndex: 10,
          pointerEvents: "none",
        }}
      />

      {imageSrc && (
        <img
          src={imageSrc}
          alt={altText}
          style={{
            width: imageWidth,
            height: imageHeight,
            objectFit: "cover",
            borderRadius: "inherit",
            display: "block",
          }}
        />
      )}

      {displayOverlayContent && overlayContent && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {overlayContent}
        </div>
      )}

      {children}

      {showTooltip && captionText && (
        <motion.figcaption
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
          transition={{ duration: 0.2 }}
          style={{
            position: "absolute",
            bottom: "-2.5rem",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(0,0,0,0.8)",
            color: "#fff",
            padding: "4px 12px",
            borderRadius: "8px",
            fontSize: "0.85rem",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            zIndex: 20,
          }}
        >
          {captionText}
        </motion.figcaption>
      )}
    </motion.div>
  );
};

export default TiltedCard;

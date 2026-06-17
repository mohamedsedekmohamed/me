import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

// شكل هندسي عائم بـ 3D
const Shape = ({ type, size, x, y, color, duration, delay, rotateX, rotateY }) => {
  const shapeStyle = {
    position: "absolute",
    left: `${x}%`,
    top: `${y}%`,
    width: size,
    height: size,
    opacity: 0.12,
    filter: "blur(0.5px)",
  };

  const variants = {
    animate: {
      y: [0, -30, 0],
      rotateX: [0, rotateX, 0],
      rotateY: [0, rotateY, 0],
      scale: [1, 1.1, 1],
      transition: {
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const renderShape = () => {
    switch (type) {
      case "cube":
        return (
          <div
            style={{
              width: "100%",
              height: "100%",
              background: `linear-gradient(135deg, ${color}80, ${color}20)`,
              border: `1px solid ${color}60`,
              borderRadius: "4px",
              boxShadow: `0 0 20px ${color}30, inset 0 0 20px ${color}10`,
              transform: "perspective(200px) rotateX(20deg) rotateY(20deg)",
            }}
          />
        );
      case "sphere":
        return (
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              background: `radial-gradient(circle at 35% 35%, ${color}90, ${color}10)`,
              boxShadow: `0 0 30px ${color}40, inset -5px -5px 15px rgba(0,0,0,0.3)`,
            }}
          />
        );
      case "ring":
        return (
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              border: `3px solid ${color}70`,
              boxShadow: `0 0 20px ${color}40, inset 0 0 20px ${color}20`,
              transform: "perspective(200px) rotateX(60deg)",
            }}
          />
        );
      case "triangle":
        return (
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: `${parseInt(size) / 2}px solid transparent`,
              borderRight: `${parseInt(size) / 2}px solid transparent`,
              borderBottom: `${size} solid ${color}40`,
              filter: `drop-shadow(0 0 10px ${color}60)`,
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <motion.div style={shapeStyle} variants={variants} animate="animate">
      {renderShape()}
    </motion.div>
  );
};

const FloatingShapes = ({ darkMode }) => {
  const shapes = [
    { type: "cube", size: "80px", x: 5, y: 15, color: "#3b82f6", duration: 8, delay: 0, rotateX: 30, rotateY: 45 },
    { type: "sphere", size: "60px", x: 88, y: 10, color: "#818cf8", duration: 10, delay: 1, rotateX: 20, rotateY: 30 },
    { type: "ring", size: "100px", x: 92, y: 60, color: "#60a5fa", duration: 12, delay: 2, rotateX: 40, rotateY: 20 },
    { type: "cube", size: "50px", x: 3, y: 70, color: "#a78bfa", duration: 9, delay: 0.5, rotateX: 25, rotateY: 35 },
    { type: "sphere", size: "40px", x: 50, y: 5, color: "#38bdf8", duration: 11, delay: 3, rotateX: 15, rotateY: 25 },
    { type: "ring", size: "70px", x: 75, y: 85, color: "#6366f1", duration: 7, delay: 1.5, rotateX: 50, rotateY: 30 },
    { type: "triangle", size: "60px", x: 20, y: 90, color: "#3b82f6", duration: 13, delay: 2.5, rotateX: 20, rotateY: 40 },
    { type: "cube", size: "45px", x: 60, y: 92, color: "#818cf8", duration: 8.5, delay: 4, rotateX: 35, rotateY: 25 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
      {shapes.map((shape, i) => (
        <Shape key={i} {...shape} />
      ))}
    </div>
  );
};

export default FloatingShapes;

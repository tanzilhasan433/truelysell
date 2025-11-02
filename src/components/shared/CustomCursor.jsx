"use client";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const move = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      // check if hovering a button, link or anything with 'cursor-hover' class
      const target = e.target.closest("a,Link, button, .cursor-hover");
      setIsHovering(!!target);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", handleMouseOver);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <div
      className={`pointer-events-none fixed top-0 left-0 z-[9999] transition-transform duration-200 ease-out`}
      style={{
        transform: `translate(${position.x - 8}px, ${position.y - 8}px)`,
      }}
    >
      <div
        className={`rounded-full transition-all duration-300 ease-out ${
          isHovering
            ? "w-14 h-14 bg-[var(--primary)]/30 scale-150 opacity-0"
            : "w-6 h-6 bg-[var(--primary)]/20 scale-100 opacity-100"
        }
        `}
      ></div>
    </div>
  );
}

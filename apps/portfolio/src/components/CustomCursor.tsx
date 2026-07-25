import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";

export default function CustomCursor() {
  const isTouch = useIsTouchDevice();
  const cursorRef = useRef<HTMLDivElement>(null);
  
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (isTouch) return;

    document.documentElement.classList.add("custom-cursor-active");

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const ticker = gsap.ticker.add(() => {
      const dt = 0.15;
      
      pos.current.x += (mouse.current.x - pos.current.x) * dt;
      pos.current.y += (mouse.current.y - pos.current.y) * dt;

      if (cursorRef.current) {
        gsap.set(cursorRef.current, {
          x: pos.current.x,
          y: pos.current.y
        });
      }
    });

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest('[data-cursor="hover"]')
      ) {
        gsap.to(cursorRef.current, {
          scale: 5,
          backgroundColor: "transparent",
          border: "1px solid rgb(53, 211, 153)",
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest('[data-cursor="hover"]')
      ) {
        gsap.to(cursorRef.current, {
          scale: 1,
          backgroundColor: "rgb(53, 211, 153)",
          border: "none",
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      gsap.ticker.remove(ticker);
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <>
      <style>{`
        .custom-cursor-active, .custom-cursor-active *:not(input):not(textarea) {
          cursor: none !important;
        }
      `}</style>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] will-change-transform mix-blend-difference"
        style={{
          backgroundColor: "rgb(53, 211, 153)",
          transform: "translate(-50%, -50%)",
        }}
      />
    </>
  );
}

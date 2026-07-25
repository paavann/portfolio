import { useRef, useState } from "react";
import gsap from "gsap";
import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glareOpacity?: number;
}

export default function TiltCard({
  children,
  className = "",
  maxTilt = 12,
  glareOpacity = 0.08
}: TiltCardProps) {
  const isTouch = useIsTouchDevice();
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch || !cardRef.current) return;

    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    
    const posX = (x / width) * 100;
    const posY = (y / height) * 100;
    
    setMousePos({ x: posX, y: posY });

    const rotateX = ((y / height) - 0.5) * -maxTilt * 2;
    const rotateY = ((x / width) - 0.5) * maxTilt * 2;

    const shadowX = ((x / width) - 0.5) * -20;
    const shadowY = ((y / height) - 0.5) * -20;

    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      boxShadow: `${shadowX}px ${shadowY}px 30px rgba(0,0,0,0.1)`,
      duration: 0.4,
      ease: "power3.out"
    });

    gsap.to(glareRef.current, {
      opacity: 1,
      duration: 0.4
    });
  };

  const onMouseLeave = () => {
    if (isTouch || !cardRef.current) return;

    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      boxShadow: "0px 0px 0px rgba(0,0,0,0)",
      duration: 0.4,
      ease: "power3.out"
    });

    gsap.to(glareRef.current, {
      opacity: 0,
      duration: 0.4
    });
  };

  if (isTouch) {
    return (
      <div className={`active:scale-[0.98] transition-transform duration-200 ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <div style={{ perspective: "1000px" }} className={className}>
      <div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="relative w-full h-full will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
        <div
          ref={glareRef}
          className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300"
          style={{
            borderRadius: "inherit",
            background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(255,255,255,${glareOpacity}), transparent 60%)`
          }}
        />
      </div>
    </div>
  );
}

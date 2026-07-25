import { useRef } from "react";
import gsap from "gsap";
import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";

interface MagneticWrapProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export default function MagneticWrap({ children, strength = 0.3, className = "" }: MagneticWrapProps) {
  const isTouch = useIsTouchDevice();
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch || !ref.current) return;

    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * strength;
    const y = (clientY - (top + height / 2)) * strength;

    gsap.to(ref.current, {
      x,
      y,
      duration: 1,
      ease: "power3.out"
    });
  };

  const onMouseLeave = () => {
    if (isTouch || !ref.current) return;

    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.3)"
    });
  };

  if (isTouch) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`relative inline-block ${className}`}
    >
      {children}
    </div>
  );
}

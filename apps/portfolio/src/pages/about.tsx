import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import placeholder from "../assets/profilePicture.jpg";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (contentRef.current) {
                gsap.fromTo(
                    contentRef.current,
                    { y: 30, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top 80%",
                            once: true,
                        },
                    }
                );
            }
        });

        return () => ctx.revert();
    }, []);

    return (
        <div ref={sectionRef} className="flex flex-col p-5 sm:p-7 lg:p-10 bg-[rgb(0_21_36)] w-full min-h-screen">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl text-white font-black ml-2 sm:ml-5">about me.</h1>
            <div ref={contentRef} className="flex flex-col lg:flex-row justify-between mt-7 sm:mt-10 gap-7 lg:gap-10 w-full opacity-0">
                {/* Left Column — Profile Image */}
                <div className="w-full lg:w-[38%]">
                    <img
                        src={placeholder}
                        alt="Pavan"
                        className="w-full h-[350px] sm:h-[400px] lg:h-full rounded-2xl object-cover shadow-lg border-2 border-[rgb(53,211,153)]"
                    />
                </div>
                {/* Right Column */}
                <div className="w-full lg:w-[60%] flex flex-col justify-center gap-6 p-3 sm:p-5 lg:p-10 rounded-2xl">
                    <p className="text-lg lg:text-xl font-extrabold text-white">
                        I'm Pavan — a developer who loves turning ideas into reality through code.
                        I'm deeply passionate about building software that solves real-world problems in creative and efficient ways.
                        Whether it's designing seamless user experiences or optimizing systems behind the scenes, I enjoy every part of the process.
                    </p>
                    <p className="text-base lg:text-lg font-semibold text-gray-300">
                        What drives me most is curiosity — I'm constantly learning, experimenting, and pushing myself to understand how things work (and how they can work better).
                        For me, development isn't just about writing code — it's about crafting meaningful solutions that make an impact.
                    </p>
                    <p className="text-base lg:text-lg font-semibold text-gray-300">
                        I'm always excited to learn, build, and grow through new challenges.
                        If you're passionate about solving real-world problems creatively, let's connect.
                        Feel free to reach out — I'd love to collaborate and create something impactful together.
                    </p>
                </div>
            </div>
        </div>
    );
}
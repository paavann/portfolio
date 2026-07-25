import { useEffect, useRef } from "react";
import gsap from "gsap";
import ContactMeButton from "@/components/contactButton";
import MagneticWrap from "@/components/MagneticWrap";
import { GithubLogo, LinkedinLogo, EnvelopeSimple, Phone, WhatsappLogo } from "phosphor-react";

const navItems = [
    { label: "about", href: "#about" },
    { label: "projects", href: "#projects" },
    { label: "blogs", href: "#blogs" },
]

const socialLinks = [
    { label: "GitHub", link: "https://github.com/paavann", icon: GithubLogo },
    { label: "LinkedIn", link: "https://www.linkedin.com/in/h-pavan-489020250/", icon: LinkedinLogo },
    { label: "Gmail", link: "mailto:pavanh.22826@gmail.com", icon: EnvelopeSimple },
    { label: "Phone", link: "tel:+919113202057", icon: Phone },
    { label: "WhatsApp", link: "https://wa.me/919113202057", icon: WhatsappLogo },
]

export default function Intro() {
    const orb1Ref = useRef<HTMLDivElement>(null);
    const orb2Ref = useRef<HTMLDivElement>(null);
    const orb3Ref = useRef<HTMLDivElement>(null);
    
    const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const socialRefs = useRef<(HTMLDivElement | null)[]>([]);
    const navRefs = useRef<(HTMLLIElement | null)[]>([]);
    const contactRef = useRef<HTMLDivElement>(null);

    const headlineText = "Hey there! I'm Pavan. I'm a professional Full Stack Developer. Scroll to get to know more about Me!";
    const words = headlineText.split(" ");

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Orbs animation
            if (orb1Ref.current) {
                gsap.to(orb1Ref.current, { x: "+=30", y: "-=20", duration: 10, ease: "sine.inOut", yoyo: true, repeat: -1 });
            }
            if (orb2Ref.current) {
                gsap.to(orb2Ref.current, { x: "-=25", y: "+=15", duration: 12, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1 });
            }
            if (orb3Ref.current) {
                gsap.to(orb3Ref.current, { x: "+=20", y: "+=30", duration: 14, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 2 });
            }

            const tl = gsap.timeline();

            // Nav items animation
            if (navRefs.current.length > 0) {
                tl.fromTo(
                    navRefs.current,
                    { opacity: 0, y: -20 },
                    { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.1 }
                );
            }

            // Contact button fade in
            if (contactRef.current) {
                tl.fromTo(contactRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.out" }, "-=0.2");
            }

            // Headline staggered animation
            if (wordRefs.current.length > 0) {
                tl.fromTo(
                    wordRefs.current,
                    { y: "110%", opacity: 0, rotateX: 40 },
                    { y: "0%", opacity: 1, rotateX: 0, duration: 0.8, ease: "power4.out", stagger: 0.06 },
                    "-=0.2"
                );
            }

            // Social links stagger-in
            if (socialRefs.current.length > 0) {
                tl.fromTo(
                    socialRefs.current,
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.08 }
                );
            }
        });

        return () => ctx.revert();
    }, []);

    return (
        <div className="relative overflow-hidden flex-1 flex-col w-full min-h-screen bg-[#F2F2F2] px-4 sm:px-5 pb-8">
            {/* Background Orbs */}
            <div ref={orb1Ref} className="absolute z-0 pointer-events-none rounded-full" style={{ width: "400px", height: "400px", right: "-5%", top: "10%", background: "rgba(53, 211, 153, 0.25)", filter: "blur(100px)" }} />
            <div ref={orb2Ref} className="absolute z-0 pointer-events-none rounded-full" style={{ width: "300px", height: "300px", left: "-5%", bottom: "20%", background: "rgba(0, 21, 36, 0.12)", filter: "blur(80px)" }} />
            <div ref={orb3Ref} className="absolute z-0 pointer-events-none rounded-full" style={{ width: "350px", height: "350px", left: "40%", top: "50%", background: "rgba(53, 211, 153, 0.15)", filter: "blur(100px)" }} />

            <div className="relative z-10 flex-col h-full w-full">
                <div className="hidden lg:flex items-center justify-between h-[18vh] w-full px-10 xl:px-60">
                    <nav className="h-full w-fit">
                        <ul className="flex items-center justify-center flex-row h-full w-full space-x-4 lg:space-x-7 xl:space-x-10">
                            {navItems.map(({ label, href }, i) => (
                                <li key={href} ref={(el) => { navRefs.current[i] = el; }} className="group relative overflow-hidden cursor-pointer opacity-0">
                                    <a href={href} className="relative z-10 font-extrabold text-2xl lg:text-3xl text-[rgb(0_21_36)] transition-colors duration-300 group-hover:text-white px-4 py-2 block">
                                        {label}
                                    </a>
                                    <span className="absolute top-1 bottom-0 left-2 right-2 m-0.5 bg-[rgb(0_21_36)] z-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <div ref={contactRef} className="opacity-0">
                        <ContactMeButton paddingTxt="11.5%" />
                    </div>
                </div>
                <div className="block lg:hidden h-[8vh] sm:h-[12vh]" />
                <div className="flex flex-col items-center flex-1 justify-end h-full">
                    <div className="w-full sm:w-[90%] lg:w-[80%] flex justify-center items-center flex-wrap gap-3 sm:gap-4 lg:gap-5 my-20">
                        {socialLinks.map(({ label, link, icon: Icon }, i) => (
                            <div key={label} ref={(el) => { socialRefs.current[i] = el; }} className="opacity-0">
                                <MagneticWrap>
                                    <div className="group relative overflow-hidden cursor-pointer inline-block w-fit rounded-md">
                                        <a href={link} target="_blank" rel="noreferrer" className="relative z-10 flex items-center gap-1.5 sm:gap-2 font-extrabold text-base sm:text-xl lg:text-3xl text-[rgb(0_21_36)] transition-colors duration-300 group-hover:text-white px-2 py-1.5 sm:px-3 sm:py-2 lg:px-4 lg:py-2">
                                            <Icon size={20} className="sm:!w-6 sm:!h-6 lg:!w-9 lg:!h-9" weight="fill" />
                                            <span>{label}</span>
                                        </a>
                                        <span className="absolute top-1 bottom-0 left-2 right-2 m-0.5 bg-[rgb(0_21_36)] z-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                                    </div>
                                </MagneticWrap>
                            </div>
                        ))}
                    </div>
                    <h1 className="font-black text-3xl sm:text-4xl lg:text-5xl xl:text-6xl w-[95%] sm:w-[80%] md:w-[70%] lg:w-[60%] text-center mt-6 sm:mt-0 pb-10 flex flex-wrap justify-center gap-[0.25em]">
                        {words.map((word, i) => (
                            <span key={i} className="inline-block overflow-hidden" style={{ perspective: "1000px" }}>
                                <span ref={(el) => { wordRefs.current[i] = el; }} className="inline-block opacity-0" style={{ transformOrigin: "50% 100%" }}>
                                    {word}
                                </span>
                            </span>
                        ))}
                    </h1>
                </div>
            </div>
        </div>
    );
}
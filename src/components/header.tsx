import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"



const navHeaderItems = [
    { label: "about", href: "#about" },
    { label: "projects", href: "#projects" },
    { label: "blog", href: "#blog" },
]

export default function Header() {
    const headerRef = useRef<HTMLElement | null>(null)

    const [isExpanded, setIsExpanded] = useState(false)
    const [showContent, setShowContent] = useState(false)
    const tl = gsap.timeline()


    useEffect(() => {
        const onScroll = () => {
            const scrollY = window.scrollY

            if(scrollY > 200 && !isExpanded) {
                tl.clear()
                tl.to(headerRef.current, {
                    opacity: 0,
                    y: -50,
                    height: 0,
                    duration: 0.3,
                    ease: "power2.inOut",
                })
                    .to(headerRef.current, {
                        opacity: 1,
                        y: 0,
                        height: "13vh",
                        duration: 0.3,
                        ease: "power2.inOut",
                        onComplete: () => setShowContent(true),
                    })

                setIsExpanded(true)
            } else if(scrollY < 200 && isExpanded) {
                tl.to(headerRef.current, {
                    opacity: 1,
                    y: 0,
                    height: "3vh",
                    duration: 0.3,
                    ease: "power2.inOut",
                    onComplete: () => setShowContent(false),
                })

                setIsExpanded(false)
            }
        }

        window.addEventListener("scroll", onScroll)
        return () => window.removeEventListener("scroll", onScroll)
    }, [isExpanded])

    return (
        <header
            ref={headerRef}
            className={`fixed top-0 left-0 w-full z-50 bg-[rgb(0_21_36)] overflow-hidden pl-[10%] pr-[10%] flex flex-row align-center`}
            style={{ height: "3vh", opacity: 1 }}
        >
            {showContent && (
                <nav className="h-full">
                    <ul className="flex flex-row justify-center align-center gap-7 h-full self-center">
                        {navHeaderItems.map(({ label, href }) => (
                            <li key={href} className="group relative overflow-hidden self-center cursor-pointer">
                                <a href={href} className="relative z-10 text-4xl text-white font-extrabold transition-colors duration-300 group-hover:text-black px-4 py-2 block">
                                    {label}
                                </a>
                                <span className="absolute top-1 bottom-0 left-2 right-2 m-0.5 bg-white z-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
        </header>
    )
}
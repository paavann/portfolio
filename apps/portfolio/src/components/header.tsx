import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import ContactMeButton from "./contactButton"
import { Link } from "react-router-dom"

const navHeaderItems = [
    { label: "about", href: "/#about" },
    { label: "projects", href: "/#projects" },
    { label: "blogs", href: "/#blogs" },
]

export default function Header({ isBlogPage = false }: { isBlogPage?: boolean }) {
    const headerRef = useRef<HTMLElement | null>(null)

    const [isExpanded, setIsExpanded] = useState(isBlogPage)
    const [showContent, setShowContent] = useState(isBlogPage)
    const tl = gsap.timeline()

    useEffect(() => {
        if (isBlogPage) return; // Disable scroll animation on blog pages

        const onScroll = () => {
            const scrollY = window.scrollY

            if (scrollY > 200 && !isExpanded) {
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
            } else if (scrollY < 200 && isExpanded) {
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isExpanded, isBlogPage])

    return (
        <header
            ref={headerRef}
            className="fixed top-0 left-0 w-full z-50 bg-[rgb(53_211_153)]/90 backdrop-blur-md overflow-hidden pl-5 pr-5"
            style={{ height: isBlogPage ? "13vh" : "3vh", opacity: 1 }}
        >
            {showContent && (
                <div className="h-full w-full flex items-center">
                    <div className="w-[20%]">
                        {!isBlogPage && (
                            <Link to="/">
                                <h1 className="text-4xl font-extrabold text-[rgb(0_21_36)] place-self-center cursor-pointer">Pavan.</h1>
                            </Link>
                        )}
                    </div>

                    <nav className="h-full w-[60%]">
                        <ul className="flex flex-row justify-start align-center gap-7 h-full self-center">
                            {isBlogPage ? (
                                <li className="group relative overflow-hidden self-center cursor-pointer">
                                    <Link to="/" className="relative z-10 text-3xl text-[rgb(0_21_36)] font-extrabold transition-colors duration-300 group-hover:text-white px-4 py-2 block">
                                        Back to Home
                                    </Link>
                                    <span className="absolute top-2 bottom-0 left-2 right-2 m-0.5 bg-[rgb(0_21_36)] z-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                                </li>
                            ) : (
                                navHeaderItems.map(({ label, href }) => (
                                    <li key={href} className="group relative overflow-hidden self-center cursor-pointer">
                                        <a href={href} className="relative z-10 text-3xl text-[rgb(0_21_36)] font-extrabold transition-colors duration-300 group-hover:text-white px-4 py-2 block">
                                            {label}
                                        </a>
                                        <span className="absolute top-2 bottom-0 left-2 right-2 m-0.5 bg-[rgb(0_21_36)] z-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                                    </li>
                                ))
                            )}
                        </ul>
                    </nav>

                    <div className="mr-20">
                        {!isBlogPage && <ContactMeButton paddingTxt="12%" />}
                    </div>
                </div>
            )}
        </header>
    )
}
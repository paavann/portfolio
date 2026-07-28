import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import ContactMeButton from "./contactButton"
import { Link } from "react-router-dom"
import { List, X } from "phosphor-react"
import MagneticWrap from "@/components/MagneticWrap"

const navHeaderItems = [
    { label: "about", href: "/#about" },
    { label: "projects", href: "/#projects" },
    { label: "blogs", href: "/#blogs" },
]

export default function Header({ isBlogPage = false }: { isBlogPage?: boolean }) {
    const headerRef = useRef<HTMLElement | null>(null)
    const contentRef = useRef<HTMLDivElement | null>(null)
    const tlRef = useRef<gsap.core.Timeline | null>(null)

    const [isExpanded, setIsExpanded] = useState(isBlogPage)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    // Use a ref to track expansion state so the scroll handler always has the latest value
    const isExpandedRef = useRef(isBlogPage)
    isExpandedRef.current = isExpanded

    useEffect(() => {
        if (isBlogPage) return;

        const onScroll = () => {
            const scrollY = window.scrollY
            const threshold = window.innerHeight * 0.75

            if (scrollY > threshold && !isExpandedRef.current) {
                if (tlRef.current) tlRef.current.kill()

                setIsExpanded(true)

                tlRef.current = gsap.timeline()
                
                tlRef.current.to(headerRef.current, {
                    y: "0vh",
                    duration: 0.5,
                    ease: "power3.out",
                })

                if (contentRef.current) {
                    tlRef.current.to(contentRef.current, { 
                        opacity: 1, 
                        duration: 0.3, 
                        ease: "power2.out" 
                    }, "-=0.3")
                }
            } else if (scrollY <= threshold && isExpandedRef.current) {
                if (tlRef.current) tlRef.current.kill()

                setIsExpanded(false)
                setMobileMenuOpen(false)

                tlRef.current = gsap.timeline()
                
                if (contentRef.current) {
                    tlRef.current.to(contentRef.current, {
                        opacity: 0,
                        duration: 0.2,
                        ease: "power2.in"
                    })
                }

                tlRef.current.to(headerRef.current, {
                    y: "-10vh",
                    duration: 0.5,
                    ease: "power3.inOut",
                }, "-=0.1")
            }
        }

        window.addEventListener("scroll", onScroll)
        return () => {
            window.removeEventListener("scroll", onScroll)
            if (tlRef.current) tlRef.current.kill()
        }
    }, [isBlogPage])

    const handleNavClick = () => {
        setMobileMenuOpen(false)
    }

    return (
        <>
            <header
                ref={headerRef}
                className="fixed top-0 left-0 w-full z-50 overflow-hidden px-3 sm:px-5"
                style={{ 
                    height: "13vh", 
                    transform: isBlogPage ? "translateY(0)" : "translateY(-10vh)",
                    opacity: 1,
                    background: 'rgba(53, 211, 153, 0.75)',
                    backdropFilter: 'blur(20px) saturate(120%)',
                    borderBottom: '1px solid rgba(53, 211, 153, 0.3)'
                }}
            >
                <div 
                    ref={contentRef} 
                    className="h-full w-full flex items-center justify-between lg:justify-start"
                    style={{ opacity: isBlogPage ? 1 : 0 }}
                >
                    <div className="lg:w-[20%]">
                        {!isBlogPage && (
                            <Link to="/">
                                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[rgb(0_21_36)] cursor-pointer">Pavan.</h1>
                            </Link>
                        )}
                    </div>

                    <nav className="hidden lg:block h-full w-[60%]">
                        <ul className="flex flex-row justify-start gap-7 h-full w-full">
                            {isBlogPage ? (
                                <li className="self-center">
                                    <MagneticWrap>
                                        <div className="group relative overflow-hidden cursor-pointer">
                                            <Link to="/" className="relative z-10 text-3xl text-[rgb(0_21_36)] font-extrabold transition-colors duration-300 group-hover:text-white px-4 py-2 block">
                                                Back to Home
                                            </Link>
                                            <span className="absolute top-2 bottom-0 left-2 right-2 m-0.5 bg-[rgb(0_21_36)] z-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                                        </div>
                                    </MagneticWrap>
                                </li>
                            ) : (
                                navHeaderItems.map(({ label, href }) => (
                                    <li key={href} className="self-center">
                                        <MagneticWrap>
                                            <div className="group relative overflow-hidden cursor-pointer">
                                                <a href={href} className="relative z-10 text-3xl text-[rgb(0_21_36)] font-extrabold transition-colors duration-300 group-hover:text-white px-4 py-2 block">
                                                    {label}
                                                </a>
                                                <span className="absolute top-2 bottom-0 left-2 right-2 m-0.5 bg-[rgb(0_21_36)] z-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                                            </div>
                                        </MagneticWrap>
                                    </li>
                                ))
                            )}
                        </ul>
                    </nav>

                    <div className="hidden lg:block mr-20">
                        {!isBlogPage && (
                            <MagneticWrap>
                                <ContactMeButton paddingTxt="12%" />
                            </MagneticWrap>
                        )}
                    </div>

                    <button
                        className="lg:hidden flex items-center justify-center p-2 cursor-pointer z-50"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? (
                            <X size={28} weight="bold" color="rgb(0,21,36)" />
                        ) : (
                            <List size={28} weight="bold" color="rgb(0,21,36)" />
                        )}
                    </button>
                </div>
            </header>

            {mobileMenuOpen && (
                <div className="fixed top-[13vh] left-0 w-full z-40 bg-[rgb(0_21_36)] lg:hidden animate-in slide-in-from-top-2 duration-300">
                    <nav className="flex flex-col p-5 gap-1">
                        {isBlogPage ? (
                            <Link
                                to="/"
                                onClick={handleNavClick}
                                className="text-xl font-extrabold text-white hover:text-[rgb(53_211_153)] transition-colors py-3 px-4 rounded-lg hover:bg-white/5"
                            >
                                Back to Home
                            </Link>
                        ) : (
                            <>
                                {navHeaderItems.map(({ label, href }) => (
                                    <a
                                        key={href}
                                        href={href}
                                        onClick={handleNavClick}
                                        className="text-xl font-extrabold text-white hover:text-[rgb(53_211_153)] transition-colors py-3 px-4 rounded-lg hover:bg-white/5"
                                    >
                                        {label}
                                    </a>
                                ))}
                                <div className="mt-4 px-4 pb-2">
                                    <ContactMeButton paddingTxt="8%" />
                                </div>
                            </>
                        )}
                    </nav>
                </div>
            )}
        </>
    )
}
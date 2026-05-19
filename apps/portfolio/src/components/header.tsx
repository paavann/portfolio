import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import ContactMeButton from "./contactButton"
import { Link } from "react-router-dom"
import { List, X } from "phosphor-react"

const navHeaderItems = [
    { label: "about", href: "/#about" },
    { label: "projects", href: "/#projects" },
    { label: "blogs", href: "/#blogs" },
]

export default function Header({ isBlogPage = false }: { isBlogPage?: boolean }) {
    const headerRef = useRef<HTMLElement | null>(null)

    const [isExpanded, setIsExpanded] = useState(isBlogPage)
    const [showContent, setShowContent] = useState(isBlogPage)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
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
                setMobileMenuOpen(false)
            }
        }

        window.addEventListener("scroll", onScroll)
        return () => window.removeEventListener("scroll", onScroll)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isExpanded, isBlogPage])

    // Close mobile menu when clicking a nav link
    const handleNavClick = () => {
        setMobileMenuOpen(false)
    }

    return (
        <>
            <header
                ref={headerRef}
                className="fixed top-0 left-0 w-full z-50 bg-[rgb(53_211_153)]/90 backdrop-blur-md overflow-hidden px-3 sm:px-5"
                style={{ height: isBlogPage ? "13vh" : "3vh", opacity: 1 }}
            >
                {showContent && (
                    <div className="h-full w-full flex items-center justify-between lg:justify-start">
                        {/* Logo / Brand */}
                        <div className="lg:w-[20%]">
                            {!isBlogPage && (
                                <Link to="/">
                                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[rgb(0_21_36)] cursor-pointer">Pavan.</h1>
                                </Link>
                            )}
                        </div>

                        {/* Desktop nav — hidden below lg */}
                        <nav className="hidden lg:block h-full w-[60%]">
                            <ul className="flex flex-row justify-start gap-7 h-full w-full">
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

                        {/* Desktop contact button — hidden below lg */}
                        <div className="hidden lg:block mr-20">
                            {!isBlogPage && <ContactMeButton paddingTxt="12%" />}
                        </div>

                        {/* Mobile hamburger button — shown below lg */}
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
                )}
            </header>

            {/* Mobile dropdown menu overlay */}
            {mobileMenuOpen && showContent && (
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
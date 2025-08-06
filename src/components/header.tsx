import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"



export default function Header() {
    const headerRef = useRef<HTMLElement | null>(null)

    const [isExpanded, setIsExpanded] = useState(false)
    const tl = gsap.timeline()


    useEffect(() => {
        const onScroll = () => {
            const scrollY = window.scrollY

            if(scrollY > 200 && !isExpanded) {
                tl.to(headerRef.current, {
                    opacity: 0,
                    y: -50,
                    height: 0,
                    duration: 0.5,
                    ease: "power2.inOut",
                })

                tl.to(headerRef.current, {
                    opacity: 1,
                    y: 0,
                    height: "13vh",
                    duration: 0.5,
                    ease: "power2.inOut",
                })

                setIsExpanded(true)
            } else if(scrollY < 200 && isExpanded) {
                tl.to(headerRef.current, {
                    opacity: 1,
                    y: 0,
                    height: "3vh",
                    duration: 0.5,
                    ease: "power2.inOut",
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
            className={`fixed top-0 left-0 w-full z-50 bg-[rgb(0_21_36)] overflow-hidden`}
            style={{ height: "3vh", opacity: 1 }}
        >
        </header>
    )
}
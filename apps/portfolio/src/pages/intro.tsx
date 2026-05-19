import ContactMeButton from "@/components/contactButton"
import { GithubLogo, LinkedinLogo, EnvelopeSimple, Phone, WhatsappLogo } from "phosphor-react"

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

    return (
        <div className="flex-1 flex-col w-full h-full bg-[#F2F2F2] px-4 sm:px-5 pb-8">
            {/* Nav row — hidden on mobile (header hamburger handles it), shown on lg+ */}
            <div className="hidden lg:flex items-center justify-between h-[27vh] w-full px-10 xl:px-60">
                <nav className="h-full w-fit">
                    <ul className="flex items-center justify-center flex-row h-full w-full space-x-4 lg:space-x-7 xl:space-x-10">
                        {navItems.map(({ label, href }) => (
                            <li key={href} className="group relative overflow-hidden cursor-pointer">
                                <a href={href} className="relative z-10 font-extrabold text-2xl lg:text-3xl text-[rgb(0_21_36)] transition-colors duration-300 group-hover:text-white px-4 py-2 block">
                                    {label}
                                </a>
                                <span className="absolute top-1 bottom-0 left-2 right-2 m-0.5 bg-[rgb(0_21_36)] z-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                            </li>
                        ))}
                    </ul>
                </nav>

                <ContactMeButton paddingTxt="11.5%" />
            </div>

            {/* Spacer for mobile — the intro nav is hidden, so we need top spacing */}
            <div className="block lg:hidden h-[8vh] sm:h-[12vh]" />

            <div className="h-[-webkit-fill-available] flex flex-col items-center flex-1 justify-end">
                <div className="w-full sm:w-[90%] lg:w-[80%] flex justify-center items-center flex-wrap gap-3 sm:gap-4 lg:gap-5 my-20">
                    {socialLinks.map(({ label, link, icon: Icon }) => (
                        <div key={label} className="group relative overflow-hidden cursor-pointer inline-block w-fit rounded-md">
                            <a href={link} target="_blank" className="relative z-10 flex items-center gap-1.5 sm:gap-2 font-extrabold text-base sm:text-xl lg:text-3xl text-[rgb(0_21_36)] transition-colors duration-300 group-hover:text-white px-2 py-1.5 sm:px-3 sm:py-2 lg:px-4 lg:py-2">
                                <Icon size={20} className="sm:!w-6 sm:!h-6 lg:!w-9 lg:!h-9" weight="fill" />
                                <span>{label}</span>
                            </a>
                            <span className="absolute top-1 bottom-0 left-2 right-2 m-0.5 bg-[rgb(0_21_36)] z-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                        </div>
                    ))}
                </div>
                <h1 className="font-extrabold text-5xl sm:text-3xl md:text-3xl lg:text-5xl w-[95%] sm:w-[80%] md:w-[70%] lg:w-[60%] text-center mt-6 sm:mt-0">
                    Hey there! I&apos;m Pavan. I&apos;m a professional Full Stack Developer. Scroll to get to know more about Me!
                </h1>
            </div>
        </div>
    )
}
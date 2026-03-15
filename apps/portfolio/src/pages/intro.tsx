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
        <div className="flex flex-col w-full h-full bg-[#F2F2F2] pl-5 pr-5 pb-15">
            <div className="flex items-center justify-between h-[27vh] w-full pl-60 pr-60">
                <nav className="h-full w-fit">
                    <ul className="flex items-center justify-center flex-row h-full w-full space-x-10">
                        {navItems.map(({ label, href }) => (
                            <li key={href} className="group relative overflow-hidden cursor-pointer">
                                <a href={href} className="relative z-10 font-extrabold text-3xl text-[rgb(0_21_36)] transition-colors duration-300 group-hover:text-white px-4 py-2 block">
                                    {label}
                                </a>
                                <span className="absolute top-1 bottom-0 left-2 right-2 m-0.5 bg-[rgb(0_21_36)] z-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                            </li>
                        ))}
                    </ul>
                </nav>

                <ContactMeButton paddingTxt="11.5%" />
            </div>

            <div className="h-[-webkit-fill-available] flex flex-col items-center flex-1">
                <div className="w-[80%] flex justify-center items-center gap-5 my-auto">
                    {socialLinks.map(({ label, link, icon: Icon }) => (
                        <div key={label} className="group relative overflow-hidden cursor-pointer inline-block w-fit rounded-md">
                            <a href={link} target="_blank" className="relative z-10 flex items-center gap-2 font-extrabold text-3xl text-[rgb(0_21_36)] transition-colors duration-300 group-hover:text-white px-4 py-2">
                                <Icon size={36} weight="fill" />
                                <span>{label}</span>
                            </a>
                            <span className="absolute top-1 bottom-0 left-2 right-2 m-0.5 bg-[rgb(0_21_36)] z-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                        </div>
                    ))}
                </div>
                <h1 className="font-extrabold text-5xl w-[60%] text-center">
                    Hey there! I&apos;m Pavan. I&apos;m a professional Full Stack Developer. Scroll to get to know more about Me!
                </h1>
            </div>
        </div>
    )
}
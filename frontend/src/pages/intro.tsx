import ContactMeButton from "@/components/contactButton"

const navItems = [
    { label: "about", href: "#about" },
    { label: "projects", href: "#projects" },
    { label: "blogs", href: "#blog" },
]

export default function Intro() {

    return (
        <div className="flex flex-col w-full h-full bg-[#F2F2F2] pl-5 pr-5 pb-15">
            <div className="flex items-center justify-between h-[27vh] w-full pl-60 pr-60">
                <nav className="h-full w-fit">
                    <ul className="flex items-center justify-center flex-row h-full w-full space-x-10">
                        {navItems.map(({label, href}) => (
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

            <div className="h-[-webkit-fill-available] flex justify-center items-end">
                <h1 className="font-extrabold text-5xl w-[60%]">
                    Hey there! I'm Pavan. I'm a professional Web Developer. Scroll to get to know more about Me!
                </h1>
            </div>
        </div>
    )
}
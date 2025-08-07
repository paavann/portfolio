import { Button } from "@/components/ui/button"

const navItems = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Blog", href: "#blog" },
]

export default function Intro() {

    return (
        <div className="flex flex-col w-full h-full bg-[#F2F2F2] pl-5 pr-5">
            <div className="flex items-center justify-between h-[27vh] w-full pl-60 pr-60">
                <aside className="h-full w-fit">
                    <ul className="flex items-center justify-center flex-row h-full w-full space-x-10">
                        {navItems.map(({label, href}) => (
                            <li key={href}>
                                <a href={href}>
                                    <h2 className="font-bold text-4xl text-black">{label}</h2>
                                </a>
                            </li>
                        ))}
                    </ul>
                </aside>

                <Button
                    className="relative overflow-hidden px-7 py-7 pl-5 pr-5 text-4xl font-bold text-black group cursor-pointer rounded-xl"
                    variant="ghost"
                >
                    <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                        Contact Me
                    </span>
                    <span className="absolute inset-0 bg-black z-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                </Button>
            </div>

            <h1 className="relative font-extrabold text-5xl w-[50%] self-center">
                Hey there! I'm Pavan. I'm a professional Web Developer. Scroll to get to know more about Me!
            </h1>
        </div>
    )
}
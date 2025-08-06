const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contacts" },
]

export default function Intro() {

    return (
        <div className="flex flex-column w-full h-full bg-[#F2F2F2]">
            <aside className="h-[27vh] w-full">
                <ul className="flex items-center justify-center flex-row h-full w-full space-x-10">
                    {navItems.map(({label, href}) => (
                        <li key={href}>
                            <a href={href}>
                                <h2 className="font-bold text-5xl">{label}</h2>
                            </a>
                        </li>
                    ))}
                </ul>
            </aside>
        </div>
    )
}
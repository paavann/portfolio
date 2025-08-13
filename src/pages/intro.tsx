import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerTrigger,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerFooter,
    DrawerDescription,
    DrawerClose
} from "@/components/ui/drawer"

import { PaperPlaneTilt } from "phosphor-react"
import { Envelope } from "phosphor-react"



const navItems = [
    { label: "about", href: "#about" },
    { label: "projects", href: "#projects" },
    { label: "blog", href: "#blog" },
]

export default function Intro() {

    return (
        <div className="flex flex-col w-full h-full bg-[#F2F2F2] pl-5 pr-5">
            <div className="flex items-center justify-between h-[27vh] w-full pl-60 pr-60">
                <nav className="h-full w-fit">
                    <ul className="flex items-center justify-center flex-row h-full w-full space-x-10">
                        {navItems.map(({label, href}) => (
                            <li key={href} className="group relative overflow-hidden cursor-pointer">
                                <a href={href} className="relative z-10 font-extrabold text-3xl text-black transition-colors duration-300 group-hover:text-white px-4 py-2 block">
                                    {label}
                                </a>
                                <span className="absolute top-1 bottom-0 left-2 right-2 m-0.5 bg-black z-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                            </li>
                        ))}
                    </ul>
                </nav>

                <Drawer>
                    <DrawerTrigger asChild>
                        <Button
                            variant="outline"
                            className=" relative overflow-hidden p-[2%] border-4 border-black bg-transparent group cursor-pointer"
                        >
                            <span className="absolute top-0 bottom-0 left-0 right-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0" />
                            <span className="relative z-10 text-3xl text-black font-extrabold group-hover:text-white self-center mb-1">
                                contact me
                            </span>
                        </Button>
                    </DrawerTrigger>

                    <DrawerContent className="w-[70%] justify-self-center bg-[rgb(0_21_36)]">
                        <DrawerHeader>
                            <DrawerTitle className="flex justify-center items-center gap-2">
                                <Envelope size={45} color="white" />
                                <span className="text-4xl font-extrabold text-white mb-[0.5%]">Contact me</span>
                            </DrawerTitle>
                            <DrawerDescription className="text-1xl">Please fill in your details and message if you'd like to work with me. I'll get back to you. :)</DrawerDescription>
                        </DrawerHeader>

                        <div className="flex flex-col justify-center items-center p-10 gap-3 text-white">
                            <input
                                type="text"
                                placeholder="Name"
                                className="border p-2 rounded w-[95%] border-2 border-white placeholder-gray-300"
                            />
                            <input
                                type="text"
                                placeholder="E-Mail"
                                className="border p-2 rounded w-[95%] border-2 border-white placeholder-gray-300"
                            />
                            <textarea
                                placeholder="Your Message"
                                rows={4}
                                className="border p-2 rounded w-[95%] border-2 border-white placeholder-gray-300 mt-[2%]"
                            />
                        </div>

                        <DrawerFooter className="pl-[6%] pr-[6%] flex flex-row w-full h-full justify-between items-center">
                            <Button
                                variant="secondary"
                                className="cursor-pointer"
                            >
                                <PaperPlaneTilt size={32} weight="fill" />Send
                            </Button>
                            <DrawerClose asChild>
                                <Button
                                    variant="destructive"
                                    className="cursor-pointer"
                                >
                                    Cancel
                                </Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </div>

            <h1 className="relative font-extrabold text-5xl w-[50%] self-center justify-self-end">
                Hey there! I'm Pavan. I'm a professional Web Developer. Scroll to get to know more about Me!
            </h1>
        </div>
    )
}
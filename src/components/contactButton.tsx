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



export default function ContactMeButton({ paddingTxt, }: { paddingTxt: string }) {

    return (
        <div>
                <Drawer>
                    <DrawerTrigger asChild>
                        <Button
                            variant="outline"
                            style={{ padding: paddingTxt || "2.5%" }}
                            className=" relative overflow-hidden border-4 border-[rgb(0_21_36)] bg-transparent group cursor-pointer"
                        >
                            <span className="absolute top-0 bottom-0 left-0 right-0 bg-[rgb(0_21_36)] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0" />
                            <span
                                className="relative z-10 text-3xl text-[rgb(0_21_36)] font-extrabold group-hover:text-white self-center mb-1"
                            >
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
                            <DrawerDescription className="text-1xl text-[rgb(200,210,220)]">Please fill in your details and message if you'd like to work with me. I'll get back to you. :)</DrawerDescription>
                        </DrawerHeader>

                        <div className="flex flex-col justify-center items-center p-10 gap-3 text-white">
                            <input
                                type="text"
                                placeholder="Name"
                                className="border p-2 rounded w-[95%] border-2 border-white placeholder-gray-300 pl-5"
                            />
                            <input
                                type="text"
                                placeholder="E-Mail"
                                className="border p-2 rounded w-[95%] border-2 border-white placeholder-gray-300 pl-5"
                            />
                            <textarea
                                placeholder="Your Message"
                                rows={4}
                                className="border p-2 rounded w-[95%] border-2 border-white placeholder-gray-300 mt-[2%] pl-5"
                            />
                        </div>

                        <DrawerFooter className="pl-[6%] pr-[6%] flex flex-row w-full h-full justify-between items-center">
                            <Button
                                variant="secondary"
                                className="cursor-pointer"
                            >
                                <PaperPlaneTilt size={32} weight="fill" />
                                <span className="font-extrabold">Send</span>
                            </Button>
                            <DrawerClose asChild>
                                <Button
                                    variant="destructive"
                                    className="cursor-pointer"
                                >
                                    <span className="font-extrabold text-white">Cancel</span>
                                </Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
        </div>
    )
}
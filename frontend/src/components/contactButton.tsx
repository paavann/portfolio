import { useEffect, useState, useRef } from "react"
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
import { useForm, ValidationError } from "@formspree/react"
import gsap from "gsap"



export default function ContactMeButton({ paddingTxt, }: { paddingTxt: string }) {
    const [state, handleSubmit] = useForm("mldoydyw")
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [alertMsg, setAlertMsg] =useState("")
    const alertRef = useRef<HTMLDivElement | null>(null)


    useEffect(() => {
        if(state.succeeded) {
            
            const drawerTimer = setTimeout(() => {
                setDrawerOpen(false)
                
                setTimeout(() => {
                    setAlertMsg("Thanks for taking your time! you response has been submitted successfully. I'll reach out to you as soon as possible :)")
                    gsap.fromTo(alertRef.current,
                        { y: -80, opacity: 0 },
                        { y: 0, opacity: 0.9, duration: 0.5, ease: "power3.out" }
                    )

                    setTimeout(() => {
                        gsap.to(alertRef.current, {
                            y: -80,
                            opacity: 0,
                            duration: 0.5,
                            ease: "power3.in",
                            onComplete: () => setAlertMsg("")
                        })
                    }, 3000)
                }, 600)
            }, 1500)

            return () => clearTimeout(drawerTimer)
        }
    }, [state.succeeded])

    useEffect(() => {
        if(!drawerOpen && state.succeeded) {
            state.succeeded = false
            const form = document.querySelector("form") as HTMLFormElement
            if(form) form.reset
        }
    }, [drawerOpen])

    return (
        <div>
            {alertMsg && (
                <div
                    ref={alertRef}
                    className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-[rgb(0_21_36)] text-white p-3 rounded-md shadow-lg z-50 opacity-90 backdrop-blur-sm"
                >
                    <h1 className="text-xl font-semibold text-white">{alertMsg}</h1>
                </div>
            )}
                <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
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

                        <form
                            className="flex flex-col justify-center items-center p-10 gap-3 text-white"
                            onSubmit={handleSubmit}
                        >
                            <input
                                id="name"
                                type="text"
                                name="name"
                                placeholder="Name"
                                className="border p-2 rounded w-[95%] border-2 border-white placeholder-gray-300 pl-5"
                            />

                            <input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="E-Mail"
                                className="border p-2 rounded w-[95%] border-2 border-white placeholder-gray-300 pl-5"
                                required
                            />
                            <ValidationError prefix="Email" field="email" errors={state.errors} />

                            <textarea
                                id="message"
                                name="message"
                                placeholder="Your Message"
                                rows={4}
                                className="border p-2 rounded w-[95%] border-2 border-white placeholder-gray-300 mt-[2%] pl-5"
                                required
                            />
                            <ValidationError prefix="message" field="message" errors={state.errors} />
                        

                            <DrawerFooter className="pl-[3%] pr-[3%] flex flex-row w-full h-full justify-between items-center">
                                <Button
                                    type="submit"
                                    variant="secondary"
                                    className={`cursor-pointer transition-all duration-300 ${
                                        state.succeeded ? "bg-green-600 hover:bg-green-700" : ""
                                    }`}
                                    disabled={state.submitting}
                                >
                                    <PaperPlaneTilt size={32} weight="fill" />
                                    <span className="font-extrabold">{state.submitting ? "Sending..." : state.succeeded ? "Sent!" : "Send"}</span>
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
                        </form>
                    </DrawerContent>
                </Drawer>
        </div>
    )
}
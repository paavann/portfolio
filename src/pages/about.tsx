import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

import reactLogo from "../assets/react.svg"




const skills = [
  { name: "React", logo: reactLogo, link: "#" },
  { name: "Next.js", logo: reactLogo, link: "#" },
  { name: "NodeJS", logo: reactLogo, link: "#" },
  { name: "fastapi", logo: reactLogo, link: "#" },
  { name: "tensorflow", logo: reactLogo, link: "#" },
  { name: "python", logo: reactLogo, link: "#" },
  { name: "c++", logo: reactLogo, link: "#" },
  { name: "c", logo: reactLogo, link: "#" },
  { name: "js", logo: reactLogo, link: "#" },
  // Add more skills here
];

export default function About() {

    return (
        <div className="w-screen h-[87vh] flex flex-row bg-[#F2F2F2]">
            <div className="w-[60%] h-full p-[2%]">
                <h1 className="text-5xl text-black font-extrabold">about me.</h1>

                <Carousel className="w-full max-w-xs">
                    <CarouselContent>
                        {skills.map((skill, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                <a href={skill.link} target="_blank" rel="noopener noreferrer">
                                    <div className="p-1">
                                        <Card>
                                            <CardContent className="flex aspect-square items-center justify-center p-6">
                                                <img
                                                    src={skill.logo}
                                                    alt={skill.name}
                                                    className="w-12 h-12 mb-2"
                                                />
                                                <span className="text-sm text-center">{skill.name}</span>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </a>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
            <div className="w-[40%] h-full">section 2</div>
        </div>
    )
}
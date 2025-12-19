import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { GithubLogo, Link } from "phosphor-react"

export default function Projects() {
    const projects = [
        {
            logo: "Harmoni.Ai",
            name: "harmoni",
            description: "AI-powered journaling app for emotional awareness and mindfulness.",
            link: "https://github.com/paavann/Harmoni.git",
            techStack: ["NextJS", "Django", "PostgreSQL", "Redux"],
        },
        {
            logo: "Real-Time Code Editor",
            name: "harmoni",
            description: "AI-powered journaling app for emotional awareness and mindfulness.",
            link: "https://github.com/paavann/Harmoni.git",
            techStack: ["ReactJS", "FastAPI", "WebSockets",],
        },
        {
            logo: "Social Matrix.",
            name: "social matrix",
            description: "AI platform that decodes social media trends and audience sentiment.",
            link: "https://github.com/ShreevathsaR/socialmatrix-backend.git",
            techStack: ["NextJS", "Node.js", "HuggingFace API", "Puppeteer"],
        },
        {
            logo: "3D School",
            name: "3d school",
            description: "3D learning platform merging interactivity with GPT-powered education.",
            link: "https://github.com/paavann/3D-SCHOOL.git",
            techStack: ["ReactJS", "NodeJS", "OpenAI API",],
        },
        {
            logo: "Potato Diagnostic System",
            name: "potato diagnostic system",
            description: "ML-based system that detects potato leaf diseases from images.",
            link: "https://github.com/paavann/Potato-Disease-Diagnostic-System.git",
            techStack: ["FastAPI", "Tensorflow", "Keras API",],
        },
    ]


    return (
        <div className="bg-[#F2F2F2] w-full p-10 gap-10 flex flex-col">
            <h1 className="text-5xl text-black font-extrabold ml-5">projects.</h1>

            <div className="w-full flex flex-wrap gap-10">
                {projects.map((project, index) => (
                    <Card
                        className="h-fit w-[30%] border-[rgb(0_21_36)] border-5 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 py-0"
                        key={index}
                    >
                        <div className="flex justify-end px-5 gap-3 mt-1">
                            <a href={project.link} target="_blank" rel="noopener noreferrer">
                                <GithubLogo size={28} color="#001524" weight="bold" />
                            </a>
                            <Link size={28} color="#001524" weight="bold" />
                        </div>
                        <CardHeader className="flex items-center justify-center">
                            <h2 className="text-2xl font-extrabold text-black">
                                {project.logo}
                            </h2>
                        </CardHeader>

                       <CardContent className="flex flex-col pl-3 pr-3 pb-0 pt-4 justify-end">
                            <p className="text-md font-extrabold text-black">
                                {project.description}
                            </p>
                        </CardContent>

                       <CardContent className="h-fit flex flex-col bg-[rgb(0_21_36)] p-3 mb-0 flex flex-row flex-wrap gap-3">
                            {project.techStack?.map((tech) => (
                                <div className="bg-white rounded-md p-1 px-3 w-fit">
                                    <h3 className="self-center text-[rgb(0_21_36)] font-extrabold">{tech}</h3>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
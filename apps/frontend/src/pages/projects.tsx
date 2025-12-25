import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { GithubLogo, Link } from "phosphor-react"
import type { Project } from "@/types/projects"



export default function Projects({ projects }: { projects: Project[] }) {

    return (
        <div className="bg-[#F2F2F2] w-full p-10 gap-10 flex flex-col">
            <div className="p-5 h-fit w-full gap-7 flex flex-col">
                <h1 className="text-5xl text-black font-extrabold">projects.</h1>
                <h2 className="text-3xl text-black font-extrabold">
                    These projects aren’t just deliverables—they’re learning experiments where I continuously push my limits and expand my technical skill set.
                </h2>
            </div>

            <div className="w-full flex flex-wrap gap-10 mt-5">
                {projects.map((project, index) => (
                    <Card
                        className="h-fit w-[30%] border-[rgb(0_21_36)] border-5 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 py-0"
                        key={index}
                    >
                        <div className="flex justify-end px-5 gap-3 mt-1">
                            <a href={project.git} target="_blank" rel="noopener noreferrer">
                                <GithubLogo size={28} color="#001524" weight="bold" />
                            </a>
                            {project.link && (
                                <a href={project.link} target="_blank" rel="noopener noreferrer">
                                    <Link size={28} color="#001524" weight="bold" />
                                </a>
                            )}
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
                                <div key={tech} className="bg-white rounded-md p-1 px-3 w-fit">
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
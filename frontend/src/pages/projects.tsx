export default function Projects() {
    const projects = [
        {
            logo: "Harmoni.Ai",
            name: "harmoni",
            description: "AI-powered journaling app for emotional awareness and mindfulness.",
            link: "https://github.com/paavann/Harmoni.git"
        },
        {
            logo: "Social Matrix.",
            name: "social matrix",
            description: "AI platform that decodes social media trends and audience sentiment.",
            link: "https://github.com/ShreevathsaR/socialmatrix-backend.git",
        },
        {
            logo: "3D School",
            name: "3d school",
            description: "3D learning platform merging interactivity with GPT-powered education.",
            link: "https://github.com/paavann/3D-SCHOOL.git",
        },
        {
            logo: "Potato Diagnostic System",
            name: "potato diagnostic system",
            description: "ML-based system that detects potato leaf diseases from images.",
            link: "https://github.com/paavann/Potato-Disease-Diagnostic-System.git",
        },
    ]


    return (
        <div className="bg-[#F2F2F2] w-full p-10 gap-10 flex flex-col">
            <h1 className="text-5xl text-black font-extrabold ml-5">projects.</h1>

            <div className="w-full flex flex-wrap gap-10">
                {projects.map((project, index) => (
                    <a
                        key={index}
                        href={project.link}
                        target="_blank"
                        className="w-[30%] rounded-md border-5 flex flex-col h-[32vh] border-[rgb(0_21_36)] cursor-pointer transform hover:scale-105 transition-transform duration-300 ease-in-out"
                    >
                        <div className="h-[40%] flex justify-center items-center">
                            <h1 className="text-2xl font-extrabold text-black mt-5">{project.logo}</h1>
                        </div>
                        <div className="h-[60%] p-3 flex flex-col gap-3">
                            <h1 className="text-xl text-black font-extrabold">{project.name}</h1>
                            <h1 className="text-md text-black font-extrabold">{project.description}</h1>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    )
}
import placeholder from "../assets/placeholder.avif"

export default function About() {

    return (
        <div className="flex flex-col p-10 bg-[rgb(0_21_36)] w-full">
            <h1 className="text-5xl text-white font-extrabold ml-5">about me.</h1>

            <div className="flex flex-row justify-between mt-10 h-[-webkit-fill-available]">
                <img
                    src={placeholder}
                    alt="Pavan"
                    className="h-[-webkit-fill-available] w-[35%] rounded-2xl shadow-lg"
                />

                <div className="w-[60%]">
                    <div className="flex flex-col gap-7 p-10 rounded-2xl h-[-webkit-fill-available]">
                        <p className="text-xl text-white font-extrabold">
                            Hey there!!! I’m Pavan — a developer who loves turning ideas into reality through code.
                            I’m deeply passionate about building software that solves real-world problems in creative and efficient ways.
                            Whether it’s designing seamless user experiences or optimizing systems behind the scenes, I enjoy every part of the process.
                        </p>
                        <p className="text-xl text-white font-extrabold">
                            What drives me most is curiosity — I’m constantly learning, experimenting, and pushing myself to understand how things work (and how they can work better).
                            For me, development isn’t just about writing code — it’s about crafting meaningful solutions that make an impact.
                        </p>
                        <p className="text-xl text-white font-extrabold">
                            I’m always excited to learn, build, and grow through new challenges.
                            If you’re passionate about solving real-world problems creatively, let’s connect.
                            Feel free to reach out — I’d love to collaborate and create something impactful together.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
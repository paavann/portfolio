import placeholder from "../assets/profilePicture.jpg"

export default function About() {

    return (
        <div className="flex flex-col p-5 sm:p-7 lg:p-10 bg-[rgb(0_21_36)] w-full">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl text-white font-extrabold ml-2 sm:ml-5">about me.</h1>

            <div className="flex flex-col lg:flex-row justify-between mt-7 sm:mt-10 gap-7 lg:gap-0 h-[-webkit-fill-available]">
                <img
                    src={placeholder}
                    alt="Pavan"
                    className="w-full lg:w-[35%] max-h-[350px] sm:max-h-[400px] lg:max-h-none lg:h-[-webkit-fill-available] rounded-2xl shadow-lg object-cover"
                />

                <div className="w-full lg:w-[60%]">
                    <div className="flex flex-col gap-5 sm:gap-7 p-3 sm:p-5 lg:p-10 rounded-2xl h-[-webkit-fill-available]">
                        <p className="text-base sm:text-lg lg:text-xl text-white font-extrabold">
                            I'm Pavan — a developer who loves turning ideas into reality through code.
                            I'm deeply passionate about building software that solves real-world problems in creative and efficient ways.
                            Whether it's designing seamless user experiences or optimizing systems behind the scenes, I enjoy every part of the process.
                        </p>
                        <p className="text-base sm:text-lg lg:text-xl text-white font-extrabold">
                            What drives me most is curiosity — I'm constantly learning, experimenting, and pushing myself to understand how things work (and how they can work better).
                            For me, development isn't just about writing code — it's about crafting meaningful solutions that make an impact.
                        </p>
                        <p className="text-base sm:text-lg lg:text-xl text-white font-extrabold">
                            I'm always excited to learn, build, and grow through new challenges.
                            If you're passionate about solving real-world problems creatively, let's connect.
                            Feel free to reach out — I'd love to collaborate and create something impactful together.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
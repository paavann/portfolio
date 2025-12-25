import Header from "./components/header"
import About from "./pages/about"
import Blogs from "./pages/blogs"
import Intro from "./pages/intro"
import Projects from "./pages/projects"
import { projects } from "./data/projects"



function App() {

  return (
    <>
      <Header />

      <main id="intro" className="w-screen h-screen">
        <Intro />
      </main>

      <section id="about" className="w-screen h-fit">
        <About />
      </section>

      <section id="projects" className="w-screen h-fit">
        <Projects projects={projects} />
      </section>

      <section id="blogs" className="w-screen h-fit">
        <Blogs />
      </section>
    </>
  )
}

export default App
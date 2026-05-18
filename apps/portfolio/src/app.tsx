import { Routes, Route } from "react-router-dom"
import Header from "./components/header"
import About from "./pages/about"
import Blogs from "./pages/blogs"
import Intro from "./pages/intro"
import Projects from "./pages/projects"
import AllBlogs from "./pages/all-blogs"
import BlogPost from "./pages/blog-post"
import { projects } from "./data/projects"

function Home() {
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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blogs" element={<AllBlogs />} />
      <Route path="/blogs/:slug" element={<BlogPost />} />
    </Routes>
  )
}

export default App
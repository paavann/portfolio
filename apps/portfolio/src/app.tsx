import { Routes, Route } from "react-router-dom"
import Header from "./components/header"
import About from "./pages/about"
import Blogs from "./pages/blogs"
import Intro from "./pages/intro"
import Projects from "./pages/projects"
import AllBlogs from "./pages/all-blogs"
import BlogPost from "./pages/blog-post"
import { projects } from "./data/projects"
import CustomCursor from "./components/CustomCursor"
import Footer from "./components/footer"
import PageTransition from "./components/PageTransition"

function Home() {
  return (
    <PageTransition>
      <Header />

      <main id="intro" className="w-screen min-h-screen overflow-x-hidden">
        <Intro />
      </main>

      <section id="about" className="w-screen h-fit overflow-x-hidden">
        <About />
      </section>

      <section id="projects" className="w-screen h-fit overflow-x-hidden">
        <Projects projects={projects} />
      </section>

      <section id="blogs" className="w-screen h-fit overflow-x-hidden">
        <Blogs />
      </section>
      
      <Footer />
    </PageTransition>
  )
}

function App() {
  return (
    <>
      <CustomCursor />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<PageTransition><AllBlogs /></PageTransition>} />
        <Route path="/blogs/:slug" element={<PageTransition><BlogPost /></PageTransition>} />
      </Routes>
    </>
  )
}

export default App
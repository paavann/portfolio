import Header from "./components/header"
import About from "./pages/about"
import Blogs from "./pages/blogs"
import Intro from "./pages/intro"
import Projects from "./pages/projects"




function App() {

  return (
    <>
      <Header />

      <main className="w-screen h-screen">
        <Intro />
      </main>

      <section className="w-screen h-fit">
        <About />
      </section>

      <section className="w-screen h-fit">
        <Projects />
      </section>

      <section className="w-screen h-fit">
        <Blogs />
      </section>
    </>
  )
}

export default App
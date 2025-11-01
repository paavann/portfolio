import Header from "./components/header"
import About from "./pages/about"
import Intro from "./pages/intro"




function App() {

  return (
    <>
      <Header />

      <main className="w-screen h-screen">
        <Intro />
      </main>

      <section className="w-screen h-screen">
        <About />
      </section>
    </>
  )
}

export default App
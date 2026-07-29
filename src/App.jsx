import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import HowItWorks from './components/HowItWorks/HowItWorks'
import Features from './components/Features/Features'
import Footer from './components/Footer/Footer'
import './App.css'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
      </main>
      <Footer />
    </>
  )
}

export default App

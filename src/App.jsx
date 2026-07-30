import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import LandingPage from './pages/LandingPage/LandingPage'
import PitchForm from './pages/PitchForm/PitchForm'
import PitchSummary from './pages/PitchSummary/PitchSummary'
import InvestorInterview from './pages/InvestorInterview/InvestorInterview'
import Results from './pages/Results/Results'
import './App.css'

function ScrollToHash() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return
    const element = document.getElementById(location.hash.slice(1))
    if (element) {
      requestAnimationFrame(() => element.scrollIntoView({ behavior: 'smooth' }))
    }
  }, [location])

  return null
}

function App() {
  return (
    <>
      <ScrollToHash />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/pitch" element={<PitchForm />} />
          <Route path="/summary" element={<PitchSummary />} />
          <Route path="/interview" element={<InvestorInterview />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App

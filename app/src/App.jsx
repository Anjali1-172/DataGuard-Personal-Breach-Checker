import { useState, useEffect } from 'react'
import './App.css'
import HeroSection from './sections/HeroSection'
import BreachChecker from './components/BreachChecker'
import WebsiteSafety from './sections/WebsiteSafety'
import FormTracker from './sections/FormTracker'
import BreachNews from './sections/BreachNews'
import PhoneProtection from './sections/PhoneProtection'
import EmailProtection from './sections/EmailProtection'
import StatsSection from './sections/StatsSection'
import Footer from './sections/Footer'
import Navigation from './components/Navigation'

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [breachData, setBreachData] = useState(null)
  const [isChecking, setIsChecking] = useState(false)

  useEffect(() => {
    // Load saved forms from localStorage
    const savedForms = localStorage.getItem('dataguard_forms')
    if (!savedForms) {
      localStorage.setItem('dataguard_forms', JSON.stringify([]))
    }
  }, [])

  const handleBreachCheck = async (email) => {
    setIsChecking(true)
    try {
      // Using XposedOrNot API - free, no API key required
      const response = await fetch(`https://api.xposedornot.com/v1/check-email/${encodeURIComponent(email)}`)
      const data = await response.json()
      setBreachData(data)
    } catch (error) {
      console.error('Breach check error:', error)
      setBreachData({ error: 'Failed to check breaches. Please try again.' })
    }
    setIsChecking(false)
  }

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main>
        {/* Hero Section with Breach Checker */}
        <HeroSection />
        <section id="checker" className="py-8 px-4 -mt-20 relative z-10">
          <div className="max-w-4xl mx-auto">
            <BreachChecker onCheck={handleBreachCheck} isChecking={isChecking} breachData={breachData} />
          </div>
        </section>

        {/* Stats Section */}
        <StatsSection />

        {/* Website Safety Analyzer */}
        <WebsiteSafety />

        {/* Form Tracker */}
        <FormTracker />

        {/* Email Protection */}
        <EmailProtection />

        {/* Phone Protection */}
        <PhoneProtection />

        {/* Breach News */}
        <BreachNews />

        {/* Footer */}
        <Footer />
      </main>
    </div>
  )
}

export default App

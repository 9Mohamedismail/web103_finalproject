import Navbar from '../components/layout/Navbar.jsx'
import HeroSection from '../components/home/HeroSection.jsx'
import HowItWorks from '../components/home/HowItWorks.jsx'
import './HomePage.css'

function HomePage() {
  return (
    <div className="home-page">
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorks />
      </main>
    </div>
  )
}

export default HomePage

import Navbar from '../components/layout/Navbar.jsx'
import HeroSection from '../components/home/HeroSection.jsx'
import HowItWorks from '../components/home/HowItWorks.jsx'
import './HomePage.css'

function HomePage({ apiUrl, user, onLogout }) {
  return (
    <div className="home-page">
      <Navbar apiUrl={apiUrl} user={user} onLogout={onLogout} />
      <main>
        <HeroSection />
        <HowItWorks />
      </main>
    </div>
  )
}

export default HomePage

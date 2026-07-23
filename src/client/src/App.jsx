import './App.css'
import landingPreview from '../../../planning/landing.png'

function App() {
  return (
    <main className="page-shell">
      <nav className="topbar">
        <div className="brand">CardMaxer</div>
        <a className="login-btn" href="#login">
          Login with GitHub
        </a>
      </nav>

      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">Your next favorite card</p>
          <h1>Discover the perfect card for your spending style.</h1>
          <p className="hero-text">
            CardMaxer turns reward comparisons into a clear, confident decision with smart insights and simple browsing.
          </p>
          <div className="hero-actions">
            <a className="primary-btn" href="#explore">Explore Cards</a>
            <a className="secondary-btn" href="#learn">How It Works</a>
          </div>
          <div className="demo-pill-row">
            <span>Rewards</span>
            <span>Fees</span>
            <span>Benefits</span>
          </div>
        </div>

        <div className="hero-visual">
          <img src={landingPreview} alt="CardMaxer landing preview" />
        </div>
      </section>

      <section id="explore" className="info-grid">
        <article className="info-card">
          <h2>Personalized picks</h2>
          <p>Get recommendations tailored to travel, dining, and everyday spending.</p>
        </article>
        <article className="info-card">
          <h2>Clear comparisons</h2>
          <p>Review APRs, annual fees, and rewards side by side without the noise.</p>
        </article>
        <article className="info-card">
          <h2>Trusted insights</h2>
          <p>Use real reviews and expert guidance to make a smarter financial choice.</p>
        </article>
      </section>
    </main>
  )
}

export default App

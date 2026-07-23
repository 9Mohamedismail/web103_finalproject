import './App.css'

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
          <p className="eyebrow">Smart credit card discovery</p>
          <h1>Find the card that fits your lifestyle.</h1>
          <p className="hero-text">
            Compare rewards, fees, and perks in one place so you can choose with confidence.
          </p>
          <div className="hero-actions">
            <a className="primary-btn" href="#discover">Explore cards</a>
            <a className="secondary-btn" href="#benefits">See how it works</a>
          </div>
        </div>

        <div className="hero-card" aria-label="Featured card preview">
          <div className="card-chip" />
          <div className="card-number">**** 4832</div>
          <div className="card-meta">
            <span>Platinum Rewards</span>
            <span>3.2% cash back</span>
          </div>
        </div>
      </section>

      <section id="discover" className="info-grid">
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

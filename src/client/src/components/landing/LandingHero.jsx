import CardMatchForm from "./CardMatchForm.jsx";

function LandingHero() {
  return (
    <section className="hero">
      <div className="hero__background" />
      <div className="hero__container">
        <div className="hero__layout">
          <div className="hero__content">
            <span className="hero__eyebrow">Credit Cards Made Clear</span>
            <h1 className="hero__title">
              Find Your Perfect Card <span>Instantly</span>.
            </h1>
            <p className="hero__description">
              Browse and compare credit cards, explore rewards and fees, and get
              personalized recommendations based on your credit score and
              spending interests.
            </p>
          </div>
          <div className="hero__form-column">
            <CardMatchForm />
          </div>
        </div>
      </div>
    </section>
  );
}

export default LandingHero;

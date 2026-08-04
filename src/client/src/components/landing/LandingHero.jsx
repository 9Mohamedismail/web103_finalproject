import { Link } from "react-router-dom";

function LandingHero() {
  return (
    <section className="hero">
      <div className="hero__container">
        <div className="hero__layout">
          <div className="hero__content">
            <span className="hero__eyebrow">Credit Card Research Made Clear</span>
            <h1 className="hero__title">
              Explore Cards. <span>Match Your Priorities.</span>
            </h1>
            <p className="hero__description">
              Search our U.S. credit card catalog, review fees, rewards, bonuses,
              and benefits, then filter cards by your credit-score range,
              preferred reward categories, and card type.
            </p>
            <div className="hero__actions">
              <Link className="hero__action hero__action--primary" to="/discover">
                Browse the Card Catalog
                <span className="material-symbols-outlined" aria-hidden="true">
                  explore
                </span>
              </Link>
              <Link
                className="hero__action hero__action--secondary"
                to="/recommendations"
              >
                Match Cards to My Preferences
                <span className="material-symbols-outlined" aria-hidden="true">
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LandingHero;

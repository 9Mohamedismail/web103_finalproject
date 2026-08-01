function HowItWorksSection() {
  return (
    <section className="how-it-works">
      <div className="how-it-works__container">
        <div className="how-it-works__intro">
          <h2 className="how-it-works__title">
            Maximize Your Wallet in 3 Steps
          </h2>
          <p className="how-it-works__subtitle">
            We've simplified the complex world of credit cards into a
            transparent, actionable journey.
          </p>
        </div>
        <div className="how-it-works__grid">
          <div className="how-it-works__card">
            <div className="how-it-works__number how-it-works__number--one">
              1
            </div>
            <h3 className="how-it-works__card-title">Discover</h3>
            <p className="how-it-works__card-description">
              Tell us what you buy most. Whether it's dining out, gas, or
              flights, we analyze thousands of cards to find those that pay you
              back the most.
            </p>
            <div className="how-it-works__icon">
              <span className="material-symbols-outlined">search_insights</span>
            </div>
          </div>
          <div className="how-it-works__card">
            <div className="how-it-works__number how-it-works__number--two">
              2
            </div>
            <h3 className="how-it-works__card-title">Compare</h3>
            <p className="how-it-works__card-description">
              View side-by-side breakdowns of annual fees, interest rates, and
              reward multipliers. Our transparency engine exposes hidden fine
              print.
            </p>
            <div className="how-it-works__icon">
              <span className="material-symbols-outlined">compare</span>
            </div>
          </div>
          <div className="how-it-works__card">
            <div className="how-it-works__number how-it-works__number--three">
              3
            </div>
            <h3 className="how-it-works__card-title">Save</h3>
            <p className="how-it-works__card-description">
              Apply with confidence through our secure portal. Most users save
              an average of $600/year in rewards and avoided fees.
            </p>
            <div className="how-it-works__icon">
              <span className="material-symbols-outlined">wallet</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorksSection;

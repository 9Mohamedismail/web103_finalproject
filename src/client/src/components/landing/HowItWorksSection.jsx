function HowItWorksSection() {
  return (
    <section className="how-it-works">
      <div className="how-it-works__container">
        <div className="how-it-works__intro">
          <h2 className="how-it-works__title">
            Explore CardMaxer in 3 Steps
          </h2>
          <p className="how-it-works__subtitle">
            Browse the catalog, narrow it with clear preference filters, and
            keep track of the cards that interest you.
          </p>
        </div>
        <div className="how-it-works__grid">
          <div className="how-it-works__card">
            <div className="how-it-works__number how-it-works__number--one">
              1
            </div>
            <h3 className="how-it-works__card-title">Browse</h3>
            <p className="how-it-works__card-description">
              Search the catalog by card, issuer, network, type, or reward
              category, then open any card for its full fee, reward, bonus, and
              benefit details.
            </p>
            <div className="how-it-works__icon">
              <span className="material-symbols-outlined" aria-hidden="true">
                search
              </span>
            </div>
          </div>
          <div className="how-it-works__card">
            <div className="how-it-works__number how-it-works__number--two">
              2
            </div>
            <h3 className="how-it-works__card-title">Match</h3>
            <p className="how-it-works__card-description">
              Choose an estimated credit-score range, up to three reward goals,
              and an optional card type to see catalog cards that meet those
              criteria.
            </p>
            <div className="how-it-works__icon">
              <span className="material-symbols-outlined" aria-hidden="true">
                tune
              </span>
            </div>
          </div>
          <div className="how-it-works__card">
            <div className="how-it-works__number how-it-works__number--three">
              3
            </div>
            <h3 className="how-it-works__card-title">Save &amp; Review</h3>
            <p className="how-it-works__card-description">
              Log in with GitHub to save a shortlist, record your credit score,
              and share one review for each card you have experience with.
            </p>
            <div className="how-it-works__icon">
              <span className="material-symbols-outlined" aria-hidden="true">
                bookmark_heart
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorksSection;

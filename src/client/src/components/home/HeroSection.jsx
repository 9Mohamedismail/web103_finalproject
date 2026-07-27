import RecommendationForm from './RecommendationForm.jsx'

function HeroSection() {
  return (
    <section className="hero">
      <div className="hero__content">
        <div className="hero__cards" aria-hidden="true">
          <div className="hero__card hero__card--back" />
          <div className="hero__card hero__card--front" />
        </div>

        <h1 className="hero__title">Find Your Perfect Card</h1>
        <p className="hero__subtitle">
          Maximize your rewards and benefits by discovering the ideal credit card
          tailored to your unique financial lifestyle.
        </p>
        <a className="hero__cta" href="#">
          Browse All Cards
        </a>
      </div>

      <RecommendationForm />
    </section>
  )
}

export default HeroSection

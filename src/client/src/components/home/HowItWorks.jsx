import FeatureCard from './FeatureCard.jsx'

const steps = [
  {
    step: 1,
    title: 'Discover',
    description:
      'Tell us a bit about your spending habits and financial goals. Our platform filters through hundreds of options.',
    accentClass: 'feature-card__icon--blue',
    icon: '🔍',
  },
  {
    step: 2,
    title: 'Compare',
    description:
      'View side-by-side comparisons of top matches. Evaluate rewards, fees, and perks clearly without the jargon.',
    accentClass: 'feature-card__icon--green',
    icon: '⇄',
  },
  {
    step: 3,
    title: 'Save',
    description:
      'Apply securely for the card that maximizes your benefits and start earning rewards on your everyday purchases.',
    accentClass: 'feature-card__icon--purple',
    icon: '🐷',
  },
]

function HowItWorks() {
  return (
    <section className="how-it-works">
      <h2 className="how-it-works__title">How CardMaxer Works</h2>
      <p className="how-it-works__subtitle">
        Finding the right credit card shouldn&apos;t be complicated. Our simple
        three-step process helps you go from browsing to earning rewards in
        minutes.
      </p>

      <div className="how-it-works__grid">
        {steps.map((step) => (
          <FeatureCard key={step.title} {...step} />
        ))}
      </div>
    </section>
  )
}

export default HowItWorks

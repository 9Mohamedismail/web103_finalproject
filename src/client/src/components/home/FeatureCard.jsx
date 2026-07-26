function FeatureCard({ step, title, description, icon, accentClass }) {
  return (
    <article className="feature-card">
      <div className={`feature-card__icon ${accentClass}`}>{icon}</div>
      <h3 className="feature-card__title">
        {step}. {title}
      </h3>
      <p className="feature-card__description">{description}</p>
    </article>
  )
}

export default FeatureCard

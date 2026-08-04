function formatSignupBonus(bonus) {
  if (!bonus) return "No public signup bonus is currently listed.";

  const spend = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(bonus.spend_requirement);
  const monthLabel = bonus.time_period_months === 1 ? "month" : "months";

  return `${bonus.amount} ${bonus.currency} after ${spend} spend in ${bonus.time_period_months} ${monthLabel}.`;
}

function BonusBenefits({ signupBonus, benefits }) {
  return (
    <section className="card-detail-panel card-detail-bonus">
      <h2>Signup Bonus &amp; Benefits</h2>

      <div className="card-detail-bonus__offer">
        <h3>Signup Bonus</h3>
        <p>{formatSignupBonus(signupBonus)}</p>
      </div>

      <div>
        <h3>Benefits</h3>
        <ul>
          {benefits.map((benefit) => (
            <li key={benefit}>
              <span className="material-symbols-outlined" aria-hidden="true">
                check_circle
              </span>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default BonusBenefits;

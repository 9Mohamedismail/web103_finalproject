import { useState } from "react";

const primaryGoals = [
  { label: "Dining", icon: "restaurant" },
  { label: "Groceries", icon: "grocery" },
  { label: "Gas", icon: "local_gas_station" },
  { label: "Travel", icon: "luggage" },
  { label: "Flights", icon: "flight_takeoff" },
  { label: "Hotels", icon: "hotel" },
  { label: "Streaming", icon: "subscriptions" },
  { label: "Online Shopping", icon: "shopping_bag" },
  { label: "Transit", icon: "directions_transit" },
  { label: "Other", icon: "more_horiz" },
];

function CardMatchForm() {
  const [primaryGoal, setPrimaryGoal] = useState(null);

  return (
    <div className="recommendation-form">
      <div className="recommendation-form__content">
        <div className="recommendation-form__header">
          <h3 className="recommendation-form__title">Find Your Best Match</h3>
          <span className="recommendation-form__step">One Quick Step</span>
        </div>
        <div className="recommendation-form__fields">
          <div>
            <label className="recommendation-form__label">
              What's your estimated credit score?
            </label>
            <div className="recommendation-form__scores">
              <button className="recommendation-form__score">300-579</button>
              <button className="recommendation-form__score">580-669</button>
              <button className="recommendation-form__score recommendation-form__score--selected">
                670-739
              </button>
              <button className="recommendation-form__score">740-850</button>
            </div>
          </div>
          <div>
            <label className="recommendation-form__label">
              Your primary goal?
            </label>
            <div className="recommendation-form__goals">
              {primaryGoals.map((goal) => (
                <button
                  key={goal.label}
                  type="button"
                  className={
                    primaryGoal === goal.label
                      ? "recommendation-form__goal recommendation-form__goal--selected"
                      : "recommendation-form__goal"
                  }
                  aria-pressed={primaryGoal === goal.label}
                  onClick={() => setPrimaryGoal(goal.label)}
                >
                  <span className="material-symbols-outlined">{goal.icon}</span>
                  {goal.label}
                </button>
              ))}
            </div>
          </div>
          <button className="recommendation-form__submit">
            Continue to Recommendations
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardMatchForm;

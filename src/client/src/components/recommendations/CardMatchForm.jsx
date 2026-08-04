import { useState } from "react";

const creditScores = ["300-579", "580-669", "670-739", "740-850"];

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
];

const cardTypes = ["personal", "student", "business", "secured"];
const MAX_GOALS = 3;

function CardMatchForm({ initialCreditScore = null, onSubmit }) {
  const [creditScore, setCreditScore] = useState(initialCreditScore);
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [cardType, setCardType] = useState(null);
  const [errors, setErrors] = useState({});

  function selectCreditScore(score) {
    setCreditScore(score);
    setErrors((currentErrors) => ({ ...currentErrors, creditScore: null }));
  }

  function toggleGoal(goal) {
    setSelectedGoals((currentGoals) => {
      if (currentGoals.includes(goal)) {
        return currentGoals.filter((selectedGoal) => selectedGoal !== goal);
      }

      if (currentGoals.length === MAX_GOALS) return currentGoals;
      return [...currentGoals, goal];
    });
    setErrors((currentErrors) => ({ ...currentErrors, primaryGoals: null }));
  }

  function toggleCardType(type) {
    setCardType((currentType) => (currentType === type ? null : type));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = {
      creditScore: creditScore ? null : "Choose your estimated credit score.",
      primaryGoals:
        selectedGoals.length > 0 ? null : "Choose at least one primary goal.",
    };

    setErrors(nextErrors);

    if (nextErrors.creditScore || nextErrors.primaryGoals) return;

    onSubmit({
      creditScore,
      primaryGoals: selectedGoals,
      cardType,
    });
  }

  return (
    <form className="recommendation-form" onSubmit={handleSubmit} noValidate>
      <div className="recommendation-form__content">
        <div className="recommendation-form__header">
          <h2 className="recommendation-form__title">Set Your Card Preferences</h2>
          <span className="recommendation-form__step">One Quick Step</span>
        </div>
        <div className="recommendation-form__fields">
          <div>
            <p className="recommendation-form__label">
              What's your estimated credit score?
            </p>
            <div
              className="recommendation-form__scores"
              role="group"
              aria-label="Estimated credit score"
            >
              {creditScores.map((score) => (
                <button
                  key={score}
                  type="button"
                  className={
                    creditScore === score
                      ? "recommendation-form__score recommendation-form__score--selected"
                      : "recommendation-form__score"
                  }
                  aria-pressed={creditScore === score}
                  onClick={() => selectCreditScore(score)}
                >
                  {score}
                </button>
              ))}
            </div>
            {errors.creditScore && (
              <p className="recommendation-form__error" role="alert">
                {errors.creditScore}
              </p>
            )}
          </div>

          <div>
            <div className="recommendation-form__label-row">
              <p className="recommendation-form__label">Your primary goals?</p>
              <span className="recommendation-form__helper">Choose up to 3</span>
            </div>
            <div
              className="recommendation-form__goals"
              role="group"
              aria-label="Primary goals"
            >
              {primaryGoals.map((goal) => (
                <button
                  key={goal.label}
                  type="button"
                  className={
                    selectedGoals.includes(goal.label)
                      ? "recommendation-form__goal recommendation-form__goal--selected"
                      : "recommendation-form__goal"
                  }
                  aria-pressed={selectedGoals.includes(goal.label)}
                  disabled={
                    selectedGoals.length === MAX_GOALS &&
                    !selectedGoals.includes(goal.label)
                  }
                  onClick={() => toggleGoal(goal.label)}
                >
                  <span className="material-symbols-outlined" aria-hidden="true">
                    {goal.icon}
                  </span>
                  {goal.label}
                </button>
              ))}
            </div>
            {errors.primaryGoals && (
              <p className="recommendation-form__error" role="alert">
                {errors.primaryGoals}
              </p>
            )}
          </div>

          <div>
            <div className="recommendation-form__label-row">
              <p className="recommendation-form__label">
                What type of card are you looking for?
              </p>
              <span className="recommendation-form__helper">Optional</span>
            </div>
            <div
              className="recommendation-form__card-types"
              role="group"
              aria-label="Card type"
            >
              {cardTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  className={
                    cardType === type
                      ? "recommendation-form__score recommendation-form__score--selected"
                      : "recommendation-form__score"
                  }
                  aria-pressed={cardType === type}
                  onClick={() => toggleCardType(type)}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <button className="recommendation-form__submit" type="submit">
            Show Matching Cards
            <span className="material-symbols-outlined" aria-hidden="true">
              arrow_forward
            </span>
          </button>
        </div>
      </div>
    </form>
  );
}

export default CardMatchForm;

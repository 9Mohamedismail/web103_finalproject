import { useState } from 'react'

const creditScoreOptions = [
  'Excellent 740+',
  'Good 670-739',
  'Fair 580-669',
  'Building Credit',
]

const goalOptions = [
  { value: 'travel', label: 'Travel Rewards' },
  { value: 'cashback', label: 'Cash Back' },
  { value: 'building', label: 'Building Credit' },
]

function RecommendationForm() {
  const [creditScore, setCreditScore] = useState(creditScoreOptions[0])
  const [primaryGoal, setPrimaryGoal] = useState('travel')

  return (
    <div className="recommendation-form">
      <div className="recommendation-form__header">
        <h2 className="recommendation-form__title">Find Your Best Match</h2>
        <span className="recommendation-form__step">Step 1 of 1</span>
      </div>

      <label className="recommendation-form__field">
        <span className="recommendation-form__label">Credit Score</span>
        <select
          value={creditScore}
          onChange={(event) => setCreditScore(event.target.value)}
        >
          {creditScoreOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <fieldset className="recommendation-form__field">
        <legend className="recommendation-form__label">Primary Goal</legend>
        <div className="recommendation-form__goals">
          {goalOptions.map((option) => (
            <label key={option.value} className="recommendation-form__goal">
              <input
                type="radio"
                name="primaryGoal"
                value={option.value}
                checked={primaryGoal === option.value}
                onChange={(event) => setPrimaryGoal(event.target.value)}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <button type="button" className="recommendation-form__submit">
        Get Recommendations
      </button>
    </div>
  )
}

export default RecommendationForm

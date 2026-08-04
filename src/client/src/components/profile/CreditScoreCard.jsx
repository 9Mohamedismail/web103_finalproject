import { useState } from "react";

const CIRCUMFERENCE = 502.65;

function getScoreLabel(score) {
  if (score < 580) return "Building Credit";
  if (score < 670) return "Fair";
  if (score < 740) return "Good";
  return "Excellent";
}

function CreditScoreCard({ apiUrl, creditScore, onCreditScoreUpdated }) {
  const hasCreditScore = Number.isInteger(creditScore);
  const [isEditing, setIsEditing] = useState(!hasCreditScore);
  const [scoreInput, setScoreInput] = useState(
    hasCreditScore ? String(creditScore) : "",
  );
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const scoreProgress = hasCreditScore
    ? Math.min(Math.max((creditScore - 300) / 550, 0), 1)
    : 0;
  const strokeOffset = CIRCUMFERENCE * (1 - scoreProgress);

  function beginEditing() {
    setScoreInput(String(creditScore));
    setError("");
    setIsEditing(true);
  }

  function cancelEditing() {
    setScoreInput(String(creditScore));
    setError("");
    setIsEditing(false);
  }

  async function saveCreditScore(event) {
    event.preventDefault();
    const nextScore = Number(scoreInput);

    if (!Number.isInteger(nextScore) || nextScore < 300 || nextScore > 850) {
      setError("Enter a whole-number credit score from 300 to 850.");
      return;
    }

    setError("");
    setIsSaving(true);

    try {
      const response = await fetch(`${apiUrl}/api/users/me/credit-score`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credit_score: nextScore }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Unable to save credit score");
      }

      onCreditScoreUpdated(data.credit_score);
      setScoreInput(String(data.credit_score));
      setIsEditing(false);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <section className="profile-panel profile-score-card">
      <div className="profile-score-card__heading">
        <h2 className="profile-panel__eyebrow">Credit score</h2>
        {hasCreditScore && !isEditing && (
          <button type="button" onClick={beginEditing}>
            Edit
          </button>
        )}
      </div>

      {isEditing ? (
        <form className="profile-score-form" onSubmit={saveCreditScore}>
          <span className="material-symbols-outlined" aria-hidden="true">
            speed
          </span>
          <h3>{hasCreditScore ? "Update your score" : "Add your credit score"}</h3>
          <p>Enter a score from 300 to 850.</p>
          <label htmlFor="profile-credit-score">Credit score</label>
          <input
            id="profile-credit-score"
            type="number"
            min="300"
            max="850"
            step="1"
            inputMode="numeric"
            value={scoreInput}
            onChange={(event) => setScoreInput(event.target.value)}
          />
          {error && (
            <p className="profile-score-form__error" role="alert">
              {error}
            </p>
          )}
          <div>
            {hasCreditScore && (
              <button type="button" onClick={cancelEditing}>
                Cancel
              </button>
            )}
            <button type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Credit Score"}
            </button>
          </div>
        </form>
      ) : (
        <div
          className="profile-score-card__dial"
          role="img"
          aria-label={`Credit score: ${creditScore}, ${getScoreLabel(creditScore)}`}
        >
          <svg viewBox="0 0 192 192" aria-hidden="true">
            <circle
              className="profile-score-card__track"
              cx="96"
              cy="96"
              r="80"
            />
            <circle
              className="profile-score-card__progress"
              cx="96"
              cy="96"
              r="80"
              style={{ strokeDashoffset: strokeOffset }}
            />
          </svg>

          <div className="profile-score-card__value">
            <strong>{creditScore}</strong>
            <span>{getScoreLabel(creditScore)}</span>
          </div>
        </div>
      )}
    </section>
  );
}

export default CreditScoreCard;

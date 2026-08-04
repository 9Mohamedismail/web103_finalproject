function formatLabel(value) {
  return value
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatList(values) {
  return new Intl.ListFormat("en", {
    style: "long",
    type: "conjunction",
  }).format(values.map(formatLabel));
}

function formatSentenceList(values) {
  return new Intl.ListFormat("en", {
    style: "long",
    type: "conjunction",
  }).format(values);
}

function RecommendationsHeader({
  preferences,
  resultCount,
  exactMatchCount,
  includePartialGoals,
  includeLowerScores,
  onPartialGoalsChange,
  onLowerScoresChange,
  onReset,
}) {
  const typeDescription = preferences.cardType
    ? `${formatLabel(preferences.cardType)} `
    : "";
  const cardDescription = `${typeDescription}${resultCount === 1 ? "card" : "cards"}`;
  const singularCardDescription = `${typeDescription}card`;
  const goalsDescription = formatList(preferences.goals);
  const hasBroadenedResults = includePartialGoals || includeLowerScores;

  let resultMessage = `We found ${resultCount} ${cardDescription} for the ${preferences.score} range matching ${goalsDescription}.`;

  if (hasBroadenedResults) {
    const broaderCriteria = [];

    if (includePartialGoals) broaderCriteria.push("at least one selected goal");
    if (includeLowerScores) broaderCriteria.push("lower credit-score requirements");

    resultMessage = `We found ${exactMatchCount} exact ${exactMatchCount === 1 ? "match" : "matches"}. Showing ${resultCount} ${cardDescription} including ${formatSentenceList(broaderCriteria)}.`;
  } else if (resultCount === 0) {
    resultMessage = `We couldn't find an exact ${singularCardDescription} for the ${preferences.score} range matching ${goalsDescription}. Try broadening your results below.`;
  }

  return (
    <section className="recommendations-header">
      <span className="recommendations-header__eyebrow">Your Selected Criteria</span>
      <h1>Cards Matching Your Preferences</h1>
      <p className="recommendations-header__message" aria-live="polite">
        {resultMessage}
      </p>
      <p className="recommendations-header__disclaimer">
        Matches use catalog credit-score thresholds and are not approval
        guarantees.
      </p>

      <div className="recommendations-header__preferences" aria-label="Selected preferences">
        <span>{preferences.score}</span>
        {preferences.cardType && <span>{formatLabel(preferences.cardType)}</span>}
        {preferences.goals.map((goal) => (
          <span key={goal}>{formatLabel(goal)}</span>
        ))}
      </div>

      <button
        className="recommendations-header__reset"
        type="button"
        onClick={onReset}
      >
        Change Preferences
      </button>

      <div className="recommendations-header__options" aria-label="Broaden recommendations">
        {preferences.goals.length > 1 && (
          <button
            type="button"
            className={includePartialGoals ? "is-active" : ""}
            aria-pressed={includePartialGoals}
            onClick={() => onPartialGoalsChange(!includePartialGoals)}
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              {includePartialGoals ? "check_circle" : "tune"}
            </span>
            <span>
              <strong>Include partial goal matches</strong>
              <small>Cards matching at least one selected goal</small>
            </span>
          </button>
        )}

        {preferences.scoreMinimum > 300 && (
          <button
            type="button"
            className={includeLowerScores ? "is-active" : ""}
            aria-pressed={includeLowerScores}
            onClick={() => onLowerScoresChange(!includeLowerScores)}
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              {includeLowerScores ? "check_circle" : "verified"}
            </span>
            <span>
              <strong>Include cards I may also qualify for</strong>
              <small>Cards with lower credit-score requirements</small>
            </span>
          </button>
        )}
      </div>
    </section>
  );
}

export default RecommendationsHeader;

function RecommendationsEmptyState({ canBroaden = false, onReset }) {
  let message = "Sorry, we don't have a card matching those preferences right now.";

  if (canBroaden) {
    message = "No cards match the current criteria. Try one of the options above or choose new preferences.";
  }

  return (
    <section className="recommendations-empty">
      <span className="material-symbols-outlined" aria-hidden="true">
        credit_card_off
      </span>
      <h2>No recommendations yet</h2>
      <p>{message}</p>
      <button type="button" onClick={onReset}>
        Redo My Preferences
      </button>
    </section>
  );
}

export default RecommendationsEmptyState;

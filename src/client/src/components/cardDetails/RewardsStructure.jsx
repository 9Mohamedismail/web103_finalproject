const CATEGORY_ICONS = {
  advertising: "campaign",
  dining: "restaurant",
  drugstores: "medication",
  entertainment: "theater_comedy",
  fitness: "fitness_center",
  flights: "flight",
  gas: "local_gas_station",
  groceries: "local_grocery_store",
  hotels: "hotel",
  internet: "language",
  office_supplies: "business_center",
  online_shopping: "shopping_bag",
  other: "credit_card",
  phone: "smartphone",
  shipping: "local_shipping",
  streaming: "subscriptions",
  transit: "directions_transit",
  travel: "luggage",
};

function formatLabel(value) {
  return value
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function RewardsStructure({ rewards }) {
  return (
    <section className="card-detail-panel">
      <h2>Rewards Structure</h2>
      <ul className="card-detail-rewards">
        {rewards.map((reward, index) => {
          const suffix = reward.type === "multiplier" ? "x" : "%";
          const cap = reward.cap
            ? ` (up to $${reward.cap.toLocaleString()})`
            : "";

          return (
            <li key={`${reward.category}-${index}`}>
              <div>
                <span className="material-symbols-outlined" aria-hidden="true">
                  {CATEGORY_ICONS[reward.category] ?? "credit_card"}
                </span>
                <span>
                  {formatLabel(reward.category)}
                  {cap}
                </span>
              </div>
              <strong>
                {reward.rate}
                {suffix}
              </strong>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default RewardsStructure;

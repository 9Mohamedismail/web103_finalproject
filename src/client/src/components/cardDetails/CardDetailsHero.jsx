import FavoriteButton from "../favorites/FavoriteButton.jsx";

const CREDIT_SCORE_LABELS = {
  300: "Building Credit",
  580: "Fair",
  670: "Good",
  740: "Excellent",
};

const ISSUER_LABELS = {
  "american-express": "American Express",
  "bank-of-america": "Bank of America",
  "capital-one": "Capital One",
  "us-bank": "U.S. Bank",
  "wells-fargo": "Wells Fargo",
};

function formatLabel(value) {
  return value
    .replaceAll("_", " ")
    .replaceAll("-", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: Number.isInteger(value) ? 0 : 2,
  }).format(value);
}

function formatDate(value) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function CardDetailsHero({ card, favoriteManager }) {
  const issuer = ISSUER_LABELS[card.issuer] ?? formatLabel(card.issuer);
  const scoreLabel = CREDIT_SCORE_LABELS[card.credit_score_min] ?? "Recommended";

  return (
    <section className="card-detail-hero">
      <div className="card-detail-hero__image">
        <img src={card.image_url} alt={`${card.name} card`} />
      </div>

      <div className="card-detail-hero__content">
        <div>
          <h1>{card.name}</h1>
          <p>
            {formatLabel(card.card_type)} card issued by {issuer} on the{" "}
            {formatLabel(card.network)} network.
          </p>
        </div>

        <dl className="card-detail-hero__facts">
          <div>
            <dt>Annual Fee:</dt>
            <dd>{formatCurrency(card.annual_fee)}</dd>
          </div>
          <div>
            <dt>Foreign Transaction Fee:</dt>
            <dd>{card.foreign_transaction_fee}%</dd>
          </div>
          <div>
            <dt>Recommended Score:</dt>
            <dd>
              {scoreLabel} ({card.credit_score_min}+)
            </dd>
          </div>
          <div>
            <dt>Market:</dt>
            <dd>{card.country === "US" ? "United States" : card.country}</dd>
          </div>
          <div>
            <dt>Catalog Updated:</dt>
            <dd>{formatDate(card.updated_at)}</dd>
          </div>
        </dl>

        <p className="card-detail-hero__notice">
          Card terms can change. Verify current offers, fees, and eligibility
          with the issuer before making a financial decision.
        </p>

        {favoriteManager && (
          <FavoriteButton
            cardId={card.id}
            favoriteManager={favoriteManager}
            className="card-detail-favorite"
          />
        )}
      </div>
    </section>
  );
}

export default CardDetailsHero;

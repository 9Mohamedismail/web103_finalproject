import { Link } from "react-router-dom";
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

function getRewardTag(reward) {
  if (!reward) return null;

  const rateSuffix = reward.type === "multiplier" ? "x" : "%";
  return `${formatLabel(reward.category)} ${reward.rate}${rateSuffix}`;
}

function DiscoverCard({ card, favoriteManager }) {
  const issuer = ISSUER_LABELS[card.issuer] ?? formatLabel(card.issuer);
  const rewardTags = card.reward_rates.map(getRewardTag).filter(Boolean);
  const creditScore = CREDIT_SCORE_LABELS[card.credit_score_min] ?? "Recommended";

  return (
    <article className="catalog-card">
      <div className="catalog-card__media">
        <img src={card.image_url} alt={`${card.name} card`} loading="lazy" />
      </div>

      <div className="catalog-card__body">
        <div className="catalog-card__identity">
          <p className="catalog-card__issuer">{issuer}</p>
          <h2>{card.name}</h2>
          <div className="catalog-card__tags">
            <span>{formatLabel(card.card_type)}</span>
          </div>
        </div>

        <div className="catalog-card__rewards">
          <h3>Rewards</h3>
          <div className="catalog-card__reward-list" aria-label="Card rewards">
            {rewardTags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>

        <div className="catalog-card__summary">
          <h3>
            <span className="material-symbols-outlined" aria-hidden="true">
              visibility
            </span>
            At-a-Glance
          </h3>
          <dl>
            <div>
              <dt>Credit Score</dt>
              <dd>
                {creditScore} {card.credit_score_min}+
              </dd>
            </div>
            <div>
              <dt>Annual Fee</dt>
              <dd>${card.annual_fee.toLocaleString()}</dd>
            </div>
          </dl>
        </div>

        <div className="catalog-card__actions">
          {favoriteManager && (
            <FavoriteButton cardId={card.id} favoriteManager={favoriteManager} />
          )}
          <Link className="catalog-card__details" to={`/cards/${card.id}`}>
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}

export default DiscoverCard;

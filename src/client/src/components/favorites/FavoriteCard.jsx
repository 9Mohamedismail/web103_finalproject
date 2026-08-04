import { Link } from "react-router-dom";
import "../../css/Favorites.css";

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

function formatDate(value) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function FavoriteCard({ card, isPending, onDelete }) {
  const issuer = ISSUER_LABELS[card.issuer] ?? formatLabel(card.issuer);

  return (
    <article className="favorite-card">
      <div className="favorite-card__image">
        <img src={card.image_url} alt={`${card.name} card`} loading="lazy" />
      </div>
      <div className="favorite-card__body">
        <span>{issuer}</span>
        <h2>{card.name}</h2>
        <p>Saved {formatDate(card.saved_at)}</p>
        <div className="favorite-card__actions">
          <Link to={`/cards/${card.id}`}>View Card</Link>
          <button type="button" disabled={isPending} onClick={onDelete}>
            {isPending ? "Removing..." : "Unfavorite"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default FavoriteCard;

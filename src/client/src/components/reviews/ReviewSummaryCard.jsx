import { Link } from "react-router-dom";
import "../../css/Reviews.css";

function formatDate(value) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function ReviewSummaryCard({ review }) {
  return (
    <article className="user-review-card">
      <div className="user-review-card__identity">
        <img src={review.image_url} alt="" loading="lazy" />
        <div>
          <h3>{review.card_name}</h3>
          <span>{formatDate(review.updated_at)}</span>
        </div>
      </div>

      <div
        className="user-review-card__rating"
        aria-label={`${review.rating} out of 5 stars`}
      >
        <span className="material-symbols-outlined" aria-hidden="true">
          star
        </span>
        <span>{review.rating}/5</span>
      </div>

      <p>{review.review_text}</p>

      <div className="user-review-card__actions">
        <Link
          className="user-review-card__edit"
          to={`/cards/${review.card_id}?editReview=${review.id}#reviews`}
        >
          Edit Review
        </Link>
        <Link
          className="user-review-card__view"
          to={`/cards/${review.card_id}#reviews`}
        >
          View Full
        </Link>
      </div>
    </article>
  );
}

export default ReviewSummaryCard;

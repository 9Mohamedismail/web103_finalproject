import { useEffect, useState } from "react";

const MAX_REVIEW_LENGTH = 1000;

function StarRating({ value, onChange, label }) {
  return (
    <div className="card-detail-stars-input" role="group" aria-label={label}>
      {[1, 2, 3, 4, 5].map((rating) => (
        <button
          key={rating}
          type="button"
          className={rating <= value ? "is-selected" : ""}
          aria-label={`${rating} ${rating === 1 ? "star" : "stars"}`}
          aria-pressed={rating === value}
          onClick={() => onChange(rating)}
        >
          <span className="material-symbols-outlined" aria-hidden="true">
            star
          </span>
        </button>
      ))}
    </div>
  );
}

function ReviewStars({ rating }) {
  return (
    <div
      className="card-detail-review-stars"
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className="material-symbols-outlined"
          aria-hidden="true"
        >
          {star <= rating ? "star" : "star_outline"}
        </span>
      ))}
    </div>
  );
}

function getInitials(username) {
  return username.slice(0, 2).toUpperCase();
}

function formatReviewDate(review) {
  const createdAt = new Date(review.created_at);
  const updatedAt = new Date(review.updated_at);
  const wasEdited = updatedAt.getTime() - createdAt.getTime() > 1000;
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(wasEdited ? updatedAt : createdAt);

  return wasEdited ? `Updated ${formattedDate}` : formattedDate;
}

function validateReview(rating, reviewText) {
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return "Choose a rating from 1 to 5 stars.";
  }

  const trimmedText = reviewText.trim();

  if (trimmedText.length < 1 || trimmedText.length > MAX_REVIEW_LENGTH) {
    return `Your review must be between 1 and ${MAX_REVIEW_LENGTH} characters.`;
  }

  return "";
}

async function readResponse(response) {
  if (response.status === 204) return null;

  try {
    return await response.json();
  } catch {
    return null;
  }
}

function CardReviews({ apiUrl, cardId, user, editReviewId }) {
  const [reviewRequest, setReviewRequest] = useState({
    cardId: "",
    reviews: [],
    error: "",
  });
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [formError, setFormError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editRating, setEditRating] = useState(0);
  const [editText, setEditText] = useState("");
  const [mutationError, setMutationError] = useState("");
  const [isMutating, setIsMutating] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function getReviews() {
      try {
        const response = await fetch(`${apiUrl}/api/cards/${cardId}/reviews`, {
          credentials: "include",
          signal: controller.signal,
        });

        if (!response.ok) throw new Error("Unable to load reviews");

        const loadedReviews = await response.json();

        setReviewRequest({
          cardId,
          reviews: loadedReviews,
          error: "",
        });

        const requestedReview = loadedReviews.find(
          (review) =>
            review.is_owner && String(review.id) === String(editReviewId),
        );

        if (requestedReview) {
          setEditingId(requestedReview.id);
          setEditRating(requestedReview.rating);
          setEditText(requestedReview.review_text);
          setMutationError("");
        } else {
          setEditingId(null);
          setEditRating(0);
          setEditText("");
        }

        if (window.location.hash === "#reviews") {
          window.requestAnimationFrame(() => {
            document
              .getElementById("reviews")
              ?.scrollIntoView({ behavior: "smooth", block: "start" });
          });
        }
      } catch (requestError) {
        if (requestError.name !== "AbortError") {
          setReviewRequest({
            cardId,
            reviews: [],
            error: "We couldn't load reviews right now.",
          });
        }
      }
    }

    getReviews();

    return () => controller.abort();
  }, [apiUrl, cardId, editReviewId]);

  const isLoading = reviewRequest.cardId !== cardId;
  const reviews = isLoading ? [] : reviewRequest.reviews;
  const hasOwnReview = Boolean(
    user && reviews.some((review) => review.is_owner),
  );

  async function createReview(event) {
    event.preventDefault();
    const validationError = validateReview(rating, reviewText);

    if (validationError) {
      setFormError(validationError);
      return;
    }

    setFormError("");
    setMutationError("");
    setIsMutating(true);

    try {
      const response = await fetch(`${apiUrl}/api/cards/${cardId}/reviews`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating,
          review_text: reviewText.trim(),
        }),
      });
      const data = await readResponse(response);

      if (!response.ok) {
        throw new Error(data?.error ?? "Unable to post review");
      }

      setReviewRequest((currentRequest) => ({
        ...currentRequest,
        reviews: [data, ...currentRequest.reviews],
      }));
      setRating(0);
      setReviewText("");
    } catch (error) {
      setMutationError(error.message);
    } finally {
      setIsMutating(false);
    }
  }

  function startEditing(review) {
    setEditingId(review.id);
    setEditRating(review.rating);
    setEditText(review.review_text);
    setMutationError("");
  }

  function cancelEditing() {
    setEditingId(null);
    setEditRating(0);
    setEditText("");
    setMutationError("");
  }

  async function saveReview(event, reviewId) {
    event.preventDefault();
    const validationError = validateReview(editRating, editText);

    if (validationError) {
      setMutationError(validationError);
      return;
    }

    setMutationError("");
    setIsMutating(true);

    try {
      const response = await fetch(`${apiUrl}/api/reviews/${reviewId}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating: editRating,
          review_text: editText.trim(),
        }),
      });
      const data = await readResponse(response);

      if (!response.ok) {
        throw new Error(data?.error ?? "Unable to update review");
      }

      setReviewRequest((currentRequest) => ({
        ...currentRequest,
        reviews: currentRequest.reviews.map((review) =>
          review.id === reviewId ? data : review,
        ),
      }));
      cancelEditing();
    } catch (error) {
      setMutationError(error.message);
    } finally {
      setIsMutating(false);
    }
  }

  async function deleteReview(reviewId) {
    setMutationError("");
    setIsMutating(true);

    try {
      const response = await fetch(`${apiUrl}/api/reviews/${reviewId}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await readResponse(response);

      if (!response.ok) {
        throw new Error(data?.error ?? "Unable to delete review");
      }

      setReviewRequest((currentRequest) => ({
        ...currentRequest,
        reviews: currentRequest.reviews.filter(
          (review) => review.id !== reviewId,
        ),
      }));

      if (editingId === reviewId) cancelEditing();
    } catch (error) {
      setMutationError(error.message);
    } finally {
      setIsMutating(false);
    }
  }

  return (
    <section className="card-detail-reviews" id="reviews">
      <div className="card-detail-reviews__heading">
        <h2>User Reviews</h2>
        <p>See what other cardholders are saying.</p>
      </div>

      {user && !hasOwnReview && !isLoading && !reviewRequest.error && (
        <form className="card-detail-review-form" onSubmit={createReview}>
          <fieldset>
            <legend>Your Rating</legend>
            <StarRating
              value={rating}
              onChange={setRating}
              label="Choose your rating"
            />
          </fieldset>

          <label htmlFor="card-review-text">Leave a Review</label>
          <textarea
            id="card-review-text"
            value={reviewText}
            maxLength={MAX_REVIEW_LENGTH}
            placeholder="Tell us what you like or dislike about this card..."
            onChange={(event) => setReviewText(event.target.value)}
          />
          <div className="card-detail-review-form__footer">
            <span>
              {reviewText.length}/{MAX_REVIEW_LENGTH}
            </span>
            <button type="submit" disabled={isMutating}>
              {isMutating ? "Posting..." : "Post Review"}
            </button>
          </div>
          {formError && (
            <p className="card-detail-review-error" role="alert">
              {formError}
            </p>
          )}
        </form>
      )}

      {mutationError && (
        <p className="card-detail-review-error" role="alert">
          {mutationError}
        </p>
      )}

      {isLoading && (
        <p className="card-detail-reviews__status" role="status">
          Loading reviews...
        </p>
      )}

      {!isLoading && reviewRequest.error && (
        <p className="card-detail-review-error" role="alert">
          {reviewRequest.error}
        </p>
      )}

      {!isLoading && !reviewRequest.error && reviews.length === 0 && (
        <p className="card-detail-reviews__empty">
          No reviews yet. Be the first to share your experience.
        </p>
      )}

      {!isLoading && !reviewRequest.error && reviews.length > 0 && (
        <div className="card-detail-review-feed">
          {reviews.map((review) => (
            <article key={review.id}>
              <div className="card-detail-review__header">
                <div className="card-detail-review__author">
                  <span className="card-detail-review__avatar">
                    {getInitials(review.username)}
                  </span>
                  <div>
                    <strong>{review.username}</strong>
                    <small>{formatReviewDate(review)}</small>
                  </div>
                </div>

                {user && review.is_owner && editingId !== review.id && (
                  <div className="card-detail-review__actions">
                    <button
                      type="button"
                      title="Edit Review"
                      disabled={isMutating}
                      onClick={() => startEditing(review)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      title="Delete Review"
                      disabled={isMutating}
                      onClick={() => deleteReview(review.id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>

              {editingId === review.id ? (
                <form
                  className="card-detail-review-edit"
                  onSubmit={(event) => saveReview(event, review.id)}
                >
                  <StarRating
                    value={editRating}
                    onChange={setEditRating}
                    label="Update your rating"
                  />
                  <textarea
                    value={editText}
                    maxLength={MAX_REVIEW_LENGTH}
                    aria-label="Edit your review"
                    onChange={(event) => setEditText(event.target.value)}
                  />
                  <div>
                    <span>
                      {editText.length}/{MAX_REVIEW_LENGTH}
                    </span>
                    <button type="button" onClick={cancelEditing}>
                      Cancel
                    </button>
                    <button type="submit" disabled={isMutating}>
                      {isMutating ? "Saving..." : "Save Review"}
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <ReviewStars rating={review.rating} />
                  <p>{review.review_text}</p>
                </>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default CardReviews;

import { useEffect, useState } from "react";
import ReviewSummaryCard from "../components/reviews/ReviewSummaryCard.jsx";
import "../css/Reviews.css";

function Reviews({ apiUrl }) {
  const [request, setRequest] = useState({
    loaded: false,
    reviews: [],
    error: "",
  });

  useEffect(() => {
    const controller = new AbortController();

    async function getReviews() {
      try {
        const response = await fetch(`${apiUrl}/api/reviews/me`, {
          credentials: "include",
          signal: controller.signal,
        });

        if (!response.ok) throw new Error("Unable to load reviews");

        setRequest({
          loaded: true,
          reviews: await response.json(),
          error: "",
        });
      } catch (requestError) {
        if (requestError.name !== "AbortError") {
          setRequest({
            loaded: true,
            reviews: [],
            error: "We couldn't load your reviews. Please try again later.",
          });
        }
      }
    }

    getReviews();

    return () => controller.abort();
  }, [apiUrl]);

  return (
    <main className="reviews-page">
      <div className="reviews-page__container">
        <header className="reviews-page__header">
          <span>Your Experience</span>
          <h1>My Reviews</h1>
          <p>Revisit every card review you've shared.</p>
        </header>

        {!request.loaded && (
          <p className="reviews-page__message" role="status">
            Loading your reviews...
          </p>
        )}

        {request.error && (
          <p className="reviews-page__message reviews-page__message--error" role="alert">
            {request.error}
          </p>
        )}

        {request.loaded && !request.error && request.reviews.length === 0 && (
          <section className="reviews-page__empty">
            <span className="material-symbols-outlined" aria-hidden="true">
              rate_review
            </span>
            <h2>No reviews yet</h2>
            <p>Your card reviews will appear here after you post them.</p>
          </section>
        )}

        {request.reviews.length > 0 && (
          <section className="reviews-page__grid" aria-label="Your card reviews">
            {request.reviews.map((review) => (
              <ReviewSummaryCard review={review} key={review.id} />
            ))}
          </section>
        )}
      </div>
    </main>
  );
}

export default Reviews;

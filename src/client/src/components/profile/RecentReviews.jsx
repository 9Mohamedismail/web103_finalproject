import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReviewSummaryCard from "../reviews/ReviewSummaryCard.jsx";

function RecentReviews({ apiUrl }) {
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
            error: "We couldn't load your recent reviews.",
          });
        }
      }
    }

    getReviews();

    return () => controller.abort();
  }, [apiUrl]);

  const recentReviews = request.reviews.slice(0, 2);

  return (
    <section className="profile-panel profile-reviews">
      <div className="profile-panel__heading">
        <h2>My Recent Reviews</h2>
        <Link className="profile-text-button" to="/reviews">
          View All
        </Link>
      </div>

      {!request.loaded && (
        <p className="profile-panel__message" role="status">
          Loading your reviews...
        </p>
      )}

      {request.error && (
        <p className="profile-panel__message profile-panel__message--error" role="alert">
          {request.error}
        </p>
      )}

      {request.loaded && !request.error && recentReviews.length === 0 && (
        <p className="profile-panel__message">
          You haven't reviewed any cards yet.
        </p>
      )}

      {recentReviews.length > 0 && (
        <div className="profile-reviews__grid">
          {recentReviews.map((review) => (
            <ReviewSummaryCard review={review} key={review.id} />
          ))}
        </div>
      )}
    </section>
  );
}

export default RecentReviews;

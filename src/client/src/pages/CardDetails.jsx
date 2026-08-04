import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import BonusBenefits from "../components/cardDetails/BonusBenefits.jsx";
import CardDetailsHero from "../components/cardDetails/CardDetailsHero.jsx";
import CardReviews from "../components/cardDetails/CardReviews.jsx";
import RewardsStructure from "../components/cardDetails/RewardsStructure.jsx";
import useFavorites from "../components/favorites/useFavorites.js";
import "../css/CardDetails.css";

function CardDetails({ apiUrl, user }) {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const editReviewId = searchParams.get("editReview");
  const [request, setRequest] = useState({
    id: "",
    card: null,
    error: "",
    notFound: false,
  });
  const favoriteManager = useFavorites(apiUrl, Boolean(user?.id));

  useEffect(() => {
    const controller = new AbortController();

    async function getCard() {
      try {
        const response = await fetch(
          `${apiUrl}/api/cards/${encodeURIComponent(id)}`,
          { signal: controller.signal },
        );

        if (response.status === 404) {
          setRequest({ id, card: null, error: "", notFound: true });
          return;
        }

        if (!response.ok) throw new Error("Unable to load card");

        setRequest({
          id,
          card: await response.json(),
          error: "",
          notFound: false,
        });
      } catch (requestError) {
        if (requestError.name !== "AbortError") {
          setRequest({
            id,
            card: null,
            error: "We couldn't load this card. Please try again later.",
            notFound: false,
          });
        }
      }
    }

    getCard();

    return () => controller.abort();
  }, [apiUrl, id]);

  const isLoading = request.id !== id;

  if (isLoading) {
    return (
      <main className="card-detail-canvas">
        <p className="card-detail-status" role="status">
          Loading card details...
        </p>
      </main>
    );
  }

  if (request.notFound || request.error) {
    return (
      <main className="card-detail-canvas">
        <section className="card-detail-empty">
          <span className="material-symbols-outlined" aria-hidden="true">
            {request.notFound ? "search_off" : "error"}
          </span>
          <h1>{request.notFound ? "Card Not Found" : "Unable to Load Card"}</h1>
          <p>
            {request.notFound
              ? "We couldn't find the card you're looking for."
              : request.error}
          </p>
          <Link to="/discover">Back to Discover</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="card-detail-canvas">
      <div className="card-detail-canvas__inner">
        <CardDetailsHero
          card={request.card}
          favoriteManager={user?.id ? favoriteManager : null}
        />

        <div className="card-detail-grid">
          <RewardsStructure rewards={request.card.reward_rates} />
          <BonusBenefits
            signupBonus={request.card.signup_bonus}
            benefits={request.card.benefits}
          />
        </div>

        <CardReviews
          apiUrl={apiUrl}
          cardId={request.card.id}
          user={user}
          editReviewId={editReviewId}
          key={request.card.id}
        />
      </div>
    </main>
  );
}

export default CardDetails;

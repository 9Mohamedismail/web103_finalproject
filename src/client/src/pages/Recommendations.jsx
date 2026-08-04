import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import DiscoverCardGrid from "../components/discover/DiscoverCardGrid.jsx";
import DiscoverPagination from "../components/discover/DiscoverPagination.jsx";
import useFavorites from "../components/favorites/useFavorites.js";
import CardMatchForm from "../components/recommendations/CardMatchForm.jsx";
import RecommendationsEmptyState from "../components/recommendations/RecommendationsEmptyState.jsx";
import RecommendationsHeader from "../components/recommendations/RecommendationsHeader.jsx";
import "../css/Discover.css";
import "../css/Recommendations.css";

const CARDS_PER_PAGE = 9;
const SCORE_MINIMUMS = {
  "300-579": 300,
  "580-669": 580,
  "670-739": 670,
  "740-850": 740,
};
const VALID_GOALS = new Set([
  "dining",
  "groceries",
  "gas",
  "travel",
  "flights",
  "hotels",
  "streaming",
  "online_shopping",
  "transit",
]);
const VALID_CARD_TYPES = new Set(["personal", "student", "business", "secured"]);

function getCreditScoreRange(creditScore) {
  if (
    !Number.isInteger(creditScore) ||
    creditScore < 300 ||
    creditScore > 850
  ) {
    return null;
  }
  if (creditScore <= 579) return "300-579";
  if (creditScore <= 669) return "580-669";
  if (creditScore <= 739) return "670-739";
  return "740-850";
}

function getPreferences(searchParams) {
  const score = searchParams.get("score");
  const goals = [...new Set(searchParams.getAll("goal"))];
  const cardType = searchParams.get("type");
  const isValid =
    Boolean(SCORE_MINIMUMS[score]) &&
    goals.length >= 1 &&
    goals.length <= 3 &&
    goals.every((goal) => VALID_GOALS.has(goal)) &&
    (!cardType || VALID_CARD_TYPES.has(cardType));

  if (!isValid) return null;

  return {
    score,
    scoreMinimum: SCORE_MINIMUMS[score],
    goals,
    cardType,
  };
}

function getGoalMatchCount(card, goals) {
  const categories = new Set(
    card.reward_rates.map((reward) => reward.category),
  );

  return goals.filter((goal) => categories.has(goal)).length;
}

function getMatchingCards(
  cards,
  preferences,
  includePartialGoals,
  includeLowerScores,
) {
  return cards
    .map((card) => ({
      card,
      goalMatchCount: getGoalMatchCount(card, preferences.goals),
    }))
    .filter(({ card, goalMatchCount }) => {
      const scoreMatches = includeLowerScores
        ? card.credit_score_min <= preferences.scoreMinimum
        : card.credit_score_min === preferences.scoreMinimum;
      const typeMatches =
        !preferences.cardType || card.card_type === preferences.cardType;
      const goalsMatch = includePartialGoals
        ? goalMatchCount > 0
        : goalMatchCount === preferences.goals.length;

      return scoreMatches && typeMatches && goalsMatch;
    })
    .sort(
      (first, second) =>
        second.goalMatchCount - first.goalMatchCount ||
        second.card.credit_score_min - first.card.credit_score_min,
    )
    .map(({ card }) => card);
}

function Recommendations({ apiUrl, user, isAuthLoading }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const preferenceQuery = searchParams.toString();
  const preferences = useMemo(
    () => getPreferences(new URLSearchParams(preferenceQuery)),
    [preferenceQuery],
  );
  const [cardRequest, setCardRequest] = useState({
    query: "",
    cards: [],
    error: "",
  });
  const [includePartialGoals, setIncludePartialGoals] = useState(false);
  const [includeLowerScores, setIncludeLowerScores] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const favoriteManager = useFavorites(apiUrl, Boolean(user?.id));

  useEffect(() => {
    if (!preferences) return undefined;

    const controller = new AbortController();

    async function getCards() {
      try {
        const response = await fetch(`${apiUrl}/api/cards`, {
          signal: controller.signal,
        });

        if (!response.ok) throw new Error("Unable to load recommendations");

        setCardRequest({
          query: preferenceQuery,
          cards: await response.json(),
          error: "",
        });
      } catch (requestError) {
        if (requestError.name !== "AbortError") {
          setCardRequest({
            query: preferenceQuery,
            cards: [],
            error: "We couldn't load your recommendations. Please try again later.",
          });
        }
      }
    }

    getCards();

    return () => controller.abort();
  }, [apiUrl, preferenceQuery, preferences]);

  function submitPreferences({ creditScore, primaryGoals, cardType }) {
    const nextSearchParams = new URLSearchParams({ score: creditScore });

    primaryGoals.forEach((goal) => {
      nextSearchParams.append(
        "goal",
        goal.toLowerCase().replaceAll(" ", "_"),
      );
    });

    if (cardType) nextSearchParams.set("type", cardType);

    setIncludePartialGoals(false);
    setIncludeLowerScores(false);
    setCurrentPage(1);
    setSearchParams(nextSearchParams);
  }

  function resetPreferences() {
    setIncludePartialGoals(false);
    setIncludeLowerScores(false);
    setCurrentPage(1);
    setSearchParams({});
  }

  if (!preferences) {
    if (isAuthLoading) {
      return (
        <main className="recommendations-canvas">
          <p className="recommendations-status" role="status">
            Checking your saved preferences...
          </p>
        </main>
      );
    }

    return (
      <main className="recommendations-canvas">
        <div className="recommendations-form-view">
          <div className="recommendations-form-view__intro">
            <span>Preference-Based Card Matching</span>
            <h1>Filter the Catalog Around Your Priorities</h1>
            <p>
              Choose your estimated credit range, preferred reward categories,
              and an optional card type. CardMaxer will filter the catalog using
              those selections; results are not approval guarantees.
            </p>
          </div>
          <CardMatchForm
            initialCreditScore={getCreditScoreRange(user?.credit_score)}
            onSubmit={submitPreferences}
          />
        </div>
      </main>
    );
  }

  const requestIsCurrent = cardRequest.query === preferenceQuery;
  const cards = requestIsCurrent ? cardRequest.cards : [];
  const error = requestIsCurrent ? cardRequest.error : "";
  const isLoading = !requestIsCurrent;

  const exactMatches = getMatchingCards(cards, preferences, false, false);
  const matchingCards = getMatchingCards(
    cards,
    preferences,
    includePartialGoals,
    includeLowerScores,
  );
  const pageCount = Math.ceil(matchingCards.length / CARDS_PER_PAGE);
  const pageStart = (currentPage - 1) * CARDS_PER_PAGE;
  const visibleCards = matchingCards.slice(
    pageStart,
    pageStart + CARDS_PER_PAGE,
  );
  const canBroaden =
    (preferences.goals.length > 1 && !includePartialGoals) ||
    (preferences.scoreMinimum > 300 && !includeLowerScores);

  function changePartialGoals(value) {
    setIncludePartialGoals(value);
    setCurrentPage(1);
  }

  function changeLowerScores(value) {
    setIncludeLowerScores(value);
    setCurrentPage(1);
  }

  return (
    <main className="recommendations-canvas">
      <div className="recommendations-canvas__inner">
        {isLoading && (
          <p className="recommendations-status" role="status">
            Finding cards that match your preferences...
          </p>
        )}

        {error && (
          <p className="recommendations-status recommendations-status--error" role="alert">
            {error}
          </p>
        )}

        {!isLoading && !error && (
          <>
            <RecommendationsHeader
              preferences={preferences}
              resultCount={matchingCards.length}
              exactMatchCount={exactMatches.length}
              includePartialGoals={includePartialGoals}
              includeLowerScores={includeLowerScores}
              onPartialGoalsChange={changePartialGoals}
              onLowerScoresChange={changeLowerScores}
              onReset={resetPreferences}
            />

            {matchingCards.length > 0 ? (
              <>
                <DiscoverCardGrid
                  cards={visibleCards}
                  favoriteManager={user?.id ? favoriteManager : null}
                />
                <DiscoverPagination
                  currentPage={currentPage}
                  pageCount={pageCount}
                  onPageChange={setCurrentPage}
                />
              </>
            ) : (
              <RecommendationsEmptyState
                canBroaden={canBroaden}
                onReset={resetPreferences}
              />
            )}
          </>
        )}
      </div>
    </main>
  );
}

export default Recommendations;

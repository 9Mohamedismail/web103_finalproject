import { useEffect, useState } from "react";
import DiscoverHero from "../components/discover/DiscoverHero.jsx";
import DiscoverCardGrid from "../components/discover/DiscoverCardGrid.jsx";
import DiscoverPagination from "../components/discover/DiscoverPagination.jsx";
import useFavorites from "../components/favorites/useFavorites.js";
import "../css/Discover.css";

const CARDS_PER_PAGE = 9;

const SEARCH_ALIASES = {
  "american-express": "american express amex",
  amex: "american express amex",
  mastercard: "mastercard master card",
};

function normalizeSearchValue(value) {
  return String(value)
    .toLowerCase()
    .replaceAll("_", " ")
    .replaceAll("-", " ");
}

function cardMatchesSearch(card, searchTerm) {
  const searchableValues = [
    card.name,
    card.issuer,
    card.network,
    card.card_type,
    ...card.reward_rates.map((reward) => reward.category),
    SEARCH_ALIASES[card.issuer],
    SEARCH_ALIASES[card.network],
  ];

  return searchableValues
    .filter(Boolean)
    .some((value) => normalizeSearchValue(value).includes(searchTerm));
}

function Discover({ apiUrl, user }) {
  const [cards, setCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const favoriteManager = useFavorites(apiUrl, Boolean(user?.id));

  useEffect(() => {
    const controller = new AbortController();

    async function getCards() {
      try {
        const response = await fetch(`${apiUrl}/api/cards`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Unable to load cards");
        }

        const data = await response.json();
        setCards(data);
      } catch (requestError) {
        if (requestError.name !== "AbortError") {
          setError("We couldn't load the cards. Please try again later.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    getCards();

    return () => controller.abort();
  }, [apiUrl]);

  const normalizedSearch = normalizeSearchValue(searchTerm.trim());
  const filteredCards = normalizedSearch
    ? cards.filter((card) => cardMatchesSearch(card, normalizedSearch))
    : cards;
  const pageCount = Math.ceil(filteredCards.length / CARDS_PER_PAGE);
  const pageStart = (currentPage - 1) * CARDS_PER_PAGE;
  const visibleCards = filteredCards.slice(
    pageStart,
    pageStart + CARDS_PER_PAGE,
  );

  function handleSearchChange(value) {
    setSearchTerm(value);
    setCurrentPage(1);
  }

  return (
    <main className="catalog-canvas">
      <div className="catalog-canvas__inner">
        <DiscoverHero
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
        />

        {isLoading && (
          <p className="catalog-status" role="status">
            Loading cards...
          </p>
        )}

        {error && (
          <p className="catalog-status catalog-status--error" role="alert">
            {error}
          </p>
        )}

        {!isLoading && !error && filteredCards.length === 0 && (
          <p className="catalog-status">No cards match your search.</p>
        )}

        {!isLoading && !error && filteredCards.length > 0 && (
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
        )}
      </div>
    </main>
  );
}

export default Discover;

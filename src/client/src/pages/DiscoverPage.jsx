import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./DiscoverPage.css";

//replace later
const API_URL = "http://localhost:3001";

function DiscoverPage() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    async function fetchCards() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_URL}/api/cards`);
        if (!response.ok) {
          throw new Error("Failed to load cards");
        }

        const data = await response.json();
        setCards(data.data ?? []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCards();
  }, []);

  // Filter by name as the user types (case-insensitive).
  const filteredCards = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return cards;
    return cards.filter((card) => card.name?.toLowerCase().includes(term));
  }, [cards, query]);

  if (loading) {
    return <h1 className="discover-loading">Loading...</h1>;
  }

  if (error) {
    return (
      <main className="discover-page">
        <h1>Find Your Perfect Card</h1>
        <p className="discover-error">Something went wrong: {error}</p>
      </main>
    );
  }

  return (
    <main className="discover-page">
      <h1>Find Your Perfect Card</h1>

      <input
        type="search"
        className="discover-search"
        placeholder="Search cards by name..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      {filteredCards.length === 0 ? (
        <p className="discover-empty">
          {query
            ? `No cards match "${query}".`
            : "No cards available right now."}
        </p>
      ) : (
        <div className="discover-grid">
          {filteredCards.map((card) => (
            <Link
              className="discover-card"
              key={card.id}
              to={`/card/${card.id}`}
            >
              <h3>{card.name}</h3>
              <p>{card.issuers?.name}</p>
              <p>${card.annual_fee}</p>
              <p>Signup bonus: {card.signup_bonus}</p>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}

export default DiscoverPage;

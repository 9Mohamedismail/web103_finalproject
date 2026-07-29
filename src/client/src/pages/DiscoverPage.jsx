import { useEffect, useState } from "react";
import "./DiscoverPage.css";

//replace later
const API_URL = "http://localhost:3001";

function DiscoverPage() {
  const [cards, setCards] = useState([]);
  const [loading, isLoading] = useState(true);

  useEffect(() => {
    async function fetchCards() {
      const response = await fetch(`${API_URL}/api/cards`);
      const data = await response.json();

      console.log(data.data);
      setCards(data.data);
      isLoading(false);
    }

    fetchCards();
  }, []);

  if (loading) {
    return <h1 className="discover-loading">Loading...</h1>;
  }
  return (
    <main className="discover-page">
      {/* temp css/design */}
      <h1>Find Your Perfect Card</h1>
      <div className="discover-grid">
        {cards.map((card) => (
          <div className="discover-card" key={card.id}>
            <h3>{card.name}</h3>
            <p>{card.issuers.name}</p>
            <p>${card.annual_fee}</p>
            <p>Signup bonus: {card.signup_bonus}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
export default DiscoverPage;

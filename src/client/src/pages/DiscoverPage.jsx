import { useEffect, useState } from "react";
import { data } from "react-router-dom";

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
    return <h1>Loading...</h1>;
  }
  return (
    <>
      <h1>Find Your Perfect Card</h1>
      {cards.map((card) => (
        <div>
          <h3>{card.name}</h3>
          <p>{card.issuers.name}</p>
          <p>${card.annual_fee}</p>
          <p>Signup bonus: {card.signup_bonus}</p>
        </div>
      ))}
    </>
  );
}
export default DiscoverPage;

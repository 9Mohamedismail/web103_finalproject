import { response } from "express";
import { useEffect, useState } from "react";
import { data } from "react-router-dom";

//replace later
const API_URL = "http://localhost:3001";

function DiscoverPage() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function fetchCards() {
      const response = await fetch(`${API_URL}/api/cards`);
      const data = await response.json();

      console.log(response);
      console.log(data);
      setCards(data);
    }

    fetchCards();
  }, []);

  return (
    <>
      <div>
        <h1>hi</h1>
      </div>
    </>
  );
}
export default DiscoverPage;

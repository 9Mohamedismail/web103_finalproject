import DiscoverCard from "./DiscoverCard.jsx";

function DiscoverCardGrid({ cards, favoriteManager }) {
  return (
    <section className="catalog-grid" aria-label="Credit cards">
      {cards.map((card) => (
        <DiscoverCard
          card={card}
          favoriteManager={favoriteManager}
          key={card.id}
        />
      ))}
    </section>
  );
}

export default DiscoverCardGrid;

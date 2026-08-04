import FavoriteCard from "../components/favorites/FavoriteCard.jsx";
import useFavorites from "../components/favorites/useFavorites.js";
import "../css/Favorites.css";

function Favorites({ apiUrl }) {
  const favoriteManager = useFavorites(apiUrl);

  return (
    <main className="favorites-page">
      <div className="favorites-page__container">
        <header className="favorites-page__header">
          <span>Your Shortlist</span>
          <h1>My Favorite Cards</h1>
          <p>Review the cards you've saved and return to their full details.</p>
        </header>

        {!favoriteManager.isLoaded && (
          <p className="favorites-page__message" role="status">
            Loading your favorite cards...
          </p>
        )}

        {favoriteManager.loadError && (
          <p className="favorites-page__message favorites-page__message--error" role="alert">
            {favoriteManager.loadError}
          </p>
        )}

        {favoriteManager.mutationError.message && (
          <p className="favorites-page__message favorites-page__message--error" role="alert">
            {favoriteManager.mutationError.message}
          </p>
        )}

        {favoriteManager.isLoaded &&
          !favoriteManager.loadError &&
          favoriteManager.favorites.length === 0 && (
            <section className="favorites-page__empty">
              <span className="material-symbols-outlined" aria-hidden="true">
                favorite_border
              </span>
              <h2>No favorite cards yet</h2>
              <p>Your saved cards will appear here when you favorite them.</p>
            </section>
          )}

        {favoriteManager.favorites.length > 0 && (
          <section
            className="favorites-page__grid"
            aria-label="Your favorite cards"
          >
            {favoriteManager.favorites.map((card) => (
              <FavoriteCard
                card={card}
                isPending={favoriteManager.pendingIds.has(card.id)}
                key={card.id}
                onDelete={() => favoriteManager.toggleFavorite(card.id)}
              />
            ))}
          </section>
        )}
      </div>
    </main>
  );
}

export default Favorites;

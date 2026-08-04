import { Link } from "react-router-dom";
import useFavorites from "../favorites/useFavorites.js";

function formatDate(value) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function SavedCards({ apiUrl }) {
  const favoriteManager = useFavorites(apiUrl);
  const recentFavorites = favoriteManager.favorites.slice(0, 3);

  return (
    <section className="profile-panel profile-saved-cards">
      <div className="profile-panel__heading">
        <h2>My Saved Cards</h2>
        <Link className="profile-text-button" to="/favorites">
          View All
        </Link>
      </div>

      {!favoriteManager.isLoaded && (
        <p className="profile-panel__message" role="status">
          Loading your saved cards...
        </p>
      )}

      {favoriteManager.loadError && (
        <p className="profile-panel__message profile-panel__message--error" role="alert">
          {favoriteManager.loadError}
        </p>
      )}

      {favoriteManager.isLoaded &&
        !favoriteManager.loadError &&
        recentFavorites.length === 0 && (
          <p className="profile-panel__message">
            You haven't favorited any cards yet.
          </p>
        )}

      {favoriteManager.mutationError.message && (
        <p className="profile-saved-cards__error" role="alert">
          {favoriteManager.mutationError.message}
        </p>
      )}

      {recentFavorites.length > 0 && (
        <div className="profile-saved-cards__table-wrap">
          <table className="profile-saved-cards__table">
            <thead>
              <tr>
                <th scope="col">Card Product</th>
                <th scope="col">Saved On</th>
                <th scope="col">
                  <span className="profile-visually-hidden">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {recentFavorites.map((card) => {
                const isPending = favoriteManager.pendingIds.has(card.id);

                return (
                  <tr key={card.id}>
                    <td>
                      <div className="profile-saved-card__name">
                        <img src={card.image_url} alt="" loading="lazy" />
                        <strong>{card.name}</strong>
                      </div>
                    </td>
                    <td className="profile-saved-card__date">
                      {formatDate(card.saved_at)}
                    </td>
                    <td className="profile-saved-card__actions">
                      <Link to={`/cards/${card.id}`}>View Card</Link>
                      <button
                        type="button"
                        disabled={isPending}
                        onClick={() => favoriteManager.toggleFavorite(card.id)}
                      >
                        {isPending ? "Removing..." : "Unfavorite"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default SavedCards;

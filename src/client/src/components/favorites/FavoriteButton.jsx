import "../../css/Favorites.css";

function FavoriteButton({ cardId, favoriteManager, className = "" }) {
  const isFavorite = favoriteManager.favoriteIds.has(cardId);
  const isPending = favoriteManager.pendingIds.has(cardId);
  const error =
    favoriteManager.mutationError.cardId === cardId
      ? favoriteManager.mutationError.message
      : "";

  let label = isFavorite ? "Remove Favorite" : "Favorite Card";
  if (!favoriteManager.isLoaded) label = "Loading Favorites...";
  if (favoriteManager.loadError) label = "Favorites Unavailable";
  if (isPending) label = isFavorite ? "Removing..." : "Saving...";

  return (
    <div className={`favorite-control ${className}`.trim()}>
      <button
        type="button"
        className={isFavorite ? "favorite-button is-favorite" : "favorite-button"}
        aria-pressed={isFavorite}
        disabled={
          !favoriteManager.isLoaded || Boolean(favoriteManager.loadError) || isPending
        }
        onClick={() => favoriteManager.toggleFavorite(cardId)}
      >
        <span className="material-symbols-outlined" aria-hidden="true">
          {isFavorite ? "favorite" : "favorite_border"}
        </span>
        {label}
      </button>
      {error && (
        <span className="favorite-control__error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

export default FavoriteButton;

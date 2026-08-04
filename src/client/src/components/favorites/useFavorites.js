import { useEffect, useMemo, useState } from "react";

async function readResponse(response) {
  if (response.status === 204) return null;

  try {
    return await response.json();
  } catch {
    return null;
  }
}

function useFavorites(apiUrl, enabled = true) {
  const [request, setRequest] = useState({
    loaded: false,
    favorites: [],
    error: "",
  });
  const [pendingIds, setPendingIds] = useState([]);
  const [mutationError, setMutationError] = useState({
    cardId: "",
    message: "",
  });

  useEffect(() => {
    if (!enabled) return undefined;

    const controller = new AbortController();

    async function getFavorites() {
      try {
        const response = await fetch(`${apiUrl}/api/favorites/me`, {
          credentials: "include",
          signal: controller.signal,
        });

        if (!response.ok) throw new Error("Unable to load favorites");

        setRequest({
          loaded: true,
          favorites: await response.json(),
          error: "",
        });
      } catch (requestError) {
        if (requestError.name !== "AbortError") {
          setRequest({
            loaded: true,
            favorites: [],
            error: "We couldn't load your favorite cards.",
          });
        }
      }
    }

    getFavorites();

    return () => controller.abort();
  }, [apiUrl, enabled]);

  const favoriteIds = useMemo(
    () => new Set(request.favorites.map((favorite) => favorite.id)),
    [request.favorites],
  );
  const pendingIdSet = useMemo(() => new Set(pendingIds), [pendingIds]);

  async function toggleFavorite(cardId) {
    if (!request.loaded || pendingIdSet.has(cardId)) return;

    const isFavorite = favoriteIds.has(cardId);
    setMutationError({ cardId: "", message: "" });
    setPendingIds((currentIds) => [...currentIds, cardId]);

    try {
      const response = await fetch(
        `${apiUrl}/api/cards/${encodeURIComponent(cardId)}/favorite`,
        {
          method: isFavorite ? "DELETE" : "POST",
          credentials: "include",
        },
      );
      const data = await readResponse(response);

      if (!response.ok) {
        throw new Error(
          data?.error ??
            (isFavorite
              ? "Unable to remove this favorite"
              : "Unable to favorite this card"),
        );
      }

      setRequest((currentRequest) => ({
        ...currentRequest,
        favorites: isFavorite
          ? currentRequest.favorites.filter((favorite) => favorite.id !== cardId)
          : [data, ...currentRequest.favorites],
      }));
    } catch (error) {
      setMutationError({ cardId, message: error.message });
    } finally {
      setPendingIds((currentIds) =>
        currentIds.filter((pendingId) => pendingId !== cardId),
      );
    }
  }

  return {
    favorites: request.favorites,
    favoriteIds,
    pendingIds: pendingIdSet,
    isLoaded: request.loaded,
    loadError: request.error,
    mutationError,
    toggleFavorite,
  };
}

export default useFavorites;

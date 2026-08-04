function DiscoverHero({ searchTerm, onSearchChange }) {
  return (
    <section className="catalog-hero" aria-labelledby="catalog-heading">
      <h1 id="catalog-heading">Explore Credit Cards</h1>
      <p>
        Search our U.S. catalog by card name, issuer, network, card type, or
        reward category.
      </p>

      <form
        className="catalog-search"
        onSubmit={(event) => event.preventDefault()}
      >
        <span
          className="material-symbols-outlined catalog-search__icon"
          aria-hidden="true"
        >
          search
        </span>
        <label className="catalog-visually-hidden" htmlFor="catalog-search-input">
          Search cards
        </label>
        <input
          id="catalog-search-input"
          type="search"
          placeholder="Search for cards, issuers, or rewards..."
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
        />
        <button type="submit" aria-label="Search credit cards">
          <span className="material-symbols-outlined" aria-hidden="true">
            arrow_forward
          </span>
        </button>
      </form>
    </section>
  );
}

export default DiscoverHero;

function DiscoverPagination({ currentPage, pageCount, onPageChange }) {
  if (pageCount <= 1) return null;

  return (
    <nav className="catalog-pagination" aria-label="Card catalog pages">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      <div className="catalog-pagination__pages">
        {Array.from({ length: pageCount }, (_, index) => {
          const page = index + 1;

          return (
            <button
              type="button"
              className={page === currentPage ? "is-active" : ""}
              aria-current={page === currentPage ? "page" : undefined}
              aria-label={`Page ${page}`}
              onClick={() => onPageChange(page)}
              key={page}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === pageCount}
      >
        Next
      </button>
    </nav>
  );
}

export default DiscoverPagination;

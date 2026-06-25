interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from(
  { length: Math.min(7, totalPages) },
  (_, i) => i + 1
);

  return (
    <nav className="pagination-container">
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={`page-item ${currentPage === page ? "active" : ""}`}
          >
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(page);
              }}
              className="page-link"
              style={{
                border: "none",
                cursor: "pointer",
                width: "100%",
                height: "100%",
                display: "block",
                background:
                  currentPage === page ? "var(--primary-color)" : "white",
                color: currentPage === page ? "white" : "var(--primary-color)",
              }}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

"useClient";

interface PaginationProps{
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination =({currentPage, totalPages, onPageChange}: PaginationProps) => {
    return(
        <div className="flex items-center justify-center gap-3 mt-8">
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            className="px-3 py-2 rounded-full border disabled:opacity-40"
            disabled={currentPage === 1}
          >
            ‹
          </button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => onPageChange(i + 1)}
              className={`w-9 h-9 rounded-full border ${currentPage === i + 1 ? "bg-[var(--colorMenus)] text-white" : ""}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            className="px-3 py-2 rounded-full border disabled:opacity-40"
            disabled={currentPage === totalPages}
          >
            ›
          </button>
        </div>
    );
}

export default Pagination;
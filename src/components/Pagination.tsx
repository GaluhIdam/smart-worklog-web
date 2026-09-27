import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  pageSizeOptions?: number[];
}

type PaginationItem = number | "ellipsis";

export default function Pagination({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 25, 50, 100],
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / pageSize);
  const canPrevious = currentPage > 1;
  const canNext = currentPage < totalPages;

  const getPages = (): PaginationItem[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, "ellipsis", totalPages];
    }

    if (currentPage >= totalPages - 3) {
      return [1, "ellipsis", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }

    return [1, "ellipsis", currentPage - 1, currentPage, currentPage + 1, "ellipsis", totalPages];
  };

  const pages = getPages();

  const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newPageSize = Number(event.target.value);
    onPageSizeChange(newPageSize);
    onPageChange(1);
  };

  return (
    <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-slate-500">Items per page</span>
          <select
            value={pageSize}
            onChange={handlePageSizeChange}
            className="h-7 cursor-pointer rounded-md border border-slate-200 bg-white px-2 text-[11px] font-medium text-slate-600 outline-none transition-colors hover:border-slate-300 focus:border-slate-400">
            {pageSizeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          disabled={!canPrevious}
          onClick={() => onPageChange(currentPage - 1)}
          className="inline-flex h-7 cursor-pointer items-center gap-1 rounded-md border border-slate-200 px-2.5 text-[11px] font-medium text-slate-600 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:text-slate-300">
          <ChevronLeft size={13} strokeWidth={1.8} />
          Previous
        </button>

        {pages.map((page, index) => {
          if (page === "ellipsis") {
            return (
              <span key={`ellipsis-${index}`} className="flex h-7 w-7 items-center justify-center text-[11px] text-slate-400">
                ...
              </span>
            );
          }

          return (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              aria-current={currentPage === page ? "page" : undefined}
              className={[
                "inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-md text-[11px] font-medium transition-colors",
                currentPage === page ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
              ].join(" ")}>
              {page}
            </button>
          );
        })}

        <button
          type="button"
          disabled={!canNext}
          onClick={() => onPageChange(currentPage + 1)}
          className="inline-flex h-7 cursor-pointer items-center gap-1 rounded-md border border-slate-200 px-2.5 text-[11px] font-medium text-slate-600 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:text-slate-300">
          Next
          <ChevronRight size={13} strokeWidth={1.8} />
        </button>
      </div>
    </div>
  );
}

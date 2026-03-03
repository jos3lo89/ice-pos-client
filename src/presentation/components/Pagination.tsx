import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  hasPrev: boolean;
  hasNext: boolean;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  hasPrev,
  hasNext,
}: PaginationProps) => {
  const getPageNumbers = () => {
    const pages: (number | "dots")[] = [];
    const siblingCount = 1; // Number of pages to show around current page

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
      return [...leftRange, "dots", totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = Array.from(
        { length: rightItemCount },
        (_, i) => totalPages - rightItemCount + i + 1,
      );
      return [1, "dots", ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i,
      );
      return [1, "dots", ...middleRange, "dots", totalPages];
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrev}
        className="bg-slate-900/50 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white disabled:opacity-30 rounded-lg gap-1 px-3 h-9 transition-all"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">
          {hasPrev ? "Anterior" : "Inicio"}
        </span>
      </Button>

      <div className="flex items-center gap-1 sm:gap-1.5 px-1 sm:px-3">
        {pageNumbers.map((p, i) => {
          if (p === "dots") {
            return (
              <div
                key={`dots-${i}`}
                className="w-8 h-8 flex items-center justify-center text-slate-500"
              >
                <MoreHorizontal className="w-4 h-4" />
              </div>
            );
          }

          return (
            <button
              key={p}
              onClick={() => onPageChange(p as number)}
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg text-xs font-black transition-all duration-300 ${
                p === currentPage
                  ? "bg-cyan-600 text-white shadow-xl shadow-cyan-900/40 scale-110"
                  : "text-slate-500 hover:text-slate-200 hover:bg-slate-700/50"
              }`}
            >
              {p}
            </button>
          );
        })}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNext}
        className="bg-slate-900/50 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white disabled:opacity-30 rounded-lg gap-1 px-3 h-9 transition-all"
      >
        <span className="hidden sm:inline">
          {hasNext ? "Siguiente" : "Final"}
        </span>
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default Pagination;

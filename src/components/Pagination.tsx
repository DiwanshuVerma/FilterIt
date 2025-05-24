import type { Dispatch, SetStateAction } from "react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    setCurrentPage: Dispatch<SetStateAction<number>>;
}

export const Pagination = ({ currentPage, totalPages, setCurrentPage }: PaginationProps) => {
    const SIBLING_COUNT = 1;

    const getPaginationRange = () => {
        const range: (number | string)[] = [];
        const DOTS = '...';

        const totalPageNumbersToShow = SIBLING_COUNT * 2 + 5;

        if (totalPages <= totalPageNumbersToShow) {
            return [...Array(totalPages).keys()].map(n => n + 1);
        }

        const leftSiblingIndex = Math.max(currentPage - SIBLING_COUNT, 1);
        const rightSiblingIndex = Math.min(currentPage + SIBLING_COUNT, totalPages);

        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

        const firstPageIndex = 1;
        const lastPageIndex = totalPages;

        if (!shouldShowLeftDots && shouldShowRightDots) {
            const leftItemCount = 3 + 2 * SIBLING_COUNT;
            const leftRange = [...Array(leftItemCount).keys()].map(n => n + 1);
            return [...leftRange, DOTS, totalPages];
        }

        if (shouldShowLeftDots && !shouldShowRightDots) {
            const rightItemCount = 3 + 2 * SIBLING_COUNT;
            const rightRange = [...Array(rightItemCount).keys()].map(n => totalPages - rightItemCount + 1 + n);
            return [firstPageIndex, DOTS, ...rightRange];
        }

        if (shouldShowLeftDots && shouldShowRightDots) {
            const middleRange = [...Array(2 * SIBLING_COUNT + 1).keys()].map(n => leftSiblingIndex + n);
            return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
        }
    };

    const paginationRange = getPaginationRange();

    return (
        <div className="flex gap-2 items-center mt-10 justify-between w-full">
            <button
                onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded"
            >
                Prev
            </button>

            <div className="space-x-4">
                {paginationRange?.map((page, idx) => (
                    <button
                        key={idx}
                        disabled={page === '...'}
                        onClick={() => typeof page === "number" && setCurrentPage(page)}
                        className={`h-10 w-10 border rounded-full ${page === currentPage ? "bg-blue-500 text-white" : ""}`}
                    >
                        {page}
                    </button>
                ))}
            </div>

            <button
                onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded"
            >
                Next
            </button>
        </div>
    );
};

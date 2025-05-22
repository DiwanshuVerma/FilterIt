import type { Dispatch, SetStateAction } from "react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    setCurrentPage: Dispatch<SetStateAction<number>>;
}

export const Pagination = ({ currentPage, totalPages, setCurrentPage }: PaginationProps) => {
    const generatePages = () => {
        const pages: (number | string)[] = [];
        const siblings = 1;

        const startPage = Math.max(1, currentPage - siblings);
        const endPage = Math.min(totalPages, currentPage + siblings);

        const showLeftDots = startPage > 2;
        const showRightDots = endPage < totalPages - 1;

        // Handle left side
        if (showLeftDots) {
            pages.push(1, "...");
        } else {
            for (let i = 1; i < startPage; i++) {
                pages.push(i);
            }
        }

        // Add middle pages
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        // Handle right side
        if (showRightDots) {
            pages.push("...", totalPages);
        } else {
            for (let i = endPage + 1; i <= totalPages; i++) {
                pages.push(i);
            }
        }

        return pages;
    };

    const pages = generatePages();

    return (
        <div className="flex items-center gap-2 mt-4 w-full justify-between">
            <button
                className="px-4 py-2 rounded-lg bg-gray-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
            >
                &lt; Previous
            </button>

            <div className="flex gap-1">
                {pages.map((page, idx) =>
                    typeof page === "string" ? (
                        <span key={idx} className="px-2 py-1">
                            ...
                        </span>
                    ) : (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-2 py-1 border rounded ${
                                currentPage === page
                                    ? "bg-blue-500 text-white border-blue-500"
                                    : "hover:bg-gray-100"
                            }`}
                        >
                            {page}
                        </button>
                    )
                )}
            </div>

            <button
                className="px-4 py-2 rounded-lg bg-gray-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
            >
                Next &gt;
            </button>
        </div>
    );
};
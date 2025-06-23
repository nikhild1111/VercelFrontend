import React from "react";

const Pagination = ({ page, totalPages, onPageChange }) => {
  // Your logic preserved
  const generatePaginationNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
      }
    }

    return pages;
  };

  return (
    totalPages > 1 && (
      <div className="flex flex-col items-center space-y-4 mt-14">
        {/* Pagination Controls */}
        <div className="flex items-center justify-center space-x-2 bg-gray-800 px-4 py-3 rounded-lg shadow-lg">
          {/* Previous Button */}
          <button
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
            className={`
              px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-sm sm:text-base font-medium
              transition-all duration-300 ease-in-out
              ${page === 1 
                ? 'text-gray-500 cursor-not-allowed opacity-50' 
                : 'text-white hover:bg-gray-700 hover:scale-105 active:scale-95'
              }
            `}
          >
            <span className="block sm:hidden text-lg">{'<'}</span>
            <span className="hidden sm:block">Previous</span>
          </button>

          {/* Page Numbers */}
          <div className="flex items-center space-x-1 mx-1 sm:mx-2">
            {generatePaginationNumbers().map((pageNum, index) =>
              pageNum === '...' ? (
                <span
                  key={`ellipsis-${index}`}
                  className="px-2 py-1 text-gray-400 text-sm sm:text-base"
                >
                  ...
                </span>
              ) : (
                <button
                  key={pageNum}
                  onClick={() => onPageChange(pageNum)}
                  className={`
                    w-9 h-9 sm:w-10 sm:h-10 rounded-md text-sm sm:text-base font-semibold
                    transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95
                    ${page === pageNum
                      ? 'bg-red-600 text-white shadow-md shadow-red-600/50 scale-105' 
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }
                  `}
                >
                  {pageNum}
                </button>
              )
            )}
          </div>

          {/* Last Page Jump (only if totalPages > 600) */}
          {totalPages > 600 && !generatePaginationNumbers().includes(totalPages) && (
            <>
              <span className="px-2 py-1 text-gray-400 text-sm sm:text-base">...</span>
              <button
                onClick={() => onPageChange(totalPages)}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-md text-sm sm:text-base font-semibold transition-all duration-300 ease-in-out
                         text-gray-300 hover:bg-gray-700 hover:text-white transform hover:scale-105 active:scale-95"
              >
                {totalPages}
              </button>
            </>
          )}

          {/* Next Button */}
          <button
            disabled={page === totalPages}
            onClick={() => onPageChange(page + 1)}
            className={`
              px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-sm sm:text-base font-medium transition-all duration-300 ease-in-out
              ${page === totalPages 
                ? 'text-gray-500 cursor-not-allowed opacity-50' 
                : 'text-white hover:bg-gray-700 hover:scale-105 active:scale-95'
              }
            `}
          >
            <span className="block sm:hidden text-lg">{'>'}</span>
            <span className="hidden sm:block">Next</span>
          </button>
        </div>

        {/* Page info */}
        <div className="flex justify-center">
          <div className="text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-full">
            Showing page {page} of {totalPages}
          </div>
        </div>
      </div>
    )
  );
};

export default Pagination;

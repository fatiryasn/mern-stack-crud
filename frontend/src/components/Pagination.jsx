//module
import React from "react";

//component
const Pagination = ({ page, totalPages, handlePageChange }) => {
  return (
    <div className="flex justify-center items-center mt-10">
      <div className="flex">
        <button
          className="px-4 py-2 ml-5 shadow-lg bg-darkGreen text-cusBeige rounded-l-lg disabled:text-gray-400"
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          {'<'}
        </button>

        <span className="font-quicksand mx-4 py-2 text-lg">
          Page {page} of {totalPages}
        </span>
        <button
          className="px-4 py-2 ml-2 shadow-lg bg-darkGreen text-cusBeige rounded-r-lg disabled:text-gray-400"
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= totalPages}
        >
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default Pagination;

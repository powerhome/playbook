import React, { useState } from "react";
import Icon from '../pb_icon/_icon';

type PaginationProps = {
  pageRange?: number;
  totalPages?: number;
};

const Pagination = ({
  pageRange = 5,
  totalPages = 1,
}: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const renderPageButtons = () => {
    const buttons = [];

    // Calculate pagination range with let
    let rangeStart = Math.max(1, currentPage - Math.floor(pageRange / 2));
    let rangeEnd = Math.min(totalPages, rangeStart + pageRange - 1);

    // Adjust range if it's too short to fit the pageRange
    if (rangeEnd - rangeStart + 1 < pageRange) {
      if (rangeStart > 1) {
        rangeStart = Math.max(1, rangeEnd - pageRange + 1);
      } else {
        rangeEnd = Math.min(totalPages, rangeStart + pageRange - 1);
      }
    }

    // Always display the first page button
    if (rangeStart > 1) {
      buttons.push(
        <button
            className="pagination-number"
            key={1}
            onClick={() => handlePageChange(1)}
        >
          1
        </button>
      );
    }

    // Always display the second page button
    if (rangeStart > 2) {
      buttons.push(
        <button
            className="pagination-number"
            key={2}
            onClick={() => handlePageChange(2)}
        >
          2
        </button>
      );
    }

    // Display page buttons within the calculated range
    for (let i = rangeStart; i <= rangeEnd; i++) {
      buttons.push(
        <button
            className={`pagination-number ${i === currentPage ? "active" : ""}`}
            key={i}
            onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    // Always display the second-to-last page button
    if (rangeEnd < totalPages - 1) {
      buttons.push(
        <button
            className={`pagination-number ${totalPages - 1 === currentPage ? "active" : ""}`}
            key={totalPages - 1}
            onClick={() => handlePageChange(totalPages - 1)}
        >
          {totalPages - 1}
        </button>
      );
    }

    // Always display the last page button
    if (rangeEnd < totalPages) {
      buttons.push(
        <button
            className={`pagination-number ${totalPages === currentPage ? "active" : ""}`}
            key={totalPages}
            onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className="pb_pagination">
      <button
          className="pagination-left"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
      >
        <Icon icon="chevron-left" />
      </button>
      {renderPageButtons()}
      <button
          className="pagination-right"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
      >
        <Icon icon="chevron-right" />
      </button>
    </div>
  );
};

export default Pagination;

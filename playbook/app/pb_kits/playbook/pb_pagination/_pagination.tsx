import React, { useState } from "react";
import Icon from '../pb_icon/_icon';

type PaginationProps = {
  current?: number;
  onChange?: (pageNumber: number) => void;
  range?: number;
  total?: number;
};

const Pagination = ({
  current = 1,
  onChange,
  range = 5,
  total = 1,
}: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(current);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= total) {
      setCurrentPage(pageNumber);
      if (onChange) {
        onChange(pageNumber);
      }
    }
  };

  const renderPageButtons = (): JSX.Element[] => {
    const buttons: JSX.Element[] = [];
  
    // Calculate pagination range with let
    let rangeStart = Math.max(1, currentPage - Math.floor(range / 2));
    let rangeEnd = Math.min(total, rangeStart + range - 1);
  
    // Adjust range if it's too short to fit the range
    if (rangeEnd - rangeStart + 1 < range) {
      if (rangeStart > 1) {
        rangeStart = Math.max(1, rangeEnd - range + 1);
      } else {
        rangeEnd = Math.min(total, rangeStart + range - 1);
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
    if (rangeEnd < total - 1) {
      buttons.push(
        <button
            className={`pagination-number ${total - 1 === currentPage ? "active" : ""}`}
            key={total - 1}
            onClick={() => handlePageChange(total - 1)}
        >
          {total - 1}
        </button>
      );
    }

    // Always display the last page button
    if (rangeEnd < total) {
      buttons.push(
        <button
            className={`pagination-number ${total === currentPage ? "active" : ""}`}
            key={total}
            onClick={() => handlePageChange(total)}
        >
          {total}
        </button>
      );
    }

    return buttons;
  };
  

  return (
    <div className="pb_paginate">
      <div className="pb_pagination react_pagination">
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
            disabled={currentPage === total}
            onClick={() => handlePageChange(currentPage + 1)}
        >
          <Icon icon="chevron-right" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;

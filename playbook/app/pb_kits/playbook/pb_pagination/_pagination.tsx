import React, { useState, useEffect } from "react";
import classnames from 'classnames'
import { GlobalProps, globalProps } from '../utilities/globalProps'
import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'
import Icon from '../pb_icon/_icon';

type PaginationProps = {
  aria?: { [key: string]: string },
  className?: string,
  data?: { [key: string]: string },
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string,
  current?: number;
  onChange?: (pageNumber: number) => void;
  range?: number;
  total?: number;
} & GlobalProps;

const Pagination = ( props: PaginationProps) => {
  const {
    aria = {},
    className,
    data = {},
    htmlOptions = {},
    id,
    current = 1,
    onChange,
    range = 5,
    total = 1,
  } = props
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
        <li
            className="pagination-number"
            key={1}
            onClick={() => handlePageChange(1)}
        >
          1
        </li>
      );
    }
  
    // Always display the second page button
    if (rangeStart > 2) {
      buttons.push(
        <li
            className="pagination-number"
            key={2}
            onClick={() => handlePageChange(2)}
        >
          2
        </li>
      );
    }

    // Display page buttons within the calculated range
    for (let i = rangeStart; i <= rangeEnd; i++) {
      buttons.push(
        <li
            className={`pagination-number ${i === currentPage ? "active" : ""}`}
            key={i}
            onClick={() => handlePageChange(i)}
        >
          {i}
        </li>
      );
    }

    // Always display the second-to-last page button
    if (rangeEnd < total - 1) {
      buttons.push(
        <li
            className={`pagination-number ${total - 1 === currentPage ? "active" : ""}`}
            key={total - 1}
            onClick={() => handlePageChange(total - 1)}
        >
          {total - 1}
        </li>
      );
    }

    // Always display the last page button
    if (rangeEnd < total) {
      buttons.push(
        <li
            className={`pagination-number ${total === currentPage ? "active" : ""}`}
            key={total}
            onClick={() => handlePageChange(total)}
        >
          {total}
        </li>
      );
    }

    
    return buttons;
  };

  // Sync internal state with external current prop
  useEffect(() => {
    if (current >= 1 && current <= total) {
      setCurrentPage(current);
    }
  }, [current, total]);
  

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)
  const classes = classnames(
    buildCss('pb_paginate'),
    globalProps(props),
    className
  )

  if (total <= 1) {
    return null;
  }

  return (
    <div 
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        className={classes}
        id={id}
    >
      <div className="pb_pagination">
        <li
            className={`pagination-left ${currentPage === 1 ? 'disabled' : ''}`}
            onClick={() => handlePageChange(currentPage - 1)}
        >
          <Icon icon="chevron-left" />
        </li>
        {renderPageButtons()}
        <li
            className={`pagination-right ${currentPage === total ? 'disabled' : ''}`}
            onClick={() => handlePageChange(currentPage + 1)}
        >
          <Icon icon="chevron-right" />
        </li>
      </div>
    </div>
  );
};

export default Pagination;

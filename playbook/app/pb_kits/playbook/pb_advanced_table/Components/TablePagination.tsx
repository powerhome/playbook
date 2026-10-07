import React from "react";
import Pagination from "../../pb_pagination/_pagination";
import SectionSeparator from "../../pb_section_separator/_section_separator";

interface TablePaginationProps {
  onChange: (page: number) => void;
  position: "top" | "bottom";
  range?: number;
  sectionSeparator?: boolean;
  table: any;
}

const TablePagination: React.FC<TablePaginationProps> = ({
  onChange,
  position,
  range = 5,
  sectionSeparator = false,
  table,
}) => {
  const current = table.getState().pagination.pageIndex + 1;
  const total = table.getPageCount();

  // Pagination returns null when total <= 1; avoid orphan separators.
  if (total <= 1) {
    return null;
  }

  const pagination = (
    <Pagination
        current={current}
        key={`pagination-${position}-${current}`}
        marginBottom={!sectionSeparator && position === "top" ? "xs" : undefined}
        marginLeft={sectionSeparator ? "lg" : undefined}
        marginTop={!sectionSeparator && position === "bottom" ? "xs" : undefined}
        onChange={onChange}
        paddingY={sectionSeparator ? "xs" : undefined}
        range={range}
        total={total}
    />
  );

  if (!sectionSeparator) {
    return pagination;
  }

  return (
    <>
      <SectionSeparator />
      {pagination}
      {position === "top" && <SectionSeparator />}
    </>
  );
};

export default TablePagination;

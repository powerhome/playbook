import React from "react";
import Pagination from "../../pb_pagination/_pagination";

interface TablePaginationProps {
  table: any;
  onChange: (page: number) => void;
  position: "top" | "bottom";
  range?: number;
}

const TablePagination: React.FC<TablePaginationProps> = ({
  table,
  onChange,
  position,
  range = 5
}) => {
  const current = table.getState().pagination.pageIndex + 1;
  const total = table.getPageCount();

  return (
    <Pagination
        current={current}
        key={`pagination-${position}-${current}`}
        marginBottom={position === "top" ? "xs" : undefined}
        marginTop={position === "bottom" ? "xs" : undefined}
        onChange={onChange}
        range={range}
        total={total}
    />
  );
};

export default TablePagination;

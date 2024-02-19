import React, { useState, useEffect, useCallback } from "react";
import classnames from "classnames";
import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from "../utilities/props";
import { globalProps, GlobalProps } from "../utilities/globalProps";
import Table from "../pb_table/_table";
import {
  createColumnHelper,
  getCoreRowModel,
  getExpandedRowModel,
  getSortedRowModel,
  Row,
  useReactTable,
  Getter,
} from "@tanstack/react-table";

import { updateExpandAndCollapseState } from "./Utilities/ExpansionControlHelpers";

import { CustomCell } from "./Components/CustomCell";
import AdvancedTableContext from "./Context/AdvancedTableContext";
import { TableHeader } from "./SubKits/TableHeader";
import { TableBody } from "./SubKits/TableBody";

import { DataType, ExpandedStateObject } from "./Utilities/types";

type AdvancedTableProps = {
  aria?: { [key: string]: string };
  children?: React.ReactNode | React.ReactNode[];
  className?: string;
  columnDefinitions: DataType[];
  data?: { [key: string]: string };
  enableToggleExpansion?: "all" | "header" | "none";
  expandedControl?: DataType;
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string;
  initialLoadingRowsCount?: number;
  inlineRowLoading?: boolean;
  loading?: boolean | string;
  onRowToggleClick?: (arg: Row<DataType>) => void;
  onToggleExpansionClick?: (arg: Row<DataType>) => void;
  sortControl?: DataType;
  tableData: DataType[];
  tableOptions?: DataType;
  tableProps?: DataType;
  toggleExpansionIcon?: string | string[];
} & GlobalProps;

const AdvancedTable = (props: AdvancedTableProps) => {
  const {
    aria = {},
    children,
    className,
    columnDefinitions,
    data = {},
    enableToggleExpansion = "header",
    expandedControl,
    htmlOptions = {},
    id,
    initialLoadingRowsCount = 10,
    inlineRowLoading = false,
    loading,
    onRowToggleClick,
    onToggleExpansionClick,
    sortControl,
    tableData,
    tableOptions,
    tableProps,
    toggleExpansionIcon = "arrows-from-line",
  } = props;

  const [loadingStateRowCount, setLoadingStateRowCount] = useState(
    initialLoadingRowsCount
  );

  // Create a local state for expanded and setExpanded if expandedControl not used
  const [localExpanded, setLocalExpanded] = useState({});

  // Determine whether to use the prop or the local state
  const expanded = expandedControl ? expandedControl.value : localExpanded;
  const setExpanded = expandedControl
    ? expandedControl.onChange
    : setLocalExpanded;

  const columnHelper = createColumnHelper<DataType>();

  //Create cells for first columns
  const createCellFunction = (cellAccessors: string[]) => {
    const columnCells = ({
      row,
      getValue,
    }: {
      row: Row<DataType>;
      getValue: Getter<string>;
    }) => {
      const rowData = row.original;

      switch (row.depth) {
        case 0: {
          return (
            <CustomCell
                getValue={getValue}
                onRowToggleClick={onRowToggleClick}
                row={row}
            />
          );
        }
        default: {
          // Handle other depths based on cellAccessors
          const depthAccessor = cellAccessors[row.depth - 1]; // Adjust index for depth
          const accessorValue = rowData[depthAccessor];
          return accessorValue ? (
            <CustomCell
                onRowToggleClick={onRowToggleClick}
                row={row} 
                value={accessorValue} 
            />
          ) : (
            "N/A"
          );
        }
      }
    };

    return columnCells;
  };

  //Create column array in format needed by Tanstack
  const columns =
    columnDefinitions &&
    columnDefinitions.map((column) => {
      // Define the base column structure
      const columnStructure = {
        ...columnHelper.accessor(column.accessor, {
          header: column.label,
        }),
      };
      if (column.cellAccessors) {
        columnStructure.cell = createCellFunction(column.cellAccessors);
      }
      return columnStructure;
    });

  //Syntax for sorting Array if we want to manage state ourselves
  const sorting = [
    {
      id: columnDefinitions[0].accessor,
      desc:
        sortControl && sortControl.value !== null
          ? !sortControl.value.desc
          : false,
    },
  ];

  const expandAndSortState = () => {
    if (sortControl) {
      return { state: { expanded, sorting } };
    } else {
      return { state: { expanded } };
    }
  };

//initialize table
  const table = useReactTable({
    data: loading ? Array(loadingStateRowCount).fill({}) : tableData,
    columns,
    onExpandedChange: setExpanded,
    getSubRows: (row) => row.children,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableSortingRemoval: false,
    sortDescFirst: true,
    ...expandAndSortState(),
    ...tableOptions,
  });

  const tableRows = table.getRowModel();

  // Set table row count for loading state
  const updateLoadingStateRowCount = useCallback(() => {
    const rowsCount = table.getRowModel().rows.length;
    if (rowsCount !== loadingStateRowCount && rowsCount !== 0) {
      setLoadingStateRowCount(rowsCount);
    }
  }, [tableData, loadingStateRowCount]);

  useEffect(() => {
    if (!loading) {
      updateLoadingStateRowCount();
    }
  }, [loading, updateLoadingStateRowCount]);

  const handleExpandOrCollapse = (row: Row<DataType>) => {
    onToggleExpansionClick && onToggleExpansionClick(row);

    const expandedState = expanded as ExpandedStateObject;
    const targetParent = row?.parentId;
    return setExpanded(
      updateExpandAndCollapseState(tableRows, expandedState, targetParent)
    );
  };

  const ariaProps = buildAriaProps(aria);
  const dataProps = buildDataProps(data);
  const htmlProps = buildHtmlProps(htmlOptions);
  const classes = classnames(
    buildCss("pb_advanced_table"),
    globalProps(props),
    className
  );

  return (
    <div {...ariaProps} 
        {...dataProps} 
        {...htmlProps}
        className={classes} 
        id={id}
    >
      <AdvancedTableContext.Provider
          value={{
            columnDefinitions,
            enableToggleExpansion,
            expanded,
            handleExpandOrCollapse,
            inlineRowLoading,
            loading,
            setExpanded,
            sortControl,
            table,
            toggleExpansionIcon,
          }}
      >
        <Table
            className={`${loading ? "content-loading" : ""}`}
            dataTable
            numberSpacing="tabular"
            responsive="none"
            {...tableProps}
        >
          {children ? (
            children
          ) : (
            <>
              <TableHeader />
              <TableBody />
            </>
          )}
        </Table>
      </AdvancedTableContext.Provider>
    </div>
  );
};

AdvancedTable.Header = TableHeader;
AdvancedTable.Body = TableBody;

export default AdvancedTable;

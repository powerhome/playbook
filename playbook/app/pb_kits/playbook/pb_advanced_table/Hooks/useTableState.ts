import { useState, useCallback, useMemo, useEffect } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getExpandedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  RowSelectionState,
  Row,
  RowPinningState
} from "@tanstack/react-table";
import { GenericObject } from "../../types";
import { createColumnHelper } from "@tanstack/react-table";
import { createCellFunction } from "../Utilities/CellRendererUtils";

interface UseTableStateProps {
  tableData: GenericObject[];
  columnDefinitions: GenericObject[];
  expandedControl?: GenericObject;
  sortControl?: GenericObject;
  firstColumnSort?: boolean;
  onRowToggleClick?: (arg: Row<GenericObject>) => void;
  selectableRows?: boolean;
  initialLoadingRowsCount?: number;
  loading?: boolean | string;
  pagination?: boolean;
  paginationProps?: GenericObject;
  pinnedRows?: {
    value?: RowPinningState;
    onChange?: (value: RowPinningState) => void;
  };
  virtualizedRows?: boolean;
  tableOptions?: GenericObject;
  onRowSelectionChange?: (arg: RowSelectionState) => void;
  columnVisibilityControl?: GenericObject;
  rowStyling?: GenericObject;
}

export function useTableState({
  tableData,
  columnDefinitions,
  expandedControl,
  sortControl,
  firstColumnSort,
  onRowToggleClick,
  selectableRows,
  initialLoadingRowsCount = 10,
  loading,
  pagination = false,
  paginationProps,
  virtualizedRows = false,
  tableOptions,
  columnVisibilityControl,
  pinnedRows,
  rowStyling
}: UseTableStateProps) {

  // Create a local state for expanded and setExpanded if expandedControl not used
  const [localExpanded, setLocalExpanded] = useState({});
  const [loadingStateRowCount, setLoadingStateRowCount] = useState(initialLoadingRowsCount);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [localColumnVisibility, setLocalColumnVisibility] = useState({});
  const [localRowPinning, setLocalRowPinning] = useState<RowPinningState>({
    top: [],
  });
  // Determine whether to use the prop or the local state
  const expanded = expandedControl ? expandedControl.value : localExpanded;
  const setExpanded = expandedControl ? expandedControl.onChange : setLocalExpanded;
  const columnVisibility = (columnVisibilityControl && columnVisibilityControl.value) ? columnVisibilityControl.value : localColumnVisibility;
  const setColumnVisibility = (columnVisibilityControl && columnVisibilityControl.onChange) ? columnVisibilityControl.onChange : setLocalColumnVisibility;
  const rowPinning = pinnedRows?.value ?? localRowPinning
  const onRowPinningChange = pinnedRows?.onChange ?? setLocalRowPinning

  // Virtualized data handling (chunked loading)
  const fetchSize = 20; // Number of rows per "page"
  const [fullData] = useState(tableData); // All data from the JSON file
  const [dataChunk, setDataChunk] = useState(fullData.slice(0, fetchSize)); // Initial chunk
  const [totalFetched, setTotalFetched] = useState(fetchSize); // Track loaded rows
  const [isFetching, setIsFetching] = useState(false);

  // Create column structure
  const columnHelper = createColumnHelper();

  // Build columns with proper cell renderers
  const buildColumns = useCallback((columnDefinitions: GenericObject[], isRoot = true): any[] => {
    return columnDefinitions?.map((column, index) => {
      const isFirstColumn = isRoot && index === 0;
      // Handle grouped columns
      if (column.columns && column.columns.length > 0) {
        return {
          header: column.header ?? column.label ?? "",
          id: column.id ?? column.label ?? `group-${index}`,
          columns: buildColumns(column.columns, false),
        };
      }
      // Define the base column structure
      const columnStructure = {
        ...columnHelper.accessor(column.accessor, {
          header: column.header ?? column.label ?? "",
          enableSorting: (isFirstColumn && firstColumnSort) || column.enableSort === true,
        }),
      };

      if (column.cellAccessors || column.customRenderer) {
        columnStructure.cell = createCellFunction(
          column.cellAccessors || [],
          column.customRenderer,
          isFirstColumn,
          onRowToggleClick,
          selectableRows,
          rowStyling
        );
      }

      return columnStructure;
    }) || [];
  }, [columnHelper, onRowToggleClick, selectableRows]);

  const columns = useMemo(() => buildColumns(columnDefinitions), [buildColumns, columnDefinitions]);

  // Sorting configuration
  const sorting = useMemo(() => ([{
    id: columnDefinitions[0].accessor,
    desc: sortControl && sortControl.value !== null ? !sortControl.value.desc : false,
  }]), [columnDefinitions, sortControl]);

  // Custom state based on features enabled
  const customState = useCallback(() => ({
    state: {
      expanded,
      ...(sortControl     && { sorting }),
      ...(selectableRows  && { rowSelection }),
      ...(columnVisibility && { columnVisibility }),
      ...(pinnedRows && { rowPinning }),
    },
  }), [
    expanded,
    sortControl,
    sorting,
    selectableRows,
    rowSelection,
    columnVisibility,
    rowPinning,
  ]);

  // Pagination configuration
  const paginationInitializer = useMemo(() => {
    if (!pagination) return {};

    return {
      getPaginationRowModel: getPaginationRowModel(),
      paginateExpandedRows: false,
      initialState: {
        pagination: {
          pageIndex: paginationProps?.pageIndex ?? 0,
          pageSize: paginationProps?.pageSize ?? 20,
        },
      },
    };
  }, [pagination, paginationProps]);

  // Initialize the table
  const table = useReactTable({
    data: loading ? Array(loadingStateRowCount).fill({}) : (virtualizedRows ? dataChunk : tableData),
    columns,
    onExpandedChange: setExpanded,
    getSubRows: (row: GenericObject) => row.children,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableSortingRemoval: false,
    sortDescFirst: true,
    onRowSelectionChange: setRowSelection,
    onRowPinningChange,
    getRowId: (selectableRows || pinnedRows || rowStyling) ? row => row.id : undefined,
    onColumnVisibilityChange: setColumnVisibility,
    meta: {
      columnDefinitions
    },
    ...customState(),
    ...paginationInitializer,
    ...tableOptions,
  });

  // Handle row pinning changes
    useEffect(() => {
    const topPins = pinnedRows?.value?.top ?? [];
    if (topPins.length === 0) {
      onRowPinningChange({ top: [] });
      return;
    }
    const rows = table.getRowModel().rows;
    const collectAllDescendantIds = (subs: Row<GenericObject>[]): string[] =>
      subs.flatMap(r => [r.id, ...collectAllDescendantIds(r.subRows)]);
    const allPinned: string[] = [];
    topPins.forEach(id => {
      const parent = rows.find(r => r.id === id && r.depth === 0);
      if (parent) {
        allPinned.push(parent.id, ...collectAllDescendantIds(parent.subRows));
      }
    });
    onRowPinningChange({ top: allPinned });
  }, [table, pinnedRows?.value?.top?.join(',')]);

  // Check if table has any sub-rows
  const hasAnySubRows = table.getRowModel().rows.some(row => row.subRows && row.subRows.length > 0);
  const selectedRowsLength = Object.keys(table.getState().rowSelection).length;

  // Data fetching for virtualized view
  const fetchNextPage = useCallback(() => {
    if (isFetching || totalFetched >= fullData.length) return;

    setIsFetching(true);
    // Simulate API call delay
    setTimeout(() => {
      const nextChunk = fullData.slice(totalFetched, totalFetched + fetchSize);
      setDataChunk(prev => [...prev, ...nextChunk]);
      setTotalFetched(prev => prev + nextChunk.length);
      setIsFetching(false);
    }, 500);
  }, [isFetching, totalFetched, fullData, fetchSize]);

  // Update row count for loading state
  const updateLoadingStateRowCount = useCallback(() => {
    const rowsCount = table.getRowModel().rows.length;
    if (rowsCount !== loadingStateRowCount && rowsCount !== 0) {
      setLoadingStateRowCount(rowsCount);
    }
  }, [loadingStateRowCount, table]);

  return {
    table,
    expanded,
    setExpanded,
    hasAnySubRows,
    selectedRowsLength,
    fetchNextPage,
    updateLoadingStateRowCount,
    rowSelection,
    fullData,
    totalFetched,
    isFetching
  };
}

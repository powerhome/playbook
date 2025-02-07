import React, { useState, useEffect, useCallback, useRef } from "react"
import classnames from "classnames"

import { GenericObject } from "../types"

import {
  createColumnHelper,
  getCoreRowModel,
  getExpandedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  useReactTable,
  Getter,
  RowSelectionState
} from "@tanstack/react-table"
import { useVirtualizer } from '@tanstack/react-virtual'

import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from "../utilities/props"
import { globalProps, GlobalProps } from "../utilities/globalProps"

import Table from "../pb_table/_table"
import Card from "../pb_card/_card"
import Caption from "../pb_caption/_caption"
import Flex from "../pb_flex/_flex"
import FlexItem from "../pb_flex/_flex_item"

import AdvancedTableContext from "./Context/AdvancedTableContext"

import { updateExpandAndCollapseState } from "./Utilities/ExpansionControlHelpers"
import { showActionBar, hideActionBar } from "./Utilities/ActionBarAnimationHelper"

import { CustomCell } from "./Components/CustomCell"
import { TableHeader } from "./SubKits/TableHeader"
import { TableBody } from "./SubKits/TableBody"
import Pagination from "../pb_pagination/_pagination"

type AdvancedTableProps = {
  aria?: { [key: string]: string }
  actions?: React.ReactNode[] | React.ReactNode
  children?: React.ReactNode | React.ReactNode[]
  className?: string
  columnDefinitions: GenericObject[]
  dark?: boolean
  data?: { [key: string]: string }
  enableToggleExpansion?: "all" | "header" | "none"
  expandedControl?: GenericObject
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string
  initialLoadingRowsCount?: number
  inlineRowLoading?: boolean
  loading?: boolean | string
  onRowToggleClick?: (arg: Row<GenericObject>) => void
  onToggleExpansionClick?: (arg: Row<GenericObject>) => void
  pagination?: boolean,
  paginationProps?: GenericObject
  responsive?: "scroll" | "none",
  selectableRows?: boolean,
  showActionsBar?: boolean,
  sortControl?: GenericObject
  tableData: GenericObject[]
  tableOptions?: GenericObject
  tableProps?: GenericObject
  toggleExpansionIcon?: string | string[]
  onRowSelectionChange?: (arg: RowSelectionState) => void
  virtualizedRows?: boolean
} & GlobalProps

const AdvancedTable = (props: AdvancedTableProps) => {
  const {
    aria = {},
    actions,
    children,
    className,
    columnDefinitions,
    dark = false,
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
    pagination = false,
    paginationProps,
    responsive = "scroll",
    showActionsBar = true,
    selectableRows,
    sortControl,
    tableData,
    tableOptions,
    tableProps,
    toggleExpansionIcon = "arrows-from-line",
    onRowSelectionChange,
    virtualizedRows = false,
  } = props

  const [loadingStateRowCount, setLoadingStateRowCount] = useState(
    initialLoadingRowsCount
  )

  // Create a local state for expanded and setExpanded if expandedControl not used
  const [localExpanded, setLocalExpanded] = useState({})

  // Determine whether to use the prop or the local state
  const expanded = expandedControl ? expandedControl.value : localExpanded
  const setExpanded = expandedControl
    ? expandedControl.onChange
    : setLocalExpanded

  const columnHelper = createColumnHelper()

  //Row Selection
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  //Create cells for columns, with customization for first column
  const createCellFunction = (cellAccessors: string[], customRenderer?: (row: Row<GenericObject>, value: any) => JSX.Element, index?: number) => {
    const columnCells = ({
      row,
      getValue,
    }: {
      row: Row<GenericObject>
      getValue: Getter<string>
    }) => {
      const rowData = row.original

    if (index === 0) {
      switch (row.depth) {
        case 0: {
          return (
                <CustomCell
                    customRenderer={customRenderer}
                    getValue={getValue}
                    onRowToggleClick={onRowToggleClick}
                    row={row}
                    selectableRows={selectableRows}
                />
          )
        }
        default: {
          // Handle other depths based on cellAccessors
          const depthAccessor = cellAccessors[row.depth - 1] // Adjust index for depth
          const accessorValue = rowData[depthAccessor]
          return accessorValue ? (
            <CustomCell
                customRenderer={customRenderer}
                onRowToggleClick={onRowToggleClick}
                row={row} 
                selectableRows={selectableRows}
                value={accessorValue} 
            />
          ) : (
            "N/A"
          )
        }
      }
    }
    return customRenderer
    ? customRenderer(row, getValue())
    : getValue()
    }
    return columnCells
  }

  const buildColumns = (columnDefinitions: GenericObject[]): any => {
    return (
      columnDefinitions &&
      columnDefinitions.map((column, index) => {
        //Checking to see if grouped column or not
        if (column.columns && column.columns.length > 0) {
          return {
            header: column.label || "",
            columns: buildColumns(column.columns),
          };
        } else {
          // Define the base column structure
          const columnStructure = {
            ...columnHelper.accessor(column.accessor, {
              header: column.label || "",
            }),
          };

          if (column.cellAccessors || column.customRenderer) {
            columnStructure.cell = createCellFunction(
              column.cellAccessors,
              column.customRenderer,
              index
            );
          }

          return columnStructure;
        }
      })
    );
  };

  //Create column array in format needed by Tanstack
  const columns = buildColumns(columnDefinitions);

  //Syntax for sorting Array if we want to manage state ourselves
  const sorting = [
    {
      id: columnDefinitions[0].accessor,
      desc:
        sortControl && sortControl.value !== null
          ? !sortControl.value.desc
          : false,
    },
  ]

  const customState = () => {
    if (sortControl && selectableRows) {
      return { state: { expanded, sorting, rowSelection } }
    } else if (sortControl) {
      return { state: { expanded, sorting } }
    } else if (selectableRows) {
      return { state: { expanded, rowSelection } }
    } else {
      return { state: { expanded } }
    }
  }

  const paginationInitializer = pagination ? {
    getPaginationRowModel: getPaginationRowModel(),
    paginateExpandedRows: false,
    initialState: {
        pagination: {
            pageIndex: paginationProps?.pageIndex ?? 0,
            pageSize: paginationProps?.pageSize ??  20,
        },
    },
} : {}

  // Simulating chunked data fetch
  const fetchSize = 50; // Number of rows per "page"
  const [fullData] = useState(tableData); // All data from the JSON file
  const [dataChunck, setDataChunck] = useState(fullData.slice(0, fetchSize)); // Initial chunk

//initialize table
  const table = useReactTable({
    data: loading ? Array(loadingStateRowCount).fill({}) : dataChunck,
    columns,
    onExpandedChange: setExpanded,
    getSubRows: (row: GenericObject) => row.children,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableSortingRemoval: false,
    sortDescFirst: true,
    onRowSelectionChange: setRowSelection,
    getRowId: selectableRows ? row => row.id : undefined,
    ...customState(),
    ...paginationInitializer,
    ...tableOptions,
  })

  const tableRows = table.getRowModel()
  const tableWrapperRef = useRef<HTMLDivElement>(null)

  const hasAnySubRows = tableRows.rows.some(row => row.subRows && row.subRows.length > 0);
  const selectedRowsLength = Object.keys(table.getState().rowSelection).length

  // HERE IS THE CODE FOR THE VIRTUALIZED TABLE
  const [totalDBRowCount] = useState(fullData.length); // Total number of rows
  const [totalFetched, setTotalFetched] = useState(fetchSize); // Track loaded rows
  const [isFetching, setIsFetching] = useState(false);

  const tableWrapperStyle = virtualizedRows ?{
    overflow: 'auto', //our scrollable table container
    position: 'relative', //needed for sticky header
    height: '600px', //should be a fixed height
  } : {}

  const virtualizerConfig = useVirtualizer({
    count: tableRows.rows.length,
    getScrollElement: () => tableWrapperRef.current,
    estimateSize: () => 38,
    overscan: 5,
  })

  const virtualizer = virtualizedRows ? virtualizerConfig : null

  const fetchNextPage = () => {
    if (isFetching || totalFetched >= totalDBRowCount) return; // Stop if already fetching or no more data
  
    setIsFetching(true);
    setTimeout(() => { // Simulating an async fetch delay
      const newFetched = fullData.slice(totalFetched, totalFetched + fetchSize);
      setDataChunck(prev => [...prev, ...newFetched]); // Append new data
      setTotalFetched(prev => prev + fetchSize);
      setIsFetching(false);
    }, 500); // Simulated delay
  };

  const fetchMoreOnBottomReached = useCallback((containerRefElement?: HTMLDivElement | null) => {
    if (containerRefElement) {
      const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
      // If user scrolls near bottom, fetch more data
      if (scrollHeight - scrollTop - clientHeight < 500 && !isFetching && totalFetched < totalDBRowCount) {
        fetchNextPage();
      }
    }
  }, [fetchNextPage, isFetching, totalFetched, totalDBRowCount]);

  useEffect(() => {
    fetchMoreOnBottomReached(tableWrapperRef.current);
  }, [fetchMoreOnBottomReached]);

  const tableWrapperOnScroll = virtualizedRows ? (e) => fetchMoreOnBottomReached(e.currentTarget) : undefined
  // END OF VIRTUALIZED TABLE CODE

  useEffect(() => {
    if (onRowSelectionChange) {
      onRowSelectionChange(table.getState().rowSelection)
    }
  } , [table.getState().rowSelection, onRowSelectionChange])

  // Set table row count for loading state
  const updateLoadingStateRowCount = useCallback(() => {
    const rowsCount = table.getRowModel().rows.length
    if (rowsCount !== loadingStateRowCount && rowsCount !== 0) {
      setLoadingStateRowCount(rowsCount)
    }
  }, [dataChunck, loadingStateRowCount])

  useEffect(() => {
    if (!loading) {
      updateLoadingStateRowCount()
    }
  }, [loading, updateLoadingStateRowCount])

  const handleExpandOrCollapse = async (row: Row<GenericObject>) => {
    onToggleExpansionClick && onToggleExpansionClick(row)
  
    const expandedState = expanded;
    const targetParent = row?.parentId;
    const updatedRows = await updateExpandAndCollapseState(tableRows, expandedState, targetParent)
    setExpanded(updatedRows)
  }

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)
  const classes = classnames(
    buildCss("pb_advanced_table"),
    `advanced-table-responsive-${responsive}`,
    globalProps(props),
    className
  )

  const onPageChange = (page: number) => {
    table.setPageIndex(page - 1)
  }
//When to show the actions bar as a whole
  const isActionBarVisible = selectableRows && showActionsBar && selectedRowsLength > 0

  //Ref and useEffect for animating the actions bar
  const cardRef = useRef(null);
  useEffect(() => {
    if (cardRef.current) {
      if (isActionBarVisible) {
        showActionBar(cardRef.current);
      } else {
        hideActionBar(cardRef.current);
      }
    }
  }, [isActionBarVisible]);

  return (
    <div {...ariaProps} 
        {...dataProps} 
        {...htmlProps}
        className={classes} 
        id={id}
        onScroll={tableWrapperOnScroll}
        ref={tableWrapperRef}
        style={tableWrapperStyle}
    >
      <AdvancedTableContext.Provider
          value={{
            columnDefinitions,
            enableToggleExpansion,
            expanded,
            expandedControl,
            handleExpandOrCollapse,
            inlineRowLoading,
            isActionBarVisible,
            loading,
            responsive,
            setExpanded,
            sortControl,
            table,
            toggleExpansionIcon,
            showActionsBar,
            selectableRows,
            hasAnySubRows,
            virtualizer,
          }}
      >
        <>
          {pagination &&
              <Pagination
                  current={table.getState().pagination.pageIndex + 1}
                  key={`pagination-top-${table.getState().pagination.pageIndex + 1}`}
                  marginBottom="xs"
                  onChange={onPageChange}
                  range={paginationProps?.range ? paginationProps?.range : 5}
                  total={table.getPageCount()}
                  />
          }
          <Card
              borderNone={!isActionBarVisible}
              className={`${isActionBarVisible && "show-action-card row-selection-actions-card"}`}
              htmlOptions={{ ref: cardRef as any }}
              padding={`${isActionBarVisible ? "xs" : "none"}`}
          >
            <Flex alignItems="center" 
                justify="between"
            >
              <Caption color="light" 
                  paddingLeft="xs" 
                  size="xs"
              >
                {selectedRowsLength} Selected
              </Caption>
              <FlexItem>{actions}</FlexItem>
            </Flex>
          </Card>
          <Table
              className={`${loading ? "content-loading" : ""}`}
              dark={dark}
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
          {pagination &&
            <Pagination
                current={table.getState().pagination.pageIndex + 1}
                key={`pagination-bottom-${table.getState().pagination.pageIndex + 1}`}
                marginTop="xs"
                onChange={onPageChange}
                range={paginationProps?.range ? paginationProps?.range : 5}
                total={table.getPageCount()}
            />
          }
        </>
      </AdvancedTableContext.Provider>
    </div>
  )
}

AdvancedTable.Header = TableHeader
AdvancedTable.Body = TableBody

export default AdvancedTable

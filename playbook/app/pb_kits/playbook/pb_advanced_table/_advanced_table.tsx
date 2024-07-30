import React, { useState, useEffect, useCallback } from "react"
import classnames from "classnames"

import { GenericObject } from "../types"

import {
  createColumnHelper,
  getCoreRowModel,
  getExpandedRowModel,
  getSortedRowModel,
  Row,
  useReactTable,
  Getter,
} from "@tanstack/react-table"

import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from "../utilities/props"
import { globalProps, GlobalProps } from "../utilities/globalProps"

import Table from "../pb_table/_table"

import AdvancedTableContext from "./Context/AdvancedTableContext"

import { updateExpandAndCollapseState } from "./Utilities/ExpansionControlHelpers"

import { CustomCell } from "./Components/CustomCell"
import { TableHeader } from "./SubKits/TableHeader"
import { TableBody } from "./SubKits/TableBody"

type AdvancedTableProps = {
  aria?: { [key: string]: string }
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
  responsive?: "scroll" | "none",
  sortControl?: GenericObject
  tableData: GenericObject[]
  tableOptions?: GenericObject
  tableProps?: GenericObject
  toggleExpansionIcon?: string | string[]
} & GlobalProps

const AdvancedTable = (props: AdvancedTableProps) => {
  const {
    aria = {},
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
    responsive = "scroll",
    sortControl,
    tableData,
    tableOptions,
    tableProps,
    toggleExpansionIcon = "arrows-from-line",
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

  //Create cells for first columns
  const createCellFunction = (cellAccessors: string[]) => {
    const columnCells = ({
      row,
      getValue,
    }: {
      row: Row<GenericObject>
      getValue: Getter<string>
    }) => {
      const rowData = row.original

      switch (row.depth) {
        case 0: {
          return (
            <CustomCell
                getValue={getValue}
                onRowToggleClick={onRowToggleClick}
                row={row}
            />
          )
        }
        default: {
          // Handle other depths based on cellAccessors
          const depthAccessor = cellAccessors[row.depth - 1] // Adjust index for depth
          const accessorValue = rowData[depthAccessor]
          return accessorValue ? (
            <CustomCell
                onRowToggleClick={onRowToggleClick}
                row={row} 
                value={accessorValue} 
            />
          ) : (
            "N/A"
          )
        }
      }
    }

    return columnCells
  }

  //Create column array in format needed by Tanstack
  const columns =
    columnDefinitions &&
    columnDefinitions.map((column, index) => {
      // Define the base column structure
      const columnStructure = {
        ...columnHelper.accessor(column.accessor, {
          header: column.label,
        }),
        id: column.id || `${index + 1}`,
      }
      if (column.cellAccessors) {
        columnStructure.cell = createCellFunction(column.cellAccessors)
      }
      return columnStructure
    })

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

  const expandAndSortState = () => {
    if (sortControl) {
      return { state: { expanded, sorting } }
    } else {
      return { state: { expanded } }
    }
  }

  // Sticky Column for Responsive from tanstack docs
  // const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
  //   left: [columns[0].id],
  //   // right: [],
  // })
  // console.log(columns, "columns")
  // console.log(columns[0], "first column in array")
  const [columnPinning, setColumnPinning] = useState({ left: [columns[0].id] });
  // console.log(columnPinning, "pinning")
  // const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1200);
  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsSmallScreen(window.innerWidth < 1200);
  //   };

  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  // useEffect(() => {
  //   if (responsive === "scroll") {
  //     setColumnPinning(prev => ({
  //       ...prev,
  //       left: isSmallScreen ? [columns[0].id] : [],
  //     }));
  //   }
  // }, [isSmallScreen, responsive, columns]);

//initialize table
  const table = useReactTable({
    data: loading ? Array(loadingStateRowCount).fill({}) : tableData,
    columns,
    onExpandedChange: setExpanded,
    getSubRows: (row: GenericObject) => row.children,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableSortingRemoval: false,
    sortDescFirst: true,
    ...expandAndSortState(),
    ...tableOptions,
    state: {
      columnPinning,
    },
    onColumnPinningChange: setColumnPinning,
  })

  const tableRows = table.getRowModel()

  // Set table row count for loading state
  const updateLoadingStateRowCount = useCallback(() => {
    const rowsCount = table.getRowModel().rows.length
    if (rowsCount !== loadingStateRowCount && rowsCount !== 0) {
      setLoadingStateRowCount(rowsCount)
    }
  }, [tableData, loadingStateRowCount])

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
    `table-responsive-${responsive}`,
    globalProps(props),
    className
  )

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
            expandedControl,
            handleExpandOrCollapse,
            inlineRowLoading,
            loading,
            responsive,
            setExpanded,
            sortControl,
            table,
            toggleExpansionIcon,
          }}
      >
        <Table
            className={`${loading ? "content-loading" : ""}`}
            dark={dark}
            dataTable
            numberSpacing="tabular"
            // may need conditional here to ensure table default behavior and new adv table don't conflict
            responsive={responsive}
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
  )
}

AdvancedTable.Header = TableHeader
AdvancedTable.Body = TableBody

export default AdvancedTable

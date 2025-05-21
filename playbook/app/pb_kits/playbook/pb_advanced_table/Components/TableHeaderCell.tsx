import React, { useContext, useState } from "react"
import classnames from "classnames"
import { flexRender, Header, Table, RowModel } from "@tanstack/react-table"

import { GenericObject } from "../../types"

import { GlobalProps } from "../../utilities/globalProps"

import Flex from "../../pb_flex/_flex"
import Checkbox from "../../pb_checkbox/_checkbox"
import SectionSeparator from "../../pb_section_separator/_section_separator"
import PbReactPopover from "../../pb_popover/_popover";
import Icon from "../../pb_icon/_icon"

import { SortIconButton } from "./SortIconButton"
import { ToggleIconButton } from "./ToggleIconButton"
import { displayIcon } from "../Utilities/IconHelpers"
import { updateExpandAndCollapseState } from "../Utilities/ExpansionControlHelpers"

import { isChrome } from "../Utilities/BrowserCheck"

import AdvancedTableContext from "../Context/AdvancedTableContext"

type TableHeaderCellProps = {
  enableSorting?: boolean
  enableToggleExpansion?: "all" | "header" | "none"
  handleExpandOrCollapse?: () => void
  header?: Header<GenericObject, unknown>
  headerChildren?: React.ReactNode | React.ReactNode[]
  isPinnedLeft?: boolean
  loading?: boolean
  sortIcon?: string | string[]
  table?: Table<GenericObject>
} & GlobalProps

export const TableHeaderCell = ({
  enableSorting,
  enableToggleExpansion,
  handleExpandOrCollapse,
  header,
  headerChildren,
  isPinnedLeft = false,
  loading,
  sortIcon,
  table
}: TableHeaderCellProps) => {
  const {
    expanded,
    setExpanded,
    expandByDepth,
    onExpandByDepthClick,
    toggleExpansionIcon,
    sortControl,
    responsive,
    selectableRows,
    hasAnySubRows,
    showActionsBar,
    stickyLeftColumn,
    inlineRowLoading,
    isActionBarVisible,
  } = useContext(AdvancedTableContext);

  type justifyTypes = "none" | "center" | "start" | "end" | "between" | "around" | "evenly"
  
  const toggleSortButton = (event: React.SyntheticEvent) => {
    if (sortControl) {
      const sortIsDesc = header?.column.getIsSorted() === "desc"
      sortIsDesc
        ? sortControl.onChange({ desc: true })
        : sortControl.onChange({ desc: false })
    } else {
      header?.column.getToggleSortingHandler()(event)
    }
  }

  const isLeafColumn =
  header?.column.getLeafColumns().length === 1 &&
  header?.column.getLeafColumns()[0].id === header.column.id

  const columnHasVisibleLeaf = (col: any): boolean =>
    col.getIsVisible?.() ||
    (Array.isArray(col.columns) &&
      col.columns.some((child: any) => columnHasVisibleLeaf(child)));
      
   // Check on column position in stack + visibility to add the vertical border 
  const isLastHeaderCell = (() => {
    if (!header) return false;
  
    if (header.colSpan > 1 && header.column.parent !== undefined) return true;
  
    const parent = header.column.parent;
  
    if (!parent) {
      const topHeaders = table?.getHeaderGroups()[0].headers.filter((h: any) => columnHasVisibleLeaf(h.column));
      return topHeaders?.at(-1)?.id === header.id;
    }
    const visibleSiblings = parent.columns.filter(columnHasVisibleLeaf);
    return visibleSiblings.at(-1) === header.column;
  })();
 
const cellClassName = classnames(
  "table-header-cells",
  `${showActionsBar && isActionBarVisible && "header-cells-with-actions"}`,
  `${isChrome() ? "chrome-styles" : ""}`,
  `${enableSorting ? "table-header-cells-active" : ""}`,
  { "pinned-left": responsive === "scroll" && isPinnedLeft },
   isLastHeaderCell ? "last-header-cell" : "",
  stickyLeftColumn && stickyLeftColumn.length > 0 && isPinnedLeft ? 'sticky-left' : "",

); 

const cellId = `${loading ? 
    `loading-${header?.id}`
    : `${header?.id}`
}`

const isToggleExpansionEnabledLoading =
  header?.index === 0 &&
  loading &&
  (enableToggleExpansion === "all" || "header") &&
  enableToggleExpansion !== "none"
  
const isToggleExpansionEnabled =
  header?.index === 0 &&
  !loading &&
  (enableToggleExpansion === "all" || "header") &&
  enableToggleExpansion !== "none"

  let justifyHeader:justifyTypes;

  if (header?.index === 0 && hasAnySubRows || (header?.index === 0 && inlineRowLoading)) {
    justifyHeader = enableSorting ? "between" : "start";
  } else {
    justifyHeader = isLeafColumn ? "end" : "center";
  }
  
  const [showPopover, setShowPopover] = useState(false)

  const togglePopover = () => setShowPopover((prev) => !prev)
  const handleShouldClose = (shouldClose: boolean) =>
    setShowPopover(!shouldClose)

  const popoverReference = (
      <div className="gray-icon toggle-all-icon" 
          onClick={togglePopover}
      >
          <Icon icon={displayIcon(toggleExpansionIcon)[0]} />
      </div>
  )

  const handleExpandDepth = (depth: number) => {
    if (onExpandByDepthClick) {
      const flatRows = table?.getRowModel().flatRows
      onExpandByDepthClick(depth, flatRows)
    }
    const updated = updateExpandAndCollapseState(
      table.getRowModel(),
      expanded,
      undefined,
      depth
    )
    setExpanded(updated)
  }
  

  return (
    <th
        align="right"
        className={cellClassName}
        colSpan={header?.colSpan}
        id={cellId}
        key={`${header?.id}-header`}
        style={{
          left: isPinnedLeft
            ? header?.index === 1 //Accounting for set min-width for first column
              ? '180px'
              : `${header?.column.getStart("left")}px`
            : undefined,
        }}
    >
      {header?.isPlaceholder ? null : headerChildren && header?.index === 0 ? (
        <Flex alignItems="center">
          {headerChildren}
          <div>
            {flexRender(header.column.columnDef.header, header.getContext())}
          </div>
        </Flex>
      ) : (
        <Flex
            alignItems="center"
            justify={justifyHeader}
        >
          {
            selectableRows && header?.index === 0 && hasAnySubRows && (
              <Checkbox
                  checked={table?.getIsAllRowsSelected()}
                  indeterminate={table?.getIsSomeRowsSelected()}
                  onChange={table?.getToggleAllRowsSelectedHandler()}
              />
            )
          }
          {isToggleExpansionEnabled && hasAnySubRows && !expandByDepth && (
              <ToggleIconButton onClick={handleExpandOrCollapse} />
            )}
          {isToggleExpansionEnabled && hasAnySubRows && expandByDepth && (

                    <PbReactPopover
                        closeOnClick="any"
                        placement="bottom-start"
                        reference={popoverReference}
                        shouldClosePopover={handleShouldClose}
                        show={showPopover}
                        zIndex={3}
                    > 
                    {expandByDepth.map((option:{ [key: string]: any }, index: number) => (
                      <>
                      <Flex
                          alignItems="center"
                          cursor="pointer"
                          hover={{background: "bg_light"}}
                          htmlOptions={{onClick: () => {handleExpandDepth(option.depth)} }}
                          paddingX="sm"
                          paddingY="xs"
                          >
                            {option.label}
                      </Flex>
                      {index !== expandByDepth.length - 1 && <SectionSeparator/>}
                      </>
                        ))}
                    </PbReactPopover>
                 

            )}

          {isToggleExpansionEnabledLoading &&(
              <div className="loading-toggle-icon header-toggle-icon" />
            )}

          <Flex
              className={`${header?.index === 0 &&
                enableSorting &&
                "header-sort-button pb_th_link"}`}
              cursor={header?.index === 0 && enableSorting ? "pointer" : "default"}
              {...(header?.index === 0 &&
                enableSorting && {
                  htmlOptions: {
                    onClick: (event: React.MouseEvent) => toggleSortButton(event),
                    onKeyDown: (event: React.KeyboardEvent) => {
                      if (event.key === "Enter") {
                        toggleSortButton(event)
                      }
                    },
                    tabIndex: 0,
                  },
                })}
              justify={header?.index === 0 && enableSorting ? "between" : "none"}
              paddingLeft={enableSorting ? "xxs" : "xs"}
          >
            <div>
              {flexRender(header?.column.columnDef.header, header?.getContext())}
            </div>

            {header?.index === 0 &&
              header.column.getCanSort() &&
              enableSorting &&
              (loading ? (
                <div className="loading-toggle-icon" />
              ) : (
                <SortIconButton header={header} 
                    sortIcon={sortIcon} 
                />
              ))}
          </Flex>
        </Flex>
      )}
    </th>
  )
}

import React, { useContext } from "react"
import { Row, Table } from "@tanstack/react-table"

import { GenericObject } from "../../types"

import { GlobalProps } from "../../utilities/globalProps"

import Flex from "../../pb_flex/_flex"
import Caption from "../../pb_caption/_caption"
import Icon from "../../pb_icon/_icon"

import { ToggleIconButton } from "./ToggleIconButton"
import { renderCollapsibleTrail } from "./CollapsibleTrail"

import { isChrome } from "../Utilities/BrowserCheck"

import AdvancedTableContext from "../Context/AdvancedTableContext"

interface SubRowHeaderRowProps {
  collapsibleTrail?: boolean
  enableToggleExpansion?: "all" | "header" | "none"
  onClick: (row: Row<GenericObject>) => void
  row: Row<GenericObject>
  subRowHeaders?: string[]
  table: Table<GenericObject>
}

export const SubRowHeaderRow = ({
  collapsibleTrail,
  enableToggleExpansion,
  onClick,
  row,
  subRowHeaders,
  table,
}: SubRowHeaderRowProps & GlobalProps) => {
  const { inlineRowLoading, customSort, onCustomSortClick } = useContext(AdvancedTableContext)

  const numberOfColumns = table.getAllFlatColumns().length
  const rowHasChildren = row.original.children ? true : false
  const canExpand = inlineRowLoading ? rowHasChildren : row.getCanExpand()
  const hasSubrowsToSort = row.getParentRow()?.subRows


  return (
    <tr className="custom-row bg-silver">
      <td
          className={`custom-row-first-column ${
            isChrome() ? "chrome-styles" : ""
          }`}
          colSpan={1}
      >
        {collapsibleTrail && row.depth > 0 && renderCollapsibleTrail(row.depth)}
        <div style={{ paddingLeft: `${row.depth * 1.25}em` }}>
          <Flex align="center" 
              columnGap="xs"
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              justifyContent={customSort && hasSubrowsToSort && hasSubrowsToSort.length > 1 ? "between" : undefined}
          >
            <Flex columnGap="xs">
              {enableToggleExpansion === "all" && canExpand ? (
                <ToggleIconButton onClick={onClick} 
                    row={row} 
                />
              ) : null}
              <Caption
                  marginLeft={canExpand ? "none" : "xs"}
                  text={subRowHeaders[row.depth - 1]}
              />
            </Flex>
            {customSort && hasSubrowsToSort && hasSubrowsToSort.length > 1 && (
              <button
                  aria-label="Sort this group"
                  className="sort-button-icon gray-icon"
                  onClick={() => { onCustomSortClick && onCustomSortClick(row.getParentRow()?.subRows)}}
              >
                <Icon 
                    cursor="pointer" 
                    fixedWidth 
                    icon="sort" 
                />
              </button>
            )}
          </Flex>
        </div>
      </td>

      <td colSpan={numberOfColumns - 1} />
    </tr>
  );
}

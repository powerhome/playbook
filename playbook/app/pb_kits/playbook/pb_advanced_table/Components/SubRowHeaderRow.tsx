import React from "react"
import Flex from "../../pb_flex/_flex"
import Caption from "../../pb_caption/_caption"
import { Row, Table } from "@tanstack/react-table"

import { ToggleIconButton } from "./ToggleIconButton"
import { renderCollapsibleTrail } from "./CollapsibleTrail"

import { isChrome } from "../Utilities/helper_functions"
import { DataType } from "../Utilities/types"

interface SubRowHeaderRowProps {
  onClick: (row: Row<DataType>) => void
  row: Row<DataType>
  table: Table<DataType>
  collapsibleTrail?: boolean
  subRowHeaders?: string[]
  enableToggleExpansion?: "all" | "header"
}

export const SubRowHeaderRow = ({
  row,
  table,
  onClick,
  collapsibleTrail,
  subRowHeaders,
  enableToggleExpansion,
}: SubRowHeaderRowProps) => {
  const numberOfColumns = table.getAllFlatColumns().length

  return (
    <tr className="custom-row bg-silver">
      <td
          className={`custom-row-first-column ${
          isChrome() ? "chrome-styles" : ""
          }`}
          colSpan={1}
      >
        {collapsibleTrail && row.depth > 0 && renderCollapsibleTrail(row.depth)}
        <div style={{ paddingLeft: `${row.depth * 2}rem` }}>
          <Flex align="center" 
              columnGap="xs"
          >
            {enableToggleExpansion === "all" && row.getCanExpand() ? (
              <ToggleIconButton onClick={onClick} 
                  row={row}
              />
            ) : null}
            <Caption
                marginLeft={row.getCanExpand() ? "" : "xs"}
                text={subRowHeaders[row.depth - 1]}
            />
          </Flex>
        </div>
      </td>

      <td colSpan={numberOfColumns - 1} />
    </tr>
  )
}

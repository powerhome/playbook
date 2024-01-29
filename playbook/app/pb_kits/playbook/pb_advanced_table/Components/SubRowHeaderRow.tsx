import React from "react"
import Flex from "../../pb_flex/_flex"
import Caption from "../../pb_caption/_caption"
import { Row, Table } from "@tanstack/react-table"

import { ToggleIconButton } from "./ToggleIconButton"
import { renderCollapsibleTrail } from "./CollapsibleTrail"

import { isChrome } from "../Utilities/BrowserCheck"
import { DataType } from "../Utilities/types"
import { GlobalProps } from "../../utilities/globalProps"

interface SubRowHeaderRowProps {
  collapsibleTrail?: boolean
  enableToggleExpansion?: "all" | "header"
  onClick: (row: Row<DataType>) => void
  row: Row<DataType>
  subRowHeaders?: string[]
  table: Table<DataType>
}

export const SubRowHeaderRow = ({
  collapsibleTrail,
  enableToggleExpansion,
  onClick,
  row,
  subRowHeaders,
  table,
}: SubRowHeaderRowProps & GlobalProps) => {
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
                marginLeft={row.getCanExpand() ? "none" : "xs"}
                text={subRowHeaders[row.depth - 1]}
            />
          </Flex>
        </div>
      </td>

      <td colSpan={numberOfColumns - 1} />
    </tr>
  )
}

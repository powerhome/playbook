import React, { useContext } from "react"
import Flex from "../../pb_flex/_flex"
import Caption from "../../pb_caption/_caption"
import { Row, Table } from "@tanstack/react-table"

import AdvancedTableContext from "../Context/AdvancedTableContext";
import { ToggleIconButton } from "./ToggleIconButton"
import { renderCollapsibleTrail } from "./CollapsibleTrail"

import { isChrome } from "../Utilities/BrowserCheck"
import { DataType } from "../Utilities/types"
import { GlobalProps } from "../../utilities/globalProps"

interface SubRowHeaderRowProps {
  collapsibleTrail?: boolean
  enableToggleExpansion?: "all" | "header" | "none"
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
  const { inlineRowLoading } = useContext(AdvancedTableContext);

  const numberOfColumns = table.getAllFlatColumns().length
  const rowHasChildren = row.original.children ? true : false
  const canExpand = inlineRowLoading ? rowHasChildren : row.getCanExpand()

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
          >
            {enableToggleExpansion === "all" && canExpand ? (
              <ToggleIconButton onClick={onClick} 
                  row={row}
              />
            ) : null}
            <Caption
                dark={dark}
                marginLeft={canExpand ? "none" : "xs"}
                text={subRowHeaders[row.depth - 1]}
            />
          </Flex>
        </div>
      </td>

      <td colSpan={numberOfColumns - 1} />
    </tr>
  )
}

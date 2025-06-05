import React, { useContext } from "react"
import classnames from "classnames"

import { GenericObject } from "../../types"

import { buildCss } from "../../utilities/props"
import { globalProps } from "../../utilities/globalProps"

import AdvancedTableContext from "../Context/AdvancedTableContext"
import { RegularTableView } from "../Components/RegularTableView"
import { VirtualizedTableView } from "../Components/VirtualizedTableView"

type TableBodyProps = {
  className?: string
  collapsibleTrail?: boolean
  dark?: boolean
  id?: string
  subRowHeaders?: string[]
  isFetching: boolean
  totalRowCount: number
}

export const TableBody = ({
  className,
  collapsibleTrail = true,
  dark = false,
  id,
  subRowHeaders,
  isFetching,
  totalRowCount,
  ...props
}: TableBodyProps) => {

  const {
    responsive,
    isPinnedLeft = false,
    virtualizer,
    virtualizedRows,
    enableVirtualization
  } = useContext(AdvancedTableContext)

  const isVirtualized = virtualizedRows || enableVirtualization;

  const classes = classnames(
    buildCss("pb_advanced_table_body"),
    { 'pinned-left': responsive === "scroll" && isPinnedLeft },
    globalProps(props),
    className
  )

  // Style for virtualized table container
  const style: React.CSSProperties = virtualizer ? {
    height: `${virtualizer.getTotalSize()}px`, // tells scrollbar how big the table is
    position: 'relative', // needed for absolute positioning of rows
    width: '100%',
  } : {};

  return (
    <>
      <tbody
          className={classes}
          data-virtualized={isVirtualized ? 'true' : 'false'}
          id={id}
          style={style}
      >
        {isVirtualized && virtualizer ? (
          // Virtualized table view
          <VirtualizedTableView
              collapsibleTrail={collapsibleTrail}
              isFetching={isFetching}
              subRowHeaders={subRowHeaders}
              totalRowCount={totalRowCount}
          />
        ) : (
          // Regular non-virtualized table view
          <RegularTableView
              collapsibleTrail={collapsibleTrail}
              subRowHeaders={subRowHeaders}
          />
        )}

        {/* Fallback for when virtualization should be enabled but virtualizer isn't available */}
        {isVirtualized && !virtualizer && (
          <tr>
            <td
                colSpan={999}
                style={{ padding: '10px', textAlign: 'center' }}
            >
              <div>No data to display.</div>
            </td>
          </tr>
        )}
      </tbody>
    </>
  );
}

export default TableBody;

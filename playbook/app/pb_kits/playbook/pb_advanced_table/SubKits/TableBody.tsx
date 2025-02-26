import React, { useContext } from "react"
import classnames from "classnames"
import { flexRender, Row, Cell } from "@tanstack/react-table"
import { VirtualItem } from "@tanstack/react-virtual"

import { GenericObject } from "../../types"

import { buildCss } from "../../utilities/props"
import { globalProps } from "../../utilities/globalProps"
import { isChrome } from "../Utilities/BrowserCheck"

import LoadingInline from "../../pb_loading_inline/_loading_inline"
import Checkbox from "../../pb_checkbox/_checkbox"

import { SubRowHeaderRow } from "../Components/SubRowHeaderRow"
import { LoadingCell } from "../Components/LoadingCell"
import { renderCollapsibleTrail } from "../Components/CollapsibleTrail"

import AdvancedTableContext from "../Context/AdvancedTableContext"

type TableBodyProps = {
  className?: string
  collapsibleTrail?: boolean
  dark?: boolean
  id?: string
  subRowHeaders?: string[]
}

export const TableBody = ({
  className,
  collapsibleTrail = true,
  dark = false,
  id,
  subRowHeaders,
  ...props
}: TableBodyProps) => {

  const {
    columnDefinitions,
    enableToggleExpansion,
    handleExpandOrCollapse,
    isPinnedLeft = false,
    inlineRowLoading,
    loading,
    responsive,
    table,
    selectableRows,
    hasAnySubRows,
    virtualizer,
    flattenedItems,
  } = useContext(AdvancedTableContext)

  const classes = classnames(
    buildCss("pb_advanced_table_body"),
    { 'pinned-left': responsive === "scroll" && isPinnedLeft },
    globalProps(props),
    className
  )

  const columnPinning = table.getState().columnPinning || { left: [] };

  const style: React.CSSProperties = virtualizer ? {
    height: `${virtualizer.getTotalSize()}px`, // tells scrollbar how big the table is
    position: 'relative', // needed for absolute positioning of rows
    width: '100%',
  } : {};

  // Additional css for virtualized table
  const virtualizedCSS = `
    .virtualized-table-row {
      display: table !important;
      table-layout: fixed !important;
      width: 100% !important;
    }

    .virtualized-table-row td {
      display: table-cell !important;
    }

    /* Ensure the first column has proper width */
    .virtualized-table-row td:first-child {
      width: auto !important;
    }
  `;

  return (
    <>
      {virtualizer && <style>{virtualizedCSS}</style>}
      <tbody
          className={classes}
          id={id}
          style={style}
      >
        {!virtualizer ? (
          // Regular non-virtualized table view
          table.getRowModel().rows.map((row: Row<GenericObject>) => {
            const isExpandable = row.getIsExpanded();
            const isFirstChildofSubrow = row.depth > 0 && row.index === 0;
            const rowHasNoChildren = row.original?.children && !row.original.children.length ? true : false;
            const numberOfColumns = table.getAllFlatColumns().length;
            const isDataLoading = isExpandable && (inlineRowLoading && rowHasNoChildren) && (row.depth < columnDefinitions[0].cellAccessors?.length);
            const rowBackground = isExpandable && ((!inlineRowLoading && row.getCanExpand()) || (inlineRowLoading && rowHasNoChildren));
            const rowColor = row.getIsSelected() ? "bg-row-selection" : rowBackground ? "bg-silver" : "bg-white";

            return (
              <React.Fragment key={`${row.index}-${row.id}-${row.depth}-row`}>
                {isFirstChildofSubrow && subRowHeaders && (
                  <SubRowHeaderRow
                      collapsibleTrail={collapsibleTrail}
                      enableToggleExpansion={enableToggleExpansion}
                      onClick={handleExpandOrCollapse}
                      row={row}
                      subRowHeaders={subRowHeaders}
                      table={table}
                  />
                )}

                <tr
                    className={`${rowColor} ${row.depth > 0 ? `depth-sub-row-${row.depth}` : ""}`}
                    id={`${row.index}-${row.id}-${row.depth}-row`}
                >
                  {/* Render custom checkbox column when we want selectableRows for non-expanding tables */}
                  {selectableRows && !hasAnySubRows && (
                    <td className="checkbox-cell">
                      <Checkbox
                          checked={row.getIsSelected()}
                          disabled={!row.getCanSelect()}
                          indeterminate={row.getIsSomeSelected()}
                          name={row.id}
                          onChange={row.getToggleSelectedHandler()}
                      />
                    </td>
                  )}

                  {row.getVisibleCells().map((cell: Cell<GenericObject, unknown>, i: number) => {
                    const isPinnedLeft = columnPinning.left.includes(cell.column.id);
                    const isLastCell = cell.column.parent?.columns?.at(-1)?.id === cell.column.id;

                    return (
                      <td
                          align="right"
                          className={classnames(
                            `${cell.id}-cell position_relative`,
                            isChrome() ? "chrome-styles" : "",
                            isPinnedLeft && 'pinned-left',
                            isLastCell && 'last-cell',
                          )}
                          key={`${cell.id}-data`}
                      >
                        {collapsibleTrail && i === 0 && row.depth > 0 && renderCollapsibleTrail(row.depth)}
                        <span id={`${cell.id}-span`}>
                          {loading ? (
                            <LoadingCell />
                          ) : (
                            flexRender(cell.column.columnDef.cell, cell.getContext())
                          )}
                        </span>
                      </td>
                    );
                  })}
                </tr>

                {/* Display LoadingInline if Row Data is querying and there are no children already */}
                {isDataLoading && (
                  <tr key={`${row.id}-row`}>
                    <td colSpan={numberOfColumns}
                        style={{ paddingLeft: `${row.depth === 0 ? 0.5 : (row.depth * 2)}em` }}
                    >
                      <LoadingInline />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })
        ) : (
          // Virtualized table implementation
          <>
            {virtualizer && flattenedItems && virtualizer.getVirtualItems().map((virtualRow: VirtualItem) => {
              const item = flattenedItems[virtualRow.index];
              if (!item) return null;

              // Common positioning style for virtual items
              const virtualItemStyle: React.CSSProperties = {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${virtualRow.start}px)`,
              };

              if (item.type === 'header') {
                return (
                  <tr
                      className="virtualized-table-row"
                      key={`header-${item.id}`}
                      style={virtualItemStyle}
                  >
                    <td colSpan={table.getAllFlatColumns().length}>
                      <SubRowHeaderRow
                          collapsibleTrail={collapsibleTrail}
                          enableToggleExpansion={enableToggleExpansion}
                          onClick={handleExpandOrCollapse}
                          row={item.row}
                          subRowHeaders={subRowHeaders}
                          table={table}
                      />
                    </td>
                  </tr>
                );
              }

              if (item.type === 'row') {
                const row = item.row;
                const isExpandable = row.getIsExpanded();
                const rowHasNoChildren = row.original?.children && !row.original.children.length ? true : false;
                const rowBackground = isExpandable && ((!inlineRowLoading && row.getCanExpand()) || (inlineRowLoading && rowHasNoChildren));
                const rowColor = row.getIsSelected() ? "bg-row-selection" : rowBackground ? "bg-silver" : "bg-white";

                return (
                  <tr
                      className={`virtualized-table-row ${rowColor} ${row.depth > 0 ? `depth-sub-row-${row.depth}` : ""}`}
                      data-index={virtualRow.index}
                      key={`row-${item.id}`}
                      ref={(node) => node && virtualizer.measureElement(node)}
                      style={{
                        ...virtualItemStyle,
                        tableLayout: 'fixed',
                        width: '100%',
                      }}
                  >
                    {/* Render custom checkbox column when we want selectableRows for non-expanding tables */}
                    {selectableRows && !hasAnySubRows && (
                      <td className="checkbox-cell">
                        <Checkbox
                            checked={row.getIsSelected()}
                            disabled={!row.getCanSelect()}
                            indeterminate={row.getIsSomeSelected()}
                            name={row.id}
                            onChange={row.getToggleSelectedHandler()}
                        />
                      </td>
                    )}

                    {row.getVisibleCells().map((cell: Cell<GenericObject, unknown>, i: number) => {
                      const isPinnedLeft = columnPinning.left.includes(cell.column.id);
                      const isLastCell = cell.column.parent?.columns?.at(-1)?.id === cell.column.id;

                      return (
                        <td
                            align="right"
                            className={classnames(
                              `${cell.id}-cell position_relative`,
                              isChrome() ? "chrome-styles" : "",
                              isPinnedLeft && 'pinned-left',
                              isLastCell && 'last-cell',
                            )}
                            key={`${cell.id}-data`}
                        >
                          {collapsibleTrail && i === 0 && row.depth > 0 && renderCollapsibleTrail(row.depth)}
                          <span id={`${cell.id}-span`}>
                            {loading ? (
                              <LoadingCell />
                            ) : (
                              flexRender(cell.column.columnDef.cell, cell.getContext())
                            )}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                );
              }

              if (item.type === 'loading') {
                // Render loading indicator
                const row = item.row;
                const numberOfColumns = table.getAllFlatColumns().length;

                return (
                  <tr
                      className="virtualized-table-row"
                      key={`loading-${item.id}`}
                      style={{
                        ...virtualItemStyle,
                        width: '100%',
                      }}
                  >
                    <td
                        colSpan={numberOfColumns}
                        style={{ paddingLeft: `${row.depth === 0 ? 0.5 : (row.depth * 2)}em` }}
                    >
                      <LoadingInline />
                    </td>
                  </tr>
                );
              }

              return null;
            })}
          </>
        )}
      </tbody>
    </>
  );
}

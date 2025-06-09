import React from "react";
import { Row, Getter } from "@tanstack/react-table";
import { GenericObject } from "../../types";
import { CustomCell } from "../Components/CustomCell";

/**
 * Creates a cell render function for table columns
 *
 * @param cellAccessors Array of accessors to use based on row depth
 * @param customRenderer Optional custom renderer function
 * @param isFirstColumn Whether this is the first column (special handling)
 * @param onRowToggleClick Optional callback for row toggle
 * @param selectableRows Whether rows are selectable
 */
export const createCellFunction = (
  cellAccessors: string[],
  customRenderer?: (row: Row<GenericObject>, value: any) => JSX.Element,
  isFirstColumn?: boolean,
  onRowToggleClick?: (row: Row<GenericObject>) => void,
  selectableRows?: boolean,
  rowStyling?: GenericObject
) => {
  // Add display name to the returned function
  const cellRenderer = ({
    row,
    getValue,
  }: {
    row: Row<GenericObject>
    getValue: Getter<string>
  }) => {
    const rowData = row.original;
    const customStyle = rowStyling?.length > 0 && rowStyling?.find((s:GenericObject) => s?.rowId === row.id);

    if (isFirstColumn) {
      switch (row.depth) {
        case 0: {
          return (
            <CustomCell
                customRenderer={customRenderer}
                customStyle={customStyle}
                getValue={getValue}
                onRowToggleClick={onRowToggleClick}
                row={row}
                selectableRows={selectableRows}
            />
          );
        }
        default: {
          // Handle other depths based on cellAccessors
          const depthAccessor = cellAccessors[row.depth - 1]; // Adjust index for depth
          const accessorValue = rowData[depthAccessor];
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
          );
        }
      }
    }

    return customRenderer
      ? customRenderer(row, getValue())
      : getValue();
  };

  // Add a display name to the function to fix the react/display-name warning
  cellRenderer.displayName = 'CellRenderer';

  return cellRenderer;
};

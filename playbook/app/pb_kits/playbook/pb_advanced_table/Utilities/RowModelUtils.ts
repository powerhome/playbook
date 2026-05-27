// Returns a row model getter that sorts only depth-0 (parent) rows so children and grandchild rows keep their original order under each parent.

import type { Table, Row, RowModel, RowData } from "@tanstack/react-table";

export function getParentOnlySortedRowModel<TData extends RowData>(): (
  table: Table<TData>
) => () => RowModel<TData> {
  return (table) => () => {
    const sortingState = table.getState().sorting;
    const rowModel = table.getPreSortedRowModel();

    if (!rowModel.rows.length || !sortingState?.length) {
      return rowModel;
    }

    const sortedFlatRows: Row<TData>[] = [];
    const availableSorting = sortingState.filter((sort) =>
      table.getColumn(sort.id)?.getCanSort()
    );

    const columnInfoById: Record<
      string,
      {
        sortUndefined?: false | -1 | 1 | "first" | "last";
        invertSorting?: boolean;
        sortingFn: (rowA: Row<TData>, rowB: Row<TData>, columnId: string) => number;
      }
    > = {};

    availableSorting.forEach((sortEntry) => {
      const column = table.getColumn(sortEntry.id);
      if (!column) return;
      columnInfoById[sortEntry.id] = {
        sortUndefined: column.columnDef.sortUndefined,
        invertSorting: column.columnDef.invertSorting,
        sortingFn: column.getSortingFn(),
      };
    });

    const parentRows = rowModel.rows.map((row) => ({ ...row }));
    parentRows.sort((rowA, rowB) => {
      for (let i = 0; i < availableSorting.length; i += 1) {
        const sortEntry = availableSorting[i]!;
        const columnInfo = columnInfoById[sortEntry.id]!;
        const sortUndefined = columnInfo.sortUndefined;
        const isDesc = sortEntry?.desc ?? false;
        let sortInt = 0;

        if (sortUndefined) {
          const aValue = rowA.getValue(sortEntry.id);
          const bValue = rowB.getValue(sortEntry.id);
          const aUndefined = aValue === undefined;
          const bUndefined = bValue === undefined;
          if (aUndefined || bUndefined) {
            if (sortUndefined === "first") return aUndefined ? -1 : 1;
            if (sortUndefined === "last") return aUndefined ? 1 : -1;
            sortInt =
              aUndefined && bUndefined
                ? 0
                : aUndefined
                  ? sortUndefined
                  : -sortUndefined;
          }
        }

        if (sortInt === 0) {
          sortInt = columnInfo.sortingFn(rowA, rowB, sortEntry.id);
        }

        if (sortInt !== 0) {
          if (isDesc) sortInt *= -1;
          if (columnInfo.invertSorting) sortInt *= -1;
          return sortInt;
        }
      }
      return rowA.index - rowB.index;
    });

    function flattenRowsInOrder(rows: Row<TData>[]): void {
      rows.forEach((row) => {
        sortedFlatRows.push(row);
        if (row.subRows?.length) {
          flattenRowsInOrder(row.subRows);
        }
      });
    }
    flattenRowsInOrder(parentRows);

    const rowsById: Record<string, Row<TData>> = {};
    sortedFlatRows.forEach((row) => {
      rowsById[row.id] = row;
    });

    return {
      rows: parentRows,
      flatRows: sortedFlatRows,
      rowsById,
    };
  };
}

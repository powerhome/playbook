import React, { useContext } from "react"
import { HeaderGroup } from "@tanstack/react-table"
import AdvancedTableContext from "../Context/AdvancedTableContext"
import { TableHeaderCell } from "../Components/TableHeaderCell"
import { DataType } from "../Utilities/types"

type TableHeaderProps = {
  children?: React.ReactNode | React.ReactNode[]
  enableSorting?: boolean
  headerId?: string
  sortIcon?: string | string[]
}

export const TableHeader = ({
  children,
  enableSorting = false,
  headerId,
  sortIcon = ["arrow-up-short-wide", "arrow-down-short-wide"],
}: TableHeaderProps) => {
  const {
    enableToggleExpansion,
    handleExpandOrCollapse,
    loading,
    table,
  } = useContext(AdvancedTableContext)

  return (
    <>
      <thead>
        {/* Get the header groups (only one in this example) */}
        {table.getHeaderGroups().map((headerGroup: HeaderGroup<DataType>) => (
          <tr key={`${headerGroup.id}-headerGroup`}>
            {headerGroup.headers.map(header => (
              <TableHeaderCell
                  enableSorting={enableSorting}
                  enableToggleExpansion={enableToggleExpansion}
                  handleExpandOrCollapse={handleExpandOrCollapse}
                  header={header}
                  headerChildren={children}
                  headerId={headerId}
                  key={`${header.id}-header`}
                  loading={loading}
                  sortIcon={sortIcon}
              />
            ))}
          </tr>
        ))}
      </thead>
    </>
  )
}

import React, { useContext } from "react"
import classnames from "classnames";
import { buildCss } from "../../utilities/props";
import { globalProps } from "../../utilities/globalProps";
import { HeaderGroup } from "@tanstack/react-table"
import AdvancedTableContext from "../Context/AdvancedTableContext"
import { TableHeaderCell } from "../Components/TableHeaderCell"
import { GenericObject } from "../../types";

type TableHeaderProps = {
  children?: React.ReactNode | React.ReactNode[]
  className?: string
  enableSorting?: boolean
  id?: string;
  sortIcon?: string | string[]
}

export const TableHeader = ({
  children,
  className,
  enableSorting = false,
  id,
  sortIcon = ["arrow-up-short-wide", "arrow-down-short-wide"],
  ...props
}: TableHeaderProps) => {
  const {
    enableToggleExpansion,
    handleExpandOrCollapse,
    loading,
    table,
  } = useContext(AdvancedTableContext)

  const classes = classnames(
    buildCss("pb_advanced_table_header"),
    globalProps(props),
    className
  );


  return (
    <>
      <thead className={classes}
          id={id}
      >
        {/* Get the header groups (only one in this example) */}
        {table.getHeaderGroups().map((headerGroup: HeaderGroup<GenericObject>) => (
          <tr key={`${headerGroup.id}-headerGroup`}>
            {headerGroup.headers.map(header => (
              <TableHeaderCell
                  enableSorting={enableSorting}
                  enableToggleExpansion={enableToggleExpansion}
                  handleExpandOrCollapse={handleExpandOrCollapse}
                  header={header}
                  headerChildren={children}
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

import React from "react"
import Icon from "../../pb_icon/_icon"
import { Header } from "@tanstack/react-table"
import { DataType } from "../Utilities/types"
import { displayIcon } from "../Utilities/helper_functions"

type SortIconButtonProps = {
  header: Header<DataType, unknown>
  sortIcon?: string | string[]
}
export const SortIconButton = ({ header, sortIcon }: SortIconButtonProps) => {

  return (
    <>
      {header.column.getIsSorted() === "desc" ? (
        <div className="year-sort-icon" 
            key={displayIcon(sortIcon)[0]}
        >
          <Icon icon={displayIcon(sortIcon)[0]} />
        </div>
      ) : (
        <div className="year-sort-icon" 
            key={displayIcon(sortIcon)[1]}
        >
          <Icon icon={displayIcon(sortIcon)[1]} />
        </div>
      )}
    </>
  )
}

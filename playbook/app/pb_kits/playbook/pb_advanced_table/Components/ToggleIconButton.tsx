import React, { useContext } from "react"
import Icon from "../../pb_icon/_icon"
import { Row } from "@tanstack/react-table"
import AdvancedTableContext from "../Context/AdvancedTableContext"
import { DataType } from "../Utilities/types"
import { displayIcon } from "../Utilities/IconHelpers"

interface ToggleIconButtonProps {
  onClick: (row: Row<DataType>) => void
  row?: Row<DataType>
}

export const ToggleIconButton = ({ row, onClick }: ToggleIconButtonProps) => {
  const { toggleExpansionIcon } = useContext(AdvancedTableContext)
  return (
    <button
        className="gray-icon toggle-all-icon"
        key={displayIcon(toggleExpansionIcon)[0]}
        onClick={() => onClick(row)}
    >
      <Icon
          cursor="pointer"
          fixedWidth
          icon={displayIcon(toggleExpansionIcon)[0]}
      />
    </button>
  )
}

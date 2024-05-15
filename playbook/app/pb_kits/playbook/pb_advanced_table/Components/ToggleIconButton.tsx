import React, { useContext } from "react"
import { Row } from "@tanstack/react-table"

import { GenericObject } from "../../types"

import Icon from "../../pb_icon/_icon"

import { displayIcon } from "../Utilities/IconHelpers"

import AdvancedTableContext from "../Context/AdvancedTableContext"

interface ToggleIconButtonProps {
  onClick: (row: Row<GenericObject>) => void
  row?: Row<GenericObject>
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

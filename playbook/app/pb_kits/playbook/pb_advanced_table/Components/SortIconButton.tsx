import React from "react"
import { Header } from "@tanstack/react-table"

import { GenericObject } from "../../types"

import Icon from "../../pb_icon/_icon"

import { displayIcon } from "../Utilities/IconHelpers"

type SortIconButtonProps = {
  header: Header<GenericObject, unknown>
  sortIcon?: string | string[]
  enableSortingRemoval?: boolean
}

export const SortIconButton = ({ header, sortIcon, enableSortingRemoval }: SortIconButtonProps) => {
  const firstIcon = displayIcon(sortIcon)[0]
  const secondIcon = displayIcon(sortIcon)[1]

  return (
    <>
      {header.column.getIsSorted() === "desc" && (
        <div
            className="sort-button-icon"
            key={firstIcon}
            style={{ paddingLeft: `${header?.index === 0 ? "2px" : "4px"}` }}
        >
          <Icon icon={firstIcon} />
        </div>
      )}
      {header.column.getIsSorted() === "asc" && (
        <div
            className="sort-button-icon"
            key={secondIcon}
            style={{ paddingLeft: `${header?.index === 0 ? "2px" : "4px"}` }}
        >
          <Icon icon={secondIcon} />
        </div>
      )}
      {header.column.getIsSorted() === false && (
        <div
            className="sort-button-icon"
            key={enableSortingRemoval ? "arrow-up-arrow-down" : secondIcon}
            style={{ paddingLeft: `${header?.index === 0 ? "2px" : "4px"}` }}
        >
          <Icon icon={enableSortingRemoval ? "arrow-up-arrow-down" : secondIcon} />
        </div>
      )}
    </>
  );
};

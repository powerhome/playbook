import React from "react"
import { Header } from "@tanstack/react-table"

import { GenericObject } from "../../types"

import Icon from "../../pb_icon/_icon"
import { getAllIcons } from "../../utilities/icons/allicons"

import { displayIcon } from "../Utilities/IconHelpers"

type SortIconButtonProps = {
  header: Header<GenericObject, unknown>
  sortIcon?: string | string[]
}

export const SortIconButton = ({ header, sortIcon }: SortIconButtonProps) => {

const firstIcon = displayIcon(sortIcon)[0] 
const secondIcon = displayIcon(sortIcon)[1] 
const upIcon = getAllIcons()["arrowUpShortWide"].icon as unknown as { [key: string]: SVGElement }
const downIcon = getAllIcons()["arrowDownShortWide"].icon as unknown as { [key: string]: SVGElement }

  return (
    <>
      {header.column.getIsSorted() === "desc" ? (
        <div className="sort-button-icon" 
            key={firstIcon}
        >
        { firstIcon === "arrow-up-short-wide" ? (
          <Icon customIcon={upIcon} /> ) : (
          <Icon icon={firstIcon} />
        )}
        </div>
      ) : (
        <div className="sort-button-icon" 
            key={secondIcon}
        >
        { secondIcon === "arrow-down-short-wide" ? (
          <Icon customIcon={downIcon} /> ) : (
          <Icon icon={secondIcon} />
        )}
        </div>
      )}
    </>
  )
}

import React, { useContext } from "react"
import { Getter, Row } from "@tanstack/react-table"

import { GenericObject } from "../../types"

import { GlobalProps } from "../../utilities/globalProps"

import Flex from "../../pb_flex/_flex"
import FlexItem from "../../pb_flex/_flex_item"
import Icon from "../../pb_icon/_icon"
import Checkbox from "../../pb_checkbox/_checkbox"

import AdvancedTableContext from "../Context/AdvancedTableContext"

interface CustomCellProps {
  getValue?: Getter<string>
  onRowToggleClick?: (arg: Row<GenericObject>) => void
  row: Row<GenericObject>
  value?: string
  customRenderer?: (row: Row<GenericObject>, value: string | undefined) => React.ReactNode
  selectableRows?: boolean
  customStyle?: GenericObject
}

export const CustomCell = ({
  getValue,
  onRowToggleClick,
  row,
  value,
  customRenderer,
  selectableRows,
  customStyle = {},
}: CustomCellProps & GlobalProps) => {
  const { setExpanded, expanded, expandedControl, inlineRowLoading, hasAnySubRows } = useContext(AdvancedTableContext);

  const handleOnExpand = (row: Row<GenericObject>) => {
    onRowToggleClick && onRowToggleClick(row);

    if (!expandedControl) {
      setExpanded({ ...expanded, [row.id]: !row.getIsExpanded() });
    }
  };

  const RowHasChildren = row.original.children ? true : false
  const renderButton = inlineRowLoading ? RowHasChildren : row.getCanExpand()

  return (
    <div style={{ paddingLeft: `${row.depth * 1.25}em`}}>
      <Flex
          alignItems="center"
          columnGap="xs"
          justify="start"
          orientation="row"
      >
        {
          selectableRows && hasAnySubRows && (
          <Checkbox
              checked={row.getIsSelected()}
              disabled={!row.getCanSelect()}
              indeterminate={row.getIsSomeSelected()}
              name={row.id}
              onChange={row.getToggleSelectedHandler()}
          />
          )
        }
        {renderButton ? (
          <button
              className="gray-icon expand-toggle-icon"
              onClick={() => handleOnExpand(row)}
              style={{ color: customStyle?.expandButtonColor }}
          >
            {row.getIsExpanded() ? (
              <Icon cursor="pointer"
                  icon="circle-play-down"
              />
            ) : (
              <Icon cursor="pointer"
                  icon="circle-play"
               />
            )}
          </button>
        ) : null}
        <FlexItem paddingLeft={renderButton? "none" : "xs"}>
          {row.depth === 0 ? (
            customRenderer ? customRenderer(row, getValue()) : getValue()
           ) :(
            customRenderer ? customRenderer(row, value) : value
           )
           }
        </FlexItem>
      </Flex>
    </div>
  )
}

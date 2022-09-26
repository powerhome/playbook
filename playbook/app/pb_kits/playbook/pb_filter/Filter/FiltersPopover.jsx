/* @flow */

import React, { Node, useState } from 'react'

import CircleIconButton from '../../pb_circle_icon_button/_circle_icon_button'
import PbReactPopover from '../../pb_popover/_popover'

const FiltersPopoverProps = { children: Node }
const FiltersPopover = ({ children, dark, minWidth, placement = "bottom-start" }: FiltersPopoverProps) => {
  const [hide, updateHide] = useState(true)
  const toggle = () => updateHide(!hide)

  const filterButton = (
    <CircleIconButton
        dark={dark}
        icon="filter"
        id="filter"
        onClick={toggle}
        text="filter"
        variant="secondary"
    />
  )

  return (
    <PbReactPopover
        closeOnClick="outside"
        minWidth={minWidth}
        placement={placement}
        reference={filterButton}
        shouldClosePopover={updateHide}
        show={!hide}
    >
      <div className="pb-form">
        {typeof children === 'function'
          ? children({ closePopover: () => (updateHide(true)) })
          : children}
      </div>
    </PbReactPopover>
  )
}

export default FiltersPopover

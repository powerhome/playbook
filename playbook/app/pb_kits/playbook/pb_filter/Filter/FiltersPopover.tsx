import React, { ReactNode, useState } from 'react'

import CircleIconButton from '../../pb_circle_icon_button/_circle_icon_button'
import PbReactPopover from '../../pb_popover/_popover'
import { GenericObject } from '../../types'

type FiltersPopoverProps = {
  children?: React.ReactChild[] | React.ReactChild | (({closePopover}: {closePopover: () => void}) =>  ReactNode), 
  dark?: boolean,
  maxHeight?: string,
  minWidth?: string,
  placement?: "top" | "right" | "bottom" | "left" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end",
  popoverProps?: GenericObject,
}
const FiltersPopover = ({ children, dark, maxHeight, minWidth, placement = "bottom-start", popoverProps }: FiltersPopoverProps): React.ReactElement => {
  const [hide, updateHide] = useState(true)
  const toggle = () => updateHide(!hide)

  const filterButton = (
    <CircleIconButton
        dark={dark}
        icon="filter"
        id="filter"
        onClick={toggle}
        variant="secondary"
    />
  )

  return (
    <PbReactPopover
        closeOnClick="outside"
        maxHeight={maxHeight}
        minWidth={minWidth}
        placement={placement}
        reference={filterButton}
        shouldClosePopover={updateHide}
        show={!hide}
        {...popoverProps}
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

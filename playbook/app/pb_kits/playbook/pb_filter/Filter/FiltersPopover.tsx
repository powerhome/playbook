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
  /** See Popover `scrollShell`: inner scroll + Dropdown portaled to outer body when max dimensions are set. */
  scrollShell?: boolean,
  /** See Popover `allowOverflow`: width-only avoids clipping; with `maxHeight`, uses scroll shell so height is respected. */
  allowOverflow?: boolean,
}
const FiltersPopover = ({ children, dark, maxHeight, minWidth, placement = "bottom-start", popoverProps, scrollShell, allowOverflow }: FiltersPopoverProps): React.ReactElement => {
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
        allowOverflow={allowOverflow}
        closeOnClick="outside"
        maxHeight={maxHeight}
        minWidth={minWidth}
        placement={placement}
        reference={filterButton}
        scrollShell={scrollShell}
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

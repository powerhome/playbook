import React, { ReactNode, useState } from 'react'

import CircleIconButton from '../../pb_circle_icon_button/_circle_icon_button'
import PbReactPopover from '../../pb_popover/_popover'

type FiltersPopoverProps = { 
  children?: React.ReactChild[] | React.ReactChild | (({closePopover}: {closePopover: () => void}) =>  ReactNode), 
  dark?: boolean,
  minWidth?: string,
  placement?: any,
}
const FiltersPopover = ({ children, dark, minWidth, placement = "bottom-start" }: FiltersPopoverProps): React.ReactElement => {
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

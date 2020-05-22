/* @flow */

import React, { Node, useState } from 'react'
import { CircleIconButton, PbReactPopover } from '../../'

const FiltersPopoverProps = { children: Node }
const FiltersPopover = ({ children }: FiltersPopoverProps) => {
  const [hide, updateHide] = useState(true)
  const toggle = () => updateHide(!hide)

  const filterButton = (
    <CircleIconButton
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
        offset
        placement="bottom"
        reference={filterButton}
        shouldClosePopover={updateHide}
        show={!hide}
    >
      <div className="pb-form">
        {children}
      </div>
    </PbReactPopover>
  )
}

export default FiltersPopover

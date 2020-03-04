import React, { useState } from 'react'
import {
  PbReactPopover,
} from '../..'

const PopoverDefault = () => {
  const [showPopover, setShowPopover] = useState(false)

  const handleTogglePopover = () => {
    setShowPopover(!showPopover)
  }
  const popoverReference = (
    <span onClick={handleTogglePopover}>{'Click me.'}</span>
  )

  return (
    <PbReactPopover
        reference={popoverReference}
        show={showPopover}
    >
      {'Whoa. I\'m a popover.'}
    </PbReactPopover>
  )
}

export default PopoverDefault

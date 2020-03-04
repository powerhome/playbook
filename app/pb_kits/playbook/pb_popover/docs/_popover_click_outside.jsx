import React, { useState } from 'react'
import {
  Button,
  PbReactPopover,
} from '../..'

const PopoverClickOutside = () => {
  const [showPopover, setShowPopover] = useState(false)

  const handleTogglePopover = () => {
    setShowPopover(!showPopover)
  }

  const handleShouldClosePopover = (shouldClosePopover) => {
    setShowPopover(!shouldClosePopover)
  }

  const popoverTrigger = (
    <Button
        onClick={handleTogglePopover}
        text="Button Secondary"
        variant="secondary"
    />
  )

  return (
    <PbReactPopover
        closeOnClick="outside"
        offset
        placement="bottom"
        reference={popoverTrigger}
        shouldClosePopover={handleShouldClosePopover}
        show={showPopover}
    >
      {'Whoa. I\'m a popover.'}
    </PbReactPopover>
  )
}

export default PopoverClickOutside

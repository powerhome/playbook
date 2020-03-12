import React, { useState } from 'react'
import {
  Button,
  PbReactPopover,
} from '../..'

const PopoverClickAny = () => {
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
        closeOnClick="any"
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

export default PopoverClickAny

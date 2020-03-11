import React, { useState } from 'react'
import {
  Button,
  PbReactPopover,
} from '../..'

const PopoverWithButton = () => {
  const [showPopover, setShowPopover] = useState(false)

  const handleTogglePopover = () => {
    setShowPopover(!showPopover)
  }

  const popoverReference = (
    <Button
        onClick={handleTogglePopover}
        text="Button Secondary"
        variant="secondary"
    />
  )

  return (
    <PbReactPopover
        offset
        placement="bottom"
        reference={popoverReference}
        show={showPopover}
    >
      {'Whoa. I\'m a popover.'}
    </PbReactPopover>
  )
}

export default PopoverWithButton

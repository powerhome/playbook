import React, { useState } from 'react'
import {
  Body,
  Button,
  PbReactPopover,
} from '../..'

const PopoverZIndex = () => {
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
        text="Click Me"
        variant="secondary"
    />
  )

  return (
    <>
      <div style={{ position: 'relative', zIndex: 2 }}>
        <Body
            marginBottom="md"
            text="I've got a z-index of 2"
        />
      </div>
      <PbReactPopover
          closeOnClick="outside"
          offset
          placement="top"
          reference={popoverTrigger}
          shouldClosePopover={handleShouldClosePopover}
          show={showPopover}
          zIndex={3}
      >
        {'I have a custom z-index of 3'}
      </PbReactPopover>
    </>
  )
}

export default PopoverZIndex

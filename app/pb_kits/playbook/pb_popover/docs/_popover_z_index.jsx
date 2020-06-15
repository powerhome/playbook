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
      <div style={{ position: 'relative', zIndex: 15 }}>
        <Body text="I've got a z-index of 15" />
      </div>
      <br />
      <PbReactPopover
          closeOnClick="outside"
          offset
          placement="top"
          reference={popoverTrigger}
          shouldClosePopover={handleShouldClosePopover}
          show={showPopover}
          zIndex={16}
      >
        {'I have a custom z-index of 16'}
      </PbReactPopover>
    </>
  )
}

export default PopoverZIndex

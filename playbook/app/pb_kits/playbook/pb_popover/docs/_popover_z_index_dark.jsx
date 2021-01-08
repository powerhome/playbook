import React, { useState } from 'react'
import {
  Body,
  Button,
  PbReactPopover,
} from '../..'

const PopoverZIndexDark = (props) => {
  const [showPopover, setShowPopover] = useState(false)

  const handleTogglePopover = () => {
    setShowPopover(!showPopover)
  }

  const handleShouldClosePopover = (shouldClosePopover) => {
    setShowPopover(!shouldClosePopover)
  }

  const popoverTrigger = (
    <Button
        dark
        onClick={handleTogglePopover}
        text="Click Me"
        variant="primary"
    />
  )

  return (
    <>
      <div style={{ position: 'relative', zIndex: 2 }}>
        <Body
            dark
            marginBottom="md"
            text="I've got a z-index of 2"
            {...props}
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
          {...props}
      >
        {'I have a custom z-index of 3'}
      </PbReactPopover>
    </>
  )
}

export default PopoverZIndexDark

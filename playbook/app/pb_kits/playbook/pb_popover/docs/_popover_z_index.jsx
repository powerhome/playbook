import React, { useState } from 'react'

import Body from '../../pb_body/_body'
import Button from '../../pb_button/_button'
import PbReactPopover from '../../pb_popover/_popover'

const PopoverZIndex = (props) => {
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
            {...props}
        />
      </div>
      <PbReactPopover
          closeOnClick="outside"
          offset
          padding="sm"
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

export default PopoverZIndex

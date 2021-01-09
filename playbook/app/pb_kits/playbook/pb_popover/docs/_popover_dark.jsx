import React, { useState } from 'react'
import {
  Body,
  CircleIconButton,
  Flex,
  PbReactPopover,
} from '../..'

const PopoverDark = (props) => {
  const [showPopover, setShowPopover] = useState(false)

  const handleTogglePopover = () => {
    setShowPopover(!showPopover)
  }
  const popoverReference = (
    <CircleIconButton
        dark
        icon="info"
        onClick={handleTogglePopover}
        variant="secondary"
    />
  )

  return (
    <Flex
        dark
        orientation="row"
        vertical="center"
        {...props}
    >
      <Body
          dark
          text="Click info for more details"
          {...props}
      />
      &nbsp;
      <PbReactPopover
          dark
          offset
          placement="top"
          reference={popoverReference}
          show={showPopover}
          {...props}
      >
        {'I\'m a popover. I can show content of any size.'}
      </PbReactPopover>
    </Flex>
  )
}

export default PopoverDark

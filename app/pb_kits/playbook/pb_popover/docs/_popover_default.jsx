import React, { useState } from 'react'
import {
  Body,
  CircleIconButton,
  Flex,
  PbReactPopover,
} from '../..'

const PopoverDefault = () => {
  const [showPopover, setShowPopover] = useState(false)

  const handleTogglePopover = () => {
    setShowPopover(!showPopover)
  }
  const popoverReference = (
    <CircleIconButton
        icon="info"
        onClick={handleTogglePopover}
        variant="secondary"
    />
  )

  return (
    <Flex
        orientation="row"
        vertical="center"
    >
      <Body text="Click info for more details" />
      &nbsp;
      <PbReactPopover
          offset
          placement="top"
          reference={popoverReference}
          show={showPopover}
      >
        {'I\'m a popover. I can show content of any size.'}
      </PbReactPopover>
    </Flex>
  )
}

export default PopoverDefault

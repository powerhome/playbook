import React, { useState } from 'react'

import Body from '../../pb_body/_body'
import CircleIconButton from '../../pb_circle_icon_button/_circle_icon_button'
import Flex from '../../pb_flex/_flex'
import PbReactPopover from '../../pb_popover/_popover'

const PopoverDefault = (props) => {
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
        {...props}
    >
      <Body text="Click info for more details" />
      &nbsp;
      <PbReactPopover
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

export default PopoverDefault

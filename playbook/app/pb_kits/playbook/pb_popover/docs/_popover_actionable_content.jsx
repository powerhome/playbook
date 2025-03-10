import React, { useState } from 'react'

import Body from '../../pb_body/_body'
import Button from '../../pb_button/_button'
import CircleIconButton from '../../pb_circle_icon_button/_circle_icon_button'
import Flex from '../../pb_flex/_flex'
import PbReactPopover from '../../pb_popover/_popover'

const PopoverActionableContent = (props) => {
  const [showPopover, setShowPopover] = useState(false)

  const handleTogglePopover = () => {
    setShowPopover(!showPopover)
  }

  const handleShouldClosePopover = (shouldClose) => {
    setShowPopover(!shouldClose)
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
          closeOnClick="inside"
          offset
          placement="top"
          reference={popoverReference}
          shouldClosePopover={handleShouldClosePopover}
          show={showPopover}
          {...props}
      >
        <Body textAlign="center">
          <Button
              onClick={() => {alert("Let's do this!")}}
              text="Learn More"
          />
        </Body>
      </PbReactPopover>
    </Flex>
  )
}

export default PopoverActionableContent

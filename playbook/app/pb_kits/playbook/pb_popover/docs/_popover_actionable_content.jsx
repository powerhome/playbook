import React, { useState } from 'react'
import {
  Body,
  Button,
  CircleIconButton,
  Flex,
  PbReactPopover,
} from 'playbook-ui'

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

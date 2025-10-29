import React, { useState } from 'react'

import Button from '../../pb_button/_button'
import Flex from '../../pb_flex/_flex'
import PbReactPopover from '../../pb_popover/_popover'

const PopoverClose = (props) => {
  const [showInsidePopover, setInsideShowPopover] = useState(false)
  const [showOutsidePopover, setOutsideShowPopover] = useState(false)
  const [showAnyPopover, setAnyShowPopover] = useState(false)

  const handleInsideShouldClosePopover = (shouldClosePopover) => {
    setInsideShowPopover(!shouldClosePopover)
  }

  const handleInsideTogglePopover = () => {
    setInsideShowPopover(!showInsidePopover)
  }

  const handleOutsideShouldClosePopover = (shouldClosePopover) => {
    setOutsideShowPopover(!shouldClosePopover)
  }

  const handleOutsideTogglePopover = () => {
    setOutsideShowPopover(!showOutsidePopover)
    setAnyShowPopover(false)
  }

  const handleAnyShouldClosePopover = (shouldClosePopover) => {
    setAnyShowPopover(!shouldClosePopover)
  }

  const handleAnyTogglePopover = () => {
    setAnyShowPopover(!showAnyPopover)
    setOutsideShowPopover(false)
  }

  const insidePopoverTrigger = (
    <Button
        onClick={handleInsideTogglePopover}
        text="Click Inside"
        variant="secondary"
    />
  )

  const outsidePopoverTrigger = (
    <Button
        onClick={handleOutsideTogglePopover}
        text="Click Outside"
        variant="secondary"
    />
  )

  const anyPopoverTrigger = (
    <Button
        onClick={handleAnyTogglePopover}
        text="Click Anywhere"
        variant="secondary"
    />
  )

  return (
    <Flex spacing="between">
      <PbReactPopover
          closeOnClick="inside"
          offset
          placement="bottom"
          reference={insidePopoverTrigger}
          shouldClosePopover={handleInsideShouldClosePopover}
          show={showInsidePopover}
          {...props}
      >
        {'Click on me!'}
      </PbReactPopover>

      <PbReactPopover
          closeOnClick="outside"
          offset
          placement="top"
          reference={outsidePopoverTrigger}
          shouldClosePopover={handleOutsideShouldClosePopover}
          show={showOutsidePopover}
          {...props}
      >
        {'Click anywhere but me!'}
      </PbReactPopover>

      <PbReactPopover
          closeOnClick="any"
          offset
          placement="right"
          reference={anyPopoverTrigger}
          shouldClosePopover={handleAnyShouldClosePopover}
          show={showAnyPopover}
          {...props}
      >
        {'Click anything!'}
      </PbReactPopover>
    </Flex>
  )
}

export default PopoverClose

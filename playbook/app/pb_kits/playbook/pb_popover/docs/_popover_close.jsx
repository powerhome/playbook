import React, { useState } from 'react'
import {
  Button,
  Flex,
  PbReactPopover,
} from '../..'

const PopoverClose = () => {
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
  }

  const handleAnyShouldClosePopover = (shouldClosePopover) => {
    setAnyShowPopover(!shouldClosePopover)
  }

  const handleAnyTogglePopover = () => {
    setAnyShowPopover(!showOutsidePopover)
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
      >
        {'Click anything!'}
      </PbReactPopover>
    </Flex>
  )
}

export default PopoverClose

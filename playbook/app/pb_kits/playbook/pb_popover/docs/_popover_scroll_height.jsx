import React, { useState } from 'react'

import Body from '../../pb_body/_body'
import Button from '../../pb_button/_button'
import PbReactPopover from '../../pb_popover/_popover'
import Title from '../../pb_title/_title'

const PopoverScrollHeight = (props) => {
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
    <PbReactPopover
        closeOnClick="any"
        maxHeight="150px"
        maxWidth="240px"
        offset
        padding="md"
        paddingBottom="sm"
        paddingTop="sm"
        placement="top"
        reference={popoverTrigger}
        shouldClosePopover={handleShouldClosePopover}
        show={showPopover}
        {...props}
    >
      <Body
          marginBottom="sm"
          text="So many people live within unhappy circumstances and yet will
          not take the initiative to change their situation because they are
          conditioned to a life of security, conformity, and conservation, all of
          which may appear to give one peace of mind, but in reality, nothing is
          more damaging to the adventurous spirit."
          {...props}
      />
      <Title
          size={4}
          text="- Christopher McCandless"
          {...props}
      />

    </PbReactPopover>
  )
}

export default PopoverScrollHeight

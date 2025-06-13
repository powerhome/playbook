import React from 'react'
import Button from '../../pb_button/_button'
import Tooltip from '../_tooltip'
import Flex from '../../pb_flex/_flex'

const TooltipClickOpen = (props) => {
  return (
    <Flex flexDirection='row'
        gap='md'
        wrap
    >
      <Tooltip
          clickOpen
          placement='top'
          text='Tooltip Opened'
          zIndex={10}
          {...props}
      >
        <Button text='Click to Open' />
      </Tooltip>
    </Flex>
  )
}

export default TooltipClickOpen

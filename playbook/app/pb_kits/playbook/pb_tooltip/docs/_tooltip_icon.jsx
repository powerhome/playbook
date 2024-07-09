// @flow

import React from 'react'
import { Tooltip, Button, Flex } from 'playbook-ui'

const TooltipIcon = (props) => {
  return (
    <Flex flexDirection='row'
        gap='md'
        wrap
    >
      <Tooltip
          icon='paper-plane'
          placement='top'
          text='Send Email'
          zIndex={10}
          {...props}
      >
        <Button text='Tooltip With Icon' />
      </Tooltip>
      <Tooltip
          icon='paper-plane'
          placement='bottom'
          text='Send Email'
          zIndex={10}
          {...props}
      >
        <Button text='Tooltip With Icon' />
      </Tooltip>
      <Tooltip
          icon='paper-plane'
          placement='right'
          text='Send Email'
          zIndex={10}
          {...props}
      >
        <Button text='Tooltip With Icon' />
      </Tooltip>
      <Tooltip
          icon='paper-plane'
          placement='left'
          text='Send Email'
          zIndex={10}
          {...props}
      >
        <Button text='Tooltip With Icon' />
      </Tooltip>
    </Flex>
  )
}

export default TooltipIcon

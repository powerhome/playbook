// @flow

import React from 'react'
import { Tooltip, Flex, CircleIconButton } from '../..'

const TooltipMargin = (props) => {
  return (
    <Flex 
        flexDirection='row' 
        justifyContent='center' 
        wrap
    >
      <Tooltip
          margin='md'
          placement='top'
          text='Send Email'
          zIndex={10}
          {...props}
      >
        <CircleIconButton 
            icon='paper-plane'
        />
      </Tooltip>
      <Tooltip 
          margin='md' 
          placement='top' 
          text='Send Email' 
          zIndex={10} 
          {...props}
      >
        <CircleIconButton 
            icon='paper-plane'
        />
      </Tooltip>
    </Flex>
  )
}

export default TooltipMargin

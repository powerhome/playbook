import React from 'react'
import Tooltip from '../../pb_tooltip/_tooltip'
import Flex from '../../pb_flex/_flex'
import CircleIconButton from '../../pb_circle_icon_button/_circle_icon_button'

const TooltipMargin = (props) => {
  return (
    <Flex 
        flexDirection='row' 
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

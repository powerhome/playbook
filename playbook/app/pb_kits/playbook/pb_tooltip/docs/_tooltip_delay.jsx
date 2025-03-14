import React from 'react'
import Button from '../../pb_button/_button'
import Tooltip from '../../pb_tooltip/_tooltip'
import Flex from '../../pb_flex/_flex'
import FlexItem from '../../pb_flex/_flex_item'

const TooltipDelay = (props) => {

  return (
   <Flex 
       flexDirection='row'
       gap='md'
       wrap
   >
    <FlexItem>
      <Tooltip 
          delay={1000}
          placement='top' 
          text="1s open/close delay" 
          zIndex={10}
          {...props}
      >
        <Button text="1s delay"/>
      </Tooltip>
    </FlexItem>
    <FlexItem>
      <Tooltip 
          delay={{
            open: 1000
          }}
          placement='top' 
          text="1s open delay" 
          zIndex={10}
          {...props}
      >
        <Button text="Open only"/>
      </Tooltip>
    </FlexItem>
    <FlexItem>
      <Tooltip 
          delay={{
            close: 1000
          }}
          placement='top' 
          text="1s close delay" 
          zIndex={10}
          {...props}
      >
        <Button text="Close only"/>
      </Tooltip>
    </FlexItem>
   </Flex>
  )
}

export default TooltipDelay

import React from 'react'
import Button from '../../pb_button/_button'
import Tooltip from '../../pb_tooltip/_tooltip'
import Flex from '../../pb_flex/_flex'
import FlexItem from '../../pb_flex/_flex_item'

const TooltipInteraction = (props) => {

  return (
   <Flex 
       flexDirection='row'
       gap='md'
       wrap
   >
    <FlexItem>
      <Tooltip 
          interaction 
          placement='top' 
          text="You can copy me"
          zIndex={10}
          {...props}
      >
        <Button text="With Interaction"/>
      </Tooltip>
    </FlexItem>
    <FlexItem>
     <Tooltip 
         placement='top' 
         text="I'm just a regular tooltip" 
         zIndex={10}
         {...props}
     >
        <Button text="No Interaction"/>
      </Tooltip>
    </FlexItem>
   </Flex>
  )
}

export default TooltipInteraction

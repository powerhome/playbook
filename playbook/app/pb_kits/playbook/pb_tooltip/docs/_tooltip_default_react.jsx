import React from 'react'
import Tooltip from '../../pb_tooltip/_tooltip'
import Flex from '../../pb_flex/_flex'
import FlexItem from '../../pb_flex/_flex_item'

const TooltipDefaultReact = (props) => {

  return (
   <Flex 
       flexDirection='row'
       gap='md'
       wrap
   >
    <FlexItem>
      <Tooltip 
          placement='top' 
          text="Whoa. I'm a Tooltip" 
          zIndex={10}
          {...props}
      >
        {'Hover here (Top)'}
      </Tooltip>
    </FlexItem>
    <FlexItem>
     <Tooltip 
         placement='bottom' 
         text="Whoa. I'm a Tooltip" 
         zIndex={10}
         {...props}
     >
        {'Hover here (Bottom)'}
      </Tooltip>
    </FlexItem>
    <FlexItem>
      <Tooltip 
          placement='right' 
          text="Whoa. I'm a Tooltip" 
          zIndex={10}
          {...props}
      >
        {'Hover here (Right)'}
      </Tooltip>
    </FlexItem>
    <FlexItem>
      <Tooltip 
          placement='left' 
          text="Whoa. I'm a Tooltip" 
          zIndex={10}
          {...props}
      >
        {'Hover here (Left)'}
      </Tooltip>
    </FlexItem>
   </Flex>
  )
}

export default TooltipDefaultReact

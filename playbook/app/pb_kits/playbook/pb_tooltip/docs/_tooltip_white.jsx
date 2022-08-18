// @flow

import React from 'react'
import { Tooltip, Flex, FlexItem } from '../..';

const TooltipWhite = (props) => {

  return (
   <Flex 
       flexDirection='row'
       gap='md'
       justifyContent='center'
       wrap
   >
    <FlexItem>
      <Tooltip 
          light
          placement='top' 
          text="Whoa. I'm a white tooltip." 
          zIndex={10}
          {...props}
      >
        {'Hover here (Top)'}
      </Tooltip>
    </FlexItem>
    <FlexItem>
     <Tooltip 
         light
         placement='bottom' 
         text="Whoa. I'm a white tooltip." 
         zIndex={10}
         {...props}
     >
        {'Hover here (Bottom)'}
      </Tooltip>
    </FlexItem>
    <FlexItem>
      <Tooltip 
          placement='right' 
          text="Whoa. I'm a white tooltip." 
          zIndex={10}
          {...props}
      >
        {'Hover here (Right)'}
      </Tooltip>
    </FlexItem>
    <FlexItem>
      <Tooltip 
          light
          placement='left' 
          text="Whoa. I'm a white tooltip." 
          zIndex={10}
          {...props}
      >
        {'Hover here (Left)'}
      </Tooltip>
    </FlexItem>
   </Flex>
  )
}

export default TooltipWhite

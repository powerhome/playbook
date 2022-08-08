// @flow

import React from 'react'
import { Tooltip, Flex, FlexItem } from '../..';

const TooltipDefault = (props) => {

  return (
   <Flex 
       alignItems='center'
       flexDirection='column' 
    >
    <FlexItem>
      <Tooltip 
          marginTop='md' 
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
         marginTop='md' 
         placement='bottom' 
         text="Whoa. I'm a Tooltip" 
         zIndex={10}
         {...props}
      >
        {'Hover here (bottom)'}
      </Tooltip>
    </FlexItem>
    <FlexItem>
      <Tooltip 
          marginTop='md' 
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
          marginTop='md' 
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

export default TooltipDefault

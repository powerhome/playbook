// @flow

import React from 'react'
import { Tooltip, Button, Flex, FlexItem } from 'playbook-ui';

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

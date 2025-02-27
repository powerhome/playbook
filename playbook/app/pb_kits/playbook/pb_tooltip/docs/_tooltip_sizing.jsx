import React from 'react'
import { Tooltip, Flex, FlexItem } from 'playbook-ui';

const TooltipSizing = (props) => {

  return (
   <Flex
       flexDirection='row'
       gap='md'
       wrap
   >
    <FlexItem>
      <Tooltip
          height='100px'
          placement='top'
          text="Whoa. I'm a Tooltip"
          zIndex={10}
          {...props}
      >
        {'Hover here (Top)'}
      </Tooltip>
    </FlexItem>
   </Flex>
  )
}

export default TooltipSizing

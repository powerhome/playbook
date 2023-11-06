// @flow

import React from 'react'
import { Tooltip, Flex, FlexItem } from '../..'
import './styles.css'

const TooltipTruncated = (props) => {

  return (
   <Flex 
       flexDirection='row'
       gap='md'
       justifyContent='center'
       wrap
   >
    <FlexItem>
      <Tooltip 
          className='tooltip-text-truncation'
          style={{
            'backgroundColor': 'red'
          }}
          text='This is a truncated tooltip trigger.' 
          truncationEnabled
          zIndex={10}
          {...props}
      >
        {'This is a truncated tooltip trigger.'}
      </Tooltip>
    </FlexItem>
    <FlexItem>
      <Tooltip 
          className='tooltip-text-truncation'
          text='This is a truncated tooltip trigger.' 
          truncationEnabled
          zIndex={10}
          {...props}
      >
        {'This'}
      </Tooltip>
    </FlexItem>
   </Flex>
  )
}

export default TooltipTruncated

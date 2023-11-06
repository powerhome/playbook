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
          className='tooltip-text-truncation short'
          style={{
            'backgroundColor': 'red'
          }}
          text='Tooltip for truncation only short' 
          truncationEnabled
          zIndex={10}
          {...props}
      >
        {'Tooltip for truncation only'}
      </Tooltip>
    </FlexItem>
    <FlexItem>
      <Tooltip 
          className='tooltip-text-truncation long'
          text='Tooltip for truncation only' 
          truncationEnabled
          zIndex={10}
          {...props}
      >
        {'Tooltip for truncation only'}
      </Tooltip>
    </FlexItem>
   </Flex>
  )
}

export default TooltipTruncated

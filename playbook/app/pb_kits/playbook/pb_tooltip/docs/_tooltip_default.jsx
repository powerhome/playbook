// @flow

import React from 'react'
import { Button, Flex, Tooltip } from '../..';

const TooltipDefault = () => {

  return (
   <>
     <Flex orientation="row">
      <Tooltip 
          margin='md' 
          placement='top' 
          text='text goes here' 
          zIndex={10}
      >
        <Button text='hover me' />
      </Tooltip>
      <Tooltip 
          margin='md'
          placement='bottom' 
          text='text goes here' 
          zIndex={10}
      >
        <Button text='hover me' />
      </Tooltip>
      <Tooltip 
          margin='md'
          placement='right'
          text='text goes here' 
          zIndex={10}
      >
        <Button text='hover me' />
      </Tooltip>
      <Tooltip 
          margin='md' 
          placement='left' 
          text='text goes here' 
          zIndex={10}
      >
        <Button text='hover me' />
      </Tooltip>
    </Flex>
    <Flex orientation="column">
      <Tooltip 
          margin='md'
          placement='top' 
          text='text goes here' 
          zIndex={10}
      >
        {'Hover here (top)'}
      </Tooltip>
      <Tooltip 
          margin='md' 
          placement='bottom' 
          text='text goes here' 
          zIndex={10}
      >
        {'Hover here (bottom)'}
      </Tooltip>
      <Tooltip 
          margin='md' 
          placement='right' 
          text='text goes here' 
          zIndex={10}
      >
        {'Hover here (right)'}
      </Tooltip>
      <Tooltip 
          margin='md' 
          placement='left' 
          text='text goes here' 
          zIndex={10}
      >
        {'Hover here (left)'}
      </Tooltip>
    </Flex>
   </>
  )
}

export default TooltipDefault

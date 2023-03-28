// @flow

import React from 'react'

import { Body, Button, Flex, Tooltip } from '../..';

const TooltipPosition = (props) => {
  return (
    <Flex 
        gap='md'
        justify='center'
    >
      <div style={{
        overflow: 'scroll',
        height: '85px',
        width: '85px'
      }}>
        <Body text='Scroll down this div and hover the button' />
        <Tooltip
            placement='bottom'
            position='fixed'
            text='Fixed Tooltip'
            zIndex={10}
            {...props}
        >
          <Button text='Fixed' />
        </Tooltip>
      </div>
      <Tooltip
          placement='bottom'
          text='Absolute Tooltip'
          zIndex={10}
          {...props}
      >
        <Button text='Absolute' />
      </Tooltip>
    </Flex>
  );
}

export default TooltipPosition

// @flow

import React from 'react'
import { Tooltip, CircleIconButton } from '../..';

const TooltipWithIconCircle = (props) => {

  return (
    <Tooltip 
        placement='top' 
        text='Send Email' 
        zIndex={10}
        {...props}
    >
      <CircleIconButton
          icon="paper-plane"
      />
    </Tooltip>
  )
}

export default TooltipWithIconCircle

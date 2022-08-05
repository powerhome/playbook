// @flow

import React from 'react'
import { Tooltip, CircleIconButton } from '../..';

const TooltipWithIconCircle = () => {

  return (
    <Tooltip 
        placement='top' 
        text='Send Email' 
        zIndex={10}
    >
      <CircleIconButton
          icon="paper-plane"
      />
    </Tooltip>
  )
}

export default TooltipWithIconCircle

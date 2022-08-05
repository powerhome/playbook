// @flow

import React from 'react'
import { Tooltip } from '../..';

const TooltipWhite = () => {

  return (
   <>
      <Tooltip 
          placement="top" 
          text="Whoa. I'm a white tooltip" 
          zIndex={10}
      >
        {"I am a white tooltip."}
      </Tooltip>
   </>
  )
}

export default TooltipWhite

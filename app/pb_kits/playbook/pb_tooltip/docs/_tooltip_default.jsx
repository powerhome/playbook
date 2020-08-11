import React from 'react'
import { Tooltip } from '../../'

const TooltipDefault = () => {
  return (
    <>
      <span id='tooltip-2'>Hover over me.</span>
      <Tooltip
          dark
          position="top"
          text="Whoa. I'm a tooltip."
          tooltip_id="tooltip-2"
          trigger_element_id="regular-tooltip-2"
      >
        {'Im a tooltip.'}
      </Tooltip>
    </>
  )
}

export default TooltipDefault

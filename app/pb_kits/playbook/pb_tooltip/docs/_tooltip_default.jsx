import React from 'react'
import { Tooltip } from '../..'

const TooltipDefault = () => {
  const tooltipReference = (
    <span>{'Hover over me.'}</span>
  )

  return (
    <Tooltip
        reference={tooltipReference}
        text="Whoa. I'm a tooltip."
    />
  )
}

export default TooltipDefault

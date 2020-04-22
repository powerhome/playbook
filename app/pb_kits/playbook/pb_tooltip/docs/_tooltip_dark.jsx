import React from 'react'
import { Tooltip } from '../..'

const TooltipDark = () => {
  const tooltipReference = (
    <span>{'Hover over me.'}</span>
  )

  return (
    <Tooltip
        dark
        reference={tooltipReference}
        text="Whoa. I'm a tooltip."
    />
  )
}

export default TooltipDark

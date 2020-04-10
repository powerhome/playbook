import React, { useState } from 'react'
import { Tooltip } from '../..'

const TooltipDark = () => {
  const [showTooltip, setShowTooltip] = useState(false)

  const handleTogglePopover = () => {
    setShowTooltip(!showTooltip)
  }
  const popoverReference = (
    <span onClick={handleTogglePopover}>{'Hover over me.'}</span>
  )

  return (
    <Tooltip
        dark
        reference={popoverReference}
        show={showTooltip}
    >
      {'Whoa. I\'m a tooltip.'}
    </Tooltip>
  )
}

export default TooltipDark

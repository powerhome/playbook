import React, { useState } from 'react'
import {
  PbReactTooltip,
} from '../..'

const TooltipDark = () => {
  const [showTooltip, setShowTooltip] = useState(false)

  const handleTogglePopover = () => {
    setShowTooltip(!showTooltip)
  }
  const popoverReference = (
    <span onClick={handleTogglePopover}>{'Hover over me.'}</span>
  )

  return (
    <PbReactTooltip
        reference={popoverReference}
        show={showTooltip}
    >
      {'Whoa. I\'m a tooltip.'}
    </PbReactTooltip>
  )
}

export default TooltipDark


import React, { useState } from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'

import Button from '../pb_button/_button'
import Tooltip from '../pb_tooltip/_tooltip'

type CopyButtonProps = {
  aria?: { [key: string]: string },
  className?: string,
  data?: { [key: string]: string },
  id?: string,
  text?: string,
  tooltipPlacement?:  "top" | "right" | "bottom" | "left",
  tooltipText?: string,
  value?: string,
}

const CopyButton = (props: CopyButtonProps) => {
  const {
    aria = {},
    className,
    data = {},
    id,
    text= 'Copy',
    tooltipPlacement= 'bottom',
    tooltipText = 'Copied!',
    value = '',
  } = props

  const [copied, setCopied] = useState(false)

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_copy_button'), globalProps(props), className)

  const copy = () => {
    navigator.clipboard.writeText(value)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 1000);
  }

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
    >
      <Tooltip 
          forceOpenTooltip={copied}
          placement={tooltipPlacement}
          showTooltip={false}
          text={tooltipText}
      >
        <Button
            icon='copy'
            onClick={copy}
        >
          { text }
        </Button>
      </Tooltip>
    </div>
  )
}

export default CopyButton


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
  from?: string,
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
    from = '',
    id,
    text= 'Copy',
    tooltipPlacement= 'bottom',
    tooltipText = 'Copied!',
    value = '',
  } = props

  const [copied, setCopied] = useState(false)

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_copy_button_kit'), globalProps(props), className)

  const copy = () => {
    if (!from && !value) {
      return
    }

    if (value) {
      navigator.clipboard.writeText(value)
    } else if (from) {
      const copyElement = document.getElementById(from);
      let copyText = copyElement?.innerText

      if (copyElement instanceof HTMLTextAreaElement || copyElement instanceof HTMLInputElement) {
        copyText = copyElement.value;
      }

      if (copyText) {
        navigator.clipboard.writeText(copyText)
      }
    }

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

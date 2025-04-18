import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'

import Button from '../pb_button/_button'
import Tooltip from '../pb_tooltip/_tooltip'

import usePBCopy from './usePBCopy'

type CopyButtonProps = {
  aria?: { [key: string]: string }
  className?: string
  data?: { [key: string]: string }
  id?: string
  from?: string
  text?: string
  tooltipPlacement?: 'top' | 'right' | 'bottom' | 'left'
  tooltipText?: string
  value?: string
  timeout?: number
}

const CopyButton = (props: CopyButtonProps) => {
  const {
    aria = {},
    className,
    data = {},
    from = '',
    id,
    text= 'Copy',
    timeout = 1000,
    tooltipPlacement= 'bottom',
    tooltipText = 'Copied!',
    value = '',
  } = props

  const [copied, copy] = usePBCopy({ value, from, timeout })

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_copy_button_kit'), globalProps(props), className)

  return (
    <div {...ariaProps}
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
        <Button icon="copy"
            onClick={copy}
        >
          {text}
        </Button>
      </Tooltip>
    </div>
  )
}

export default CopyButton

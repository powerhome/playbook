// @flow

import React from 'react'
import classnames from 'classnames'

import {
  buildAriaProps,
  buildCss,
  buildDataProps,
} from '../utilities/props'

import { globalProps } from '../utilities/globalProps.js'

type TooltipProps = {
  aria?: object,
  children?: React.Node,
  className?: string,
  data?: object,
  id?: string,
  position?: string,
  text?: string,
  tooltipId?: string,
  trigger_element_id?: string,
}

const Tooltip = ({
  aria = {},
  children,
  className,
  data = {},
  id,
  position,
  text,
  tooltipId,
  trigger_element_id,
  ...props
}: TooltipProps) => {
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_tooltip_kit'), className, globalProps(props))

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
    >
      <div
          className="tooltip_tooltip"
          id={tooltipId}
          role="tooltip"
      >
        { text || children }
        <div
            className="arrow"
            id={tooltipId}
        />
      </div>
    </div>
  )
}

export default Tooltip

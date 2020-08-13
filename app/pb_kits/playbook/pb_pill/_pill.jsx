/* @flow */

import React from 'react'

import classnames from 'classnames'
import Title from '../pb_title/_title.jsx'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'

type PillProps = {
  aria?: object,
  className?: string,
  data?: object,
  id?: string,
  text: string,
  variant?: "success" | "warning" | "error" | "info" | "neutral",
}

const Pill = (props: PillProps) => {
  const {
    aria = {},
    className,
    data = {},
    id,
    text,
    variant = 'neutral',
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_pill_kit', variant), className, globalProps(props))

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
    >
      <Title
          className="pb_pill_text"
          size={4}
          text={text}
      />
    </div>
  )
}

export default Pill

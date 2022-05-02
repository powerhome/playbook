/* @flow */

import React from 'react'

import classnames from 'classnames'
import Title from '../pb_title/_title'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { GlobalProps, globalProps } from '../utilities/globalProps'

type PillProps = {
  aria?: {[key: string]: string},
  className?: string,
  data?: {[key: string]: string},
  id?: string,
  text: string,
  variant?: "success" | "warning" | "error" | "info" | "neutral",
  textTransform?: "none" | "lowercase"
} & GlobalProps

const Pill = (props: PillProps) => {
  const {
    aria = {},
    className,
    data = {},
    id,
    text,
    variant = 'neutral',
    textTransform = 'lowercase',
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_pill_kit', variant, textTransform), globalProps(props), className)

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
          tag="div"
          text={text}
      />
    </div>
  )
}

export default Pill

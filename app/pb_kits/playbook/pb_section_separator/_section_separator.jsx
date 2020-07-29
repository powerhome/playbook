/* @flow */
import React from 'react'
import classnames from 'classnames'
import { Caption } from '../'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { systemProps } from '../utilities/systemProps.js'

type SectionSeparatorProps = {
  aria: object,
  className: String,
  dark?: Boolean,
  data: object,
  id: String,
  orientation?: "horizontal" | "vertical",
  text: String,
  variant?: "card" | "background",
}

const SectionSeparator = (props: SectionSeparatorProps) => {
  const {
    aria = {},
    className,
    dark = false,
    data = {},
    id,
    orientation = 'horizontal',
    text,
    variant = 'card',
  } = props
  const themeStyle = dark === true ? '_dark' : ''
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_section_separator_kit', variant, orientation, themeStyle), className, systemProps(props))

  return (

    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
    >
      <span>
        <Caption text={text} />
      </span>
    </div>
  )
}

export default SectionSeparator

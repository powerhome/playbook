/* @flow */
import React from 'react'
import classnames from 'classnames'
import { Caption } from '../'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'

type SectionSeparatorProps = {
  aria: object,
  className: string,
  dark?: boolean,
  data: object,
  id: string,
  orientation?: "horizontal" | "vertical",
  text: string,
  variant?: "card" | "background",
}

const SectionSeparator = (props: SectionSeparatorProps) => {
  const {
    aria = {},
    className,
    data = {},
    id,
    orientation = 'horizontal',
    text,
    variant = 'card',
  } = props
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_section_separator_kit', variant, orientation), globalProps(props), className)

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

/* @flow */
import React from 'react'
import classnames from 'classnames'

import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'

import Caption from '../pb_caption/_caption'

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

      <If condition={text}>
        <span>
          <Caption text={text} />
        </span>
      </If>

    </div>
  )
}

export default SectionSeparator

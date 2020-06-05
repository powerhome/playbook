/* @flow */

import React from 'react'
import classnames from 'classnames'

import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'

import { Body, Title } from '../'
import { spacing } from '../utilities/spacing.js'

type TitleCountProps = {
  align: "center" | "left" | "right",
  aria?: object,
  className?: String,
  count?: Numeric,
  data?: object,
  id?: String,
  title?: String,
  size?: "lg" | "sm",
};

const TitleCount = (props: TitleCountProps) => {
  const {
    align = 'left',
    aria = {},
    className,
    data = {},
    count,
    id,
    title,
    size = 'sm' } = props
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)

  const css = classnames(buildCss('pb_title_count_kit', align, size), className, spacing(props))

  const formatCount = count.toLocaleString()

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={css}
        id={id}
    >
      <Title
          className={title !== undefined ? 'pb_title_count_text' : ''}
          size={size === 'lg' ? 3 : 4}
          text={title}
      />

      <Body color="light">
        <If condition={count}>{formatCount}</If>
      </Body>

    </div>
  )
}

export default TitleCount

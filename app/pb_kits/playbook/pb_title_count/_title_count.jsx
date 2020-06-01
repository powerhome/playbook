/* @flow */

import React from 'react'
import classnames from 'classnames'

import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'

import { Body, Title } from '../'

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

const TitleCount = ({
  align = 'left',
  aria = {},
  className,
  data = {},
  count,
  id,
  title,
  size = 'sm',
}: TitleCountProps) => {
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)

  const css = classnames(
    className,
    buildCss('pb_title_count_kit', align, size)
  )

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

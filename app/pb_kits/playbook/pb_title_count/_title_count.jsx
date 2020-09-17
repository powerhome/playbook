/* @flow */

import React from 'react'
import classnames from 'classnames'

import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'

import { Body, Title } from '../'
import { globalProps } from '../utilities/globalProps.js'

type TitleCountProps = {
  align: "center" | "left" | "right",
  aria?: object,
  className?: string,
  count?: Numeric,
  dark?: boolean,
  data?: object,
  id?: string,
  title?: string,
  size?: "lg" | "sm",
};

const TitleCount = (props: TitleCountProps) => {
  const {
    align = 'left',
    aria = {},
    className,
    dark = false,
    data = {},
    count,
    id,
    title,
    size = 'sm' } = props
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)

  const css = classnames(buildCss('pb_title_count_kit', align, size), className, globalProps(props))

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
          dark={dark}
          size={size === 'lg' ? 3 : 4}
          text={title}
      />

      <Body
          color="light"
          dark={dark}
      >
        <If condition={count}>{formatCount}</If>
      </Body>

    </div>
  )
}

export default TitleCount

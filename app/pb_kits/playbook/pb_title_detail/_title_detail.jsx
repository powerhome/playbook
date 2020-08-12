/* @flow */

import React from 'react'
import classnames from 'classnames'
import { globalProps } from '../utilities/globalProps.js'

import { Body, Title } from '../'

import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'

type TitleDetailProps = {
  align?: "left" | "center" | "right",
  aria?: object,
  className?: string,
  data?: object,
  detail: string,
  id?: string,
  title: string,
}

const TitleDetail = (props: TitleDetailProps) => {
  const { aria = {}, align = 'left', className, data = {}, detail, id, title } = props
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_title_detail_kit', align), globalProps(props), className)

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
    >
      <Title
          size={4}
          text={title}
      />
      <Body
          color="light"
          text={detail}
      />
    </div>
  )
}

export default TitleDetail

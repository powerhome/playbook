/* @flow */

import React from 'react'
import classnames from 'classnames'
import { globalProps } from '../utilities/globalProps.js'

import { Body, Title } from '../'

import { buildCss, buildDataProps } from '../utilities/props'

type TitleDetailProps = {
  align?: "left" | "center" | "right",
  className?: string,
  data?: object,
  detail: string,
  id?: string,
  title: string,
}

const TitleDetail = (props: TitleDetailProps) => {
  const { align = 'left', className, data = {}, detail, id, title } = props
  const dataProps = buildDataProps(data)
  const pbCss = buildCss('pb_title_detail_kit', align)

  return (
    <div
        {...dataProps}
        className={classnames(pbCss, globalProps(props), className)}
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

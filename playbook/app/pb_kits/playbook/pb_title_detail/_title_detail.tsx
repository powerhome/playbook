import React from 'react'
import classnames from 'classnames'

import { GlobalProps, globalProps } from '../utilities/globalProps'
import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'

import Body from '../pb_body/_body'
import Title from '../pb_title/_title'

type TitleDetailProps = {
  align?: "left" | "center" | "right",
  aria?: { [key: string]: string },
  className?: string,
  data?: { [key: string]: string },
  detail: string,
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string,
  title: string,
} & GlobalProps

const TitleDetail = (props: TitleDetailProps) => {
  const {
    align = "left",
    aria = {},
    className,
    data = {},
    detail,
    htmlOptions = {},
    id,
    title,
  } = props
  
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)
  const pbCss = buildCss("pb_title_detail_kit", align)

  return (
    <div
      {...ariaProps}
      {...dataProps}
      {...htmlProps}
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

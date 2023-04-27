import React from 'react'
import classnames from 'classnames'

import { globalProps } from '../utilities/globalProps'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'

import Body from '../pb_body/_body'
import Title from '../pb_title/_title'

type TitleDetailProps = {
  align?: "left" | "center" | "right",
  aria?: { [key: string]: string },
  className?: string,
  data?: { [key: string]: string },
  detail: string,
  id?: string,
  title: string,
}

const TitleDetail = (props: TitleDetailProps) => {
  const { align = 'left', aria = {}, className, data = {}, detail, id, title } = props
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const pbCss = buildCss('pb_title_detail_kit', align)

  return (
    <div
      {...ariaProps}
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

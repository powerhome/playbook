import React from "react"
import classnames from "classnames"

import { buildAriaProps, buildCss, buildDataProps } from "../utilities/props"
import { globalProps } from "../utilities/globalProps"

import Body from "../pb_body/_body"
import Icon from "../pb_icon/_icon"

type LoadingInlineProps = {
  align?: "left" | "center" | "right"
  aria?: { [key: string]: string }
  className?: string
  data?: { [key: string]: string }
  id?: string
}

const LoadingInline = (props: LoadingInlineProps) => {
  const { align = "left", aria = {}, className, data = {}, id } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(
    buildCss(`pb_loading_inline_kit_${align}`),
    globalProps(props),
    className
  )

  return (
    <div {...ariaProps} {...dataProps} className={classes} id={id}>
      <Body color="light">
        <Icon
          aria={{ label: "loading icon" }}
          fixedWidth
          icon="spinner"
          pulse
        />
        {" Loading"}
      </Body>
    </div>
  )
}

export default LoadingInline

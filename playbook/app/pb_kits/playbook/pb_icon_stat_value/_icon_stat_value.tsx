import React from 'react'
import classnames from 'classnames'

import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'
import { globalProps, GlobalProps } from '../utilities/globalProps'

import Body from '../pb_body/_body'
import Caption from '../pb_caption/_caption'
import Flex from '../pb_flex/_flex'
import IconCircle from '../pb_icon_circle/_icon_circle'
import Title from '../pb_title/_title'
import { GenericObject } from '../types'

type IconStatValueProps = {
  aria?: { [key: string]: string },
  className?: string,
  data?: GenericObject,
  dark?: boolean,
  icon: string,
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string,
  orientation?: "vertical" | "horizontal",
  size?: "sm" | "md" | "lg",
  text?: string,
  unit?: string,
  value: number,
  variant?: "default"
    | "royal"
    | "blue"
    | "purple"
    | "teal"
    | "red"
    | "yellow"
    | "orange"
    | "green"
    | "lighter",
} & GlobalProps

const IconStatValue = (props: IconStatValueProps): React.ReactElement => {
  const {
    aria = {},
    className,
    data = {},
    dark = false,
    htmlOptions = {},
    icon,
    id,
    orientation = 'horizontal',
    size = 'sm',
    text = '',
    unit = '',
    value = 0,
    variant = 'lighter',
  } = props
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)
  const classes = classnames(
    buildCss('pb_icon_stat_value_kit', orientation), globalProps(props),
    className
  )
  const titleSize = function(size: "sm" | "md" | "lg") {
    if (size == 'lg') {
      return (
        <Title
            dark={dark}
            size={1}
            tag="span"
            text={`${value}`}
        />
      )
    } else if (size == 'md') {
      return (
        <Title
            dark={dark}
            size={2}
            tag="span"
            text={`${value}`}
        />
      )
    } else {
      return (
        <Title
            dark={dark}
            size={3}
            tag="span"
            text={`${value}`}
        />
      )
    }
  }

  return (
    <div
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        className={classes}
        id={id}
    >
      <IconCircle
          dark={dark}
          icon={icon}
          marginBottom={orientation == 'vertical' ? 'xs' : undefined}
          marginRight={orientation == 'horizontal' ? 'sm' : undefined}
          size={size}
          variant={variant}
      />

      <div>
        <Flex
            align="baseline"
        >
            {titleSize(size)}
          &nbsp;
            <Body
                dark={dark}
                text={unit}
            />
        </Flex>
        <Caption
            dark={dark}
            text={text}
        />
      </div>

    </div>
  )
}

export default IconStatValue

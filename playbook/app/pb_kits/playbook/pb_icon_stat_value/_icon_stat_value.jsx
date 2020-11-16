/* @flow */

import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { Body, Caption, IconCircle, Title, Flex, FlexItem } from '../'
import { globalProps } from '../utilities/globalProps.js'

type IconStatValueProps = {
  aria?: object,
  className?: string,
  data?: object,
  icon: string,
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
    | "green",
}

const IconStatValue = (props: IconStatValueProps) => {
  const {
    aria = {},
    className,
    data = {},
    icon,
    id,
    orientation = 'horizontal',
    size = 'sm',
    text = '',
    unit = '',
    value = 0,
    variant = 'default',
  } = props
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(
    buildCss('pb_icon_stat_value_kit', orientation, size, variant), globalProps(props),
    className
  )
  const titleSize = function(size) {
    if (size == 'lg') {
      return (
        <Title
            size={1}
            text={`${value}`}
        />
      )
    } else if (size == 'md') {
      return (
        <Title
            size={2}
            text={`${value}`}
        />
      )
    } else {
        return (
      <Title
          size={3}
          text={`${value}`}
      />
    )}
  }

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
    >
      <IconCircle
          icon={icon}
          size={size}
          variant={variant}
      />

      <div>
        <Flex
          vertical="bottom"
        >
          <FlexItem>
          {titleSize(size)}
          </FlexItem>
          &nbsp;
          <FlexItem>
            <Body
                text={unit}
            />
          </FlexItem>
        </Flex>
        <Caption text={text} />
      </div>

    </div>
  )
}

export default IconStatValue

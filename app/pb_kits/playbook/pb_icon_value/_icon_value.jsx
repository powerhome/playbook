/* @flow */

import React from 'react'
import classnames from 'classnames'
import { Body, Icon } from '../'

import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'

import { systemProps } from '../utilities/systemProps.js'

type IconValueProps = {
  align?: "left" | "center" | "right",
  aria?: object,
  className?: string,
  data?: object,
  icon: string,
  id?: number,
  text: string,
}

const IconValue = (props: IconValueProps) => {
  const {
    align = 'left',
    aria = {},
    className,
    data = {},
    icon,
    id,
    text,
  } = props
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const pbCss = buildCss('pb_icon_value_kit', align)

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classnames(className, pbCss, systemProps(props))}
        id={id}
    >
      <Body color="light">
        <Icon
            fixedWidth
            icon={icon}
        />
        {text}
      </Body>
    </div>
  )
}

export default IconValue

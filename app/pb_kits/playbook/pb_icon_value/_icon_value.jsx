/* @flow */

import React from 'react'
import classnames from 'classnames'
import {
  Icon,
  Body,
} from '../'

import {
  buildAriaProps,
  buildDataProps,
  buildCss,
} from '../utilities/props'

type IconValueProps = {
  align?: 'left' | 'center' | 'right',
  aria?: object,
  className?: string,
  data?: object,
  icon: string,
  id?: number,
  text: string,
}

const IconValue = ({
  align = 'left',
  aria = {},
  className,
  data = {},
  icon,
  id,
  text,
}: IconValueProps) => {
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const pbCss = buildCss('pb_icon_value_kit', align)

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classnames(className, pbCss)}
        id={id}
    >
      <Body color="light">
        <Icon
            icon={icon}
            fixedWidth
        />
        {text}
      </Body>
    </div>
  )
}

export default IconValue

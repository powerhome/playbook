/* @flow */

import React from 'react'
import classnames from 'classnames'

import { globalProps } from '../utilities/globalProps.js'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'

import Body from '../pb_body/_body'
import Caption from '../pb_caption/_caption'
import Title from '../pb_title/_title'

type CurrencyProps = {
  abbreviate?: boolean,
  align?: 'center' | 'left' | 'right',
  amount: string,
  aria?: object,
  className?: string,
  dark?: boolean,
  data?: object,
  emphasized?: boolean,
  id?: string,
  label?: string,
  size?: 'sm' | 'md' | 'lg',
  symbol?: string,
  variant?: 'default' | 'light' | 'bold',
  unit?: string,
}

const sizes = {
  lg: 1,
  md: 3,
  sm: 4,
}

const Currency = (props: CurrencyProps) => {
  const {
    abbreviate = false,
    align = 'left',
    aria = {},
    amount,
    data = {},
    emphasized = true,
    id,
    unit,
    className,
    label = '',
    size = 'sm',
    symbol = '$',
    variant = 'default',
    dark = false,
  } = props

  const emphasizedClass = emphasized ? '' : '_deemphasized'

  let variantClass
  if (size === 'sm') {
    if (variant === 'light') {
      variantClass = '_light'
    } else if (variant === 'bold') {
      variantClass = '_bold'
    }
  }

  const [whole, decimal = '00'] = amount.split('.')
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(
    buildCss('pb_currency_kit', align, size, { dark }),
    globalProps(props),
    className
  )

  const abbreviatedValue = () => {
    const value = whole.split(',')
    let abbr
    if (value.length === 2) {
      abbr = 'k'
    } else if (value.length === 3) {
      abbr = 'M'
    } else if (value.length === 4) {
      abbr = 'B'
    } else if (value.length === 5) {
      abbr = 'T'
    }
    return value.length === 1 ? `0.${value[0][0]}k` : `${value[0]}.${value[1][0]}${abbr}`
  }

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
    >
      <Caption>{label}</Caption>

      <div className={`pb_currency_wrapper${variantClass || emphasizedClass}`}>
        <Body
            className="dollar_sign"
            color="light"
            dark={dark}
        >
          {symbol}
        </Body>

        <Title
            className="pb_currency_value"
            dark={dark}
            size={sizes[size]}
        >
          {abbreviate ? abbreviatedValue() : whole}
        </Title>

        <Body
            className="unit"
            color="light"
            dark={dark}
        >
          <If condition={unit}>
            {unit}
            <Else />
            {abbreviate ? '' : `.${decimal}`}
          </If>
        </Body>
      </div>
    </div>
  )
}

export default Currency

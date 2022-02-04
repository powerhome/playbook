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

  const getAbbreviatedValue = (arg) => {
    const num = new Intl.NumberFormat('en-US', {
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(whole.split(',').join('')).toString()
    let output
    if (arg === 'amount') {
      output = num.slice(0, -1)
    } else if (arg === 'unit') {
      output = num.slice(-1)
    }
    return output
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
          {abbreviate ? getAbbreviatedValue('amount') : whole}
        </Title>

        <Body
            className="unit"
            color="light"
            dark={dark}
        >
          {abbreviate ? getAbbreviatedValue('unit') : null}
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

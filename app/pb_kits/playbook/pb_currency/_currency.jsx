/* @flow */

import React from 'react'
import classnames from 'classnames'

import { globalProps } from '../utilities/globalProps.js'
import { Body, Caption, Title } from '../'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'

type CurrencyProps = {
  align?: 'center' | 'left' | 'right',
  amount: string,
  aria?: object,
  className?: string,
  dark?: boolean,
  data?: object,
  id?: string,
  label?: string,
  size?: 'sm' | 'md' | 'lg',
  symbol?: string,
  unit?: string,
}

const sizes = {
  lg: 1,
  md: 3,
  sm: 4,
}

const Currency = (props: CurrencyProps) => {
  const {
    align = 'left',
    aria = {},
    amount,
    data = {},
    id,
    unit,
    className,
    label = '',
    size = 'sm',
    symbol = '$',
    dark = false,
  } = props

  const [whole, decimal = '00'] = amount.split('.')
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_currency_kit', align, size, { dark: dark }), className, globalProps(props))

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
    >
      <Caption>{label}</Caption>

      <div className="pb_currency_wrapper">
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
          {`${whole}`}
        </Title>

        <Body
            className="unit"
            color="light"
            dark={dark}
        >
          <If condition={unit}>
            {unit}
            <Else />
            {`.${decimal}`}
          </If>
        </Body>
      </div>
    </div>
  )
}

export default Currency

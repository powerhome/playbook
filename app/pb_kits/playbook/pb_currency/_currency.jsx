/* @flow */

import React from 'react'

import { Body, Caption, Title } from '../'
import { buildCss } from '../utilities/props'

type CurrencyProps = {
  align?: 'left' | 'center' | 'right',
  amount: string,
  className?: string,
  label?: string,
  separator?: '.' | ',',
  size?: 'sm' | 'lg',
  symbol?: string,
}

const sizes = {
  lg: 1,
  sm: 2,
}

const Currency = ({
  align = 'left',
  amount,
  className,
  label = '',
  separator = '.',
  size = 'sm',
  symbol = '$',
}: CurrencyProps) => {
  const [whole, decimal = '00'] = amount.split(separator)

  return (
    <div className={buildCss('pb_currency_kit', align, className)}>
      <Caption>{label}</Caption>

      <div className="pb_currency_wrapper">
        <Body
            className="dollar_sign"
            color="light"
        >
          {symbol}
        </Body>

        <Title
            className="pb_currency_value"
            size={sizes[size]}
        >
          {`${whole}${separator}`}
        </Title>

        <Body
            className="unit"
            color="light"
        >
          {decimal}
        </Body>
      </div>
    </div>
  )
}

export default Currency

/* @flow */

import React from 'react'

import { Body, Caption, Title } from '../'
import { buildCss } from '../utilities/props'

type CurrencyProps = {
  align?: 'left' | 'center' | 'right',
  amount: string,
  unit: string,
  className?: string,
  label?: string,
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
  unit,
  className,
  label = '',
  size = 'sm',
  symbol = '$',
}: CurrencyProps) => {
  const [whole, decimal = '00'] = amount.split('.')

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
          {`${whole}`}
        </Title>

        <Body
            className="unit"
            color="light"
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

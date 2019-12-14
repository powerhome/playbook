/* @flow */

import React from 'react'
import classnames from 'classnames'

import { Body, Caption, Title } from '../'
import { buildCss } from '../utilities/props'

type CurrencyProps = {
  align?: 'left' | 'center' | 'right',
  className: String,
  currencySymbol: String,
  label?: String,
  separator?: '.' | ',',
  size?: 'sm' | 'lg',
  value?: String,
  units?: String,
}

const symbolCSS = (currencySymbol) => {
  return classnames({
    'dollar_sign': currencySymbol === '$',
  })
}

const sizes = {
  lg: 1,
  sm: 2,
}

const Currency = ({
  align = 'left',
  currencySymbol = '$',
  label = '',
  separator = '.',
  size = 'sm',
  units = '00',
  value,
}: CurrencyProps) => (
  <div className={buildCss('pb_currency_kit', align)}>
    <Caption>{label}</Caption>
    <div className='pb_currency_wrapper'>
      <Body className={symbolCSS(currencySymbol)}>{currencySymbol}</Body>
      <Title
          className='pb_currency_value'
          size={sizes[size]}
      >
        {`${value}${separator}`}
      </Title>
      <Body className='unit'>{units}</Body>
    </div>
  </div>
)

export default Currency

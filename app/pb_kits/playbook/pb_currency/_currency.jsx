/* @flow */

import React from 'react'
import classnames from 'classnames'
import { spacing } from '../utilities/spacing.js'
import { Body, Caption, Title } from '../'
import { buildCss } from '../utilities/props'

type CurrencyProps = {
  align?: "left" | "center" | "right",
  amount: string,
  unit: string,
  className?: string,
  label?: string,
  size?: "sm" | "md" | "lg",
  symbol?: string,
  dark?: boolean,
}

const sizes = {
  lg: 1,
  md: 3,
  sm: 4,
}

const Currency = (props: CurrencyProps) => {
  const {
    align = 'left',
    amount,
    unit,
    className,
    label = '',
    size = 'sm',
    symbol = '$',
    dark = false,
  } = props
  const [whole, decimal = '00'] = amount.split('.')

  return (
    <div
        className={classnames(
        buildCss('pb_currency_kit', align, className, { dark: dark }, size),
        spacing(props)
      )}
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

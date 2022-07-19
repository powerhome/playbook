import React from 'react'
import { render, screen } from '../utilities/test-utils'
import Currency from './_currency'

test('abbreviate prop returns proper abbreviated amount', () => {
  render(
    <>
      <Currency
          abbreviate
          amount="3200"
          data={{ testid: 'test-thousands' }}
      />
      <Currency
          abbreviate
          amount="3,200,000"
          data={{ testid: 'test-millions' }}
      />
      <Currency
          abbreviate
          amount="3200000000"
          data={{ testid: 'test-billions' }}
      />
      <Currency
          abbreviate
          amount="3,200,000,000,000"
          data={{ testid: 'test-trillions' }}
      />
    </>
  )

  expect(screen.getByTestId('test-thousands')).toHaveTextContent('$3.2K')
  expect(screen.getByTestId('test-millions')).toHaveTextContent('$3.2M')
  expect(screen.getByTestId('test-billions')).toHaveTextContent('$3.2B')
  expect(screen.getByTestId('test-trillions')).toHaveTextContent('$3.2T')
})

test('decimals matching prop returns decimals as title text', () => {
  render(
    <Currency
        amount="320.20"
        data={{ testid: 'test-decimals-matching' }}
        decimals='matching'
    />
  )

  const currencyKit = screen.getByTestId('test-decimals-matching')
  expect(currencyKit.querySelector('.pb_currency_value')).toHaveTextContent('320.20')
  expect(currencyKit.querySelector('.unit')).toHaveTextContent('')
})

test('decimals default prop returns decimals as body text', () => {
  render(
    <Currency
        amount="320.20"
        data={{ testid: 'test-decimals-default' }}
        decimals='default'
    />
  )

  const currencyKit = screen.getByTestId('test-decimals-default')
  expect(currencyKit.querySelector('.pb_currency_value')).toHaveTextContent('320')
  expect(currencyKit.querySelector('.unit')).toHaveTextContent('.20')
})

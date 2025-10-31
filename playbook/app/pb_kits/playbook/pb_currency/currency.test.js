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


test('commaSeparator prop returns comma separated amount', () => {
  render(
    <Currency
        amount="1234567890"
        commaSeparator
        data={{ testid: 'comma-test' }}
    />
  )
  expect(screen.getByTestId('comma-test')).toHaveTextContent('1,234,567,890')
})

test('commaSeparator prop returns comma separated amount with decimals', () => {
  render(
    <Currency
        amount="1234567890.12"
        commaSeparator
        data={{ testid: 'comma-test-decimals' }}
    />
  )
  expect(screen.getByTestId('comma-test-decimals')).toHaveTextContent('1,234,567,890.12')
})

test('commaSeparator prop returns comma separated amount with decimals="matching"', () => {
  render(
    <Currency
        amount="1234567890.12"
        commaSeparator
        data={{ testid: 'comma-test-decimals-matching' }}
        decimals="matching"
    />
  )
  expect(screen.getByTestId('comma-test-decimals-matching')).toHaveTextContent('1,234,567,890.12')
})

test('handles negative amounts correctly', () => {
  render(
    <>
      <Currency
          amount="-320"
          data={{ testid: 'test-negative-default' }}
      />
      <Currency
          abbreviate
          amount="-3200000"
          data={{ testid: 'test-negative-millions' }}
      />
      <Currency
          amount="-123456.78"
          commaSeparator
          data={{ testid: 'test-negative-comma-decimals' }}
      />
      <Currency
          amount="-400.50"
          data={{ testid: 'test-negative-no-symbol' }}
          symbol=""
      />
      <Currency
          amount="-500.55"
          data={{ testid: 'test-negative-medium-size' }}
          size="md"
      />
    </>
  )

  expect(screen.getByTestId('test-negative-default')).toHaveTextContent('-$320')
  expect(screen.getByTestId('test-negative-millions')).toHaveTextContent('-$3.2M')
  expect(screen.getByTestId('test-negative-comma-decimals')).toHaveTextContent('-$123,456.78')
  expect(screen.getByTestId('test-negative-no-symbol')).toHaveTextContent('-400.50')
  expect(screen.getByTestId('test-negative-medium-size')).toHaveTextContent('$-500.55')
})

test('handles numeric amounts correctly', () => {
  render(
    <>
      <Currency
          amount={320}
          data={{ testid: 'test-numeric-default' }}
      />
      <Currency
          abbreviate
          amount={3200000}
          data={{ testid: 'test-numeric-millions' }}
      />
      <Currency
          amount={123456.78}
          commaSeparator
          data={{ testid: 'test-numeric-comma-decimals' }}
      />
      <Currency
          amount={400.50}
          data={{ testid: 'test-numeric-no-symbol' }}
          symbol=""
      />
      <Currency
          amount={500.55}
          data={{ testid: 'test-numeric-medium-size' }}
          size="md"
      />
      <Currency
          amount={-600.70}
          data={{ testid: 'test-numeric-negative' }}
      />
    </>
  )

  expect(screen.getByTestId('test-numeric-default')).toHaveTextContent('$320')
  expect(screen.getByTestId('test-numeric-millions')).toHaveTextContent('$3.2M')
  expect(screen.getByTestId('test-numeric-comma-decimals')).toHaveTextContent('$123,456.78')
  expect(screen.getByTestId('test-numeric-no-symbol')).toHaveTextContent('400.50')
  expect(screen.getByTestId('test-numeric-medium-size')).toHaveTextContent('$500.55')
  expect(screen.getByTestId('test-numeric-negative')).toHaveTextContent('-$600.70')
})

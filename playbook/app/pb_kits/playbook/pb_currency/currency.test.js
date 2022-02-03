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

  expect(screen.getByTestId('test-thousands')).toHaveTextContent('$3.2k')
  expect(screen.getByTestId('test-millions')).toHaveTextContent('$3.2M')
  expect(screen.getByTestId('test-billions')).toHaveTextContent('$3.2B')
  expect(screen.getByTestId('test-trillions')).toHaveTextContent('$3.2T')
})

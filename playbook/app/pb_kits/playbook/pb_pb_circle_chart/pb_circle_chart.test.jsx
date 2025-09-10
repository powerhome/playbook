import React from 'react'
import { render, screen } from '../utilities/test-utils'

import { PbCircleChart } from '../'


test('generated scaffold test - update me', () => {
  render(<PbCircleChart data={{ testid: 'default' }} />)
  expect(screen.getByTestId('default')).toBeInTheDocument()
})


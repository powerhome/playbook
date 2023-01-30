import React from 'react'
import { render, screen } from '../utilities/test-utils'

import Typeahead from './_typeahead'

test('should be error variant', () => {

  const options = [
    { label: 'Orange', value: '#FFA500' },
    { label: 'Red', value: '#FF0000' },
    { label: 'Green', value: '#00FF00' },
    { label: 'Blue', value: '#0000FF' },
  ]

  render(
    <Typeahead
        error='Please make a valid selection'
        options={options}
    />
  )

  expect(screen.getByText("Select...")).toHaveClass("error")
})

test('should be inline variant', () => {

  const options = [
    { label: 'Orange', value: '#FFA500' },
    { label: 'Red', value: '#FF0000' },
    { label: 'Green', value: '#00FF00' },
    { label: 'Blue', value: '#0000FF' },
  ]

  render(
    <Typeahead
        data={{ testid: 'inline-test' }}
        inline
        options={options}
    />
  )

  const kit = screen.getByTestId('inline-test')
  expect(kit).toHaveClass("inline")
  // expect(screen.getByText("Select...")).toHaveClass("inline")
})

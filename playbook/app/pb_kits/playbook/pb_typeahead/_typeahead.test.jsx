import React from 'react'
import { render, screen } from '../utilities/test-utils'

import Typeahead from './_typeahead'

test('should have error in classname', () => {

  const options = [
    { label: 'Orange', value: '#FFA500' },
    { label: 'Red', value: '#FF0000' },
    { label: 'Green', value: '#00FF00' },
    { label: 'Blue', value: '#0000FF' },
  ]

  render(
    <Typeahead
        error='Please make a valid selection'
        label="Colors"
        options={options}
    />
  )

  expect(screen.getByText("Select...")).toHaveClass("error")
})

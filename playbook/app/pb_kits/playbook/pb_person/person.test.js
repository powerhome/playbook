import React from 'react'

import { render, screen } from '../utilities/test-utils'

import Person from './_person'


test('it renders the component with the value', () => {
  render(
    <Person
        firstName="Kyle"
        lastName="Fadigan"
    />
  )

  const kit = screen.getByText('Kyle')
  expect(kit).toBeTruthy()
})

test('it renders the component with the value', () => {
  render(
    <Person
        firstName="Kyle"
        lastName="Fadigan"
    />
  )

  const kit = screen.getByText('Fadigan')
  expect(kit).toBeTruthy()
})

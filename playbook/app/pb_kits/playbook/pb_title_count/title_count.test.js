import React from 'react'
import { render, screen } from '../utilities/test-utils'

import TitleCount from './_title_count'

test('returns namespaced class name', () => {
  render(
    <TitleCount
        count={35.78}
        data={{ testid: 'primary-test' }}
        title="Appointments"
    />
  )

  const kit = screen.getByTestId('primary-test')
  expect(kit).toHaveClass('pb_title_count_kit_left_sm')
})

test('size variant', () => {
  render(
    <TitleCount
        count={35.78}
        data={{ testid: 'large-test' }}
        size="lg"
        title="Appointments"
    />
  )

  const kit = screen.getByTestId('large-test')
  expect(kit).toHaveClass('pb_title_count_kit_left_lg')
})

test('align variant', () => {
  render(
    <TitleCount
        align="right"
        count={35.78}
        data={{ testid: 'large-test' }}
        title="Appointments"
    />
  )

  const kit = screen.getByTestId('large-test')
  expect(kit).toHaveClass('pb_title_count_kit_right_sm')
})

test('renders count correctly', () => {
  render(
    <TitleCount
        count={35.78}
        title="Appointments"
    />
  )

  const kit = screen.getByText('35.78')
  expect(kit).toBeTruthy()
})

test('renders title correctly', () => {
  render(
    <TitleCount
        count={35.78}
        title="Appointments"
    />
  )

  const kit = screen.getByText('Appointments')
  expect(kit).toBeTruthy()
})
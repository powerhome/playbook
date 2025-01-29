import React from 'react'
import { render, screen } from '../utilities/test-utils'
import User from './_user'
import Caption from "../pb_caption/_caption"

test('subtitle prop adds subtitle text', () => {
  render(
    <User
        data={{ testid: 'test-subtitle' }}
        subtitle='test subtitle'
    />
  )

  expect(screen.getByTestId('test-subtitle')).toHaveTextContent('test subtitle')
})

test('subtitle prop accepts a node', () => {
  const TestCaption = <Caption text='test caption' />

  render(
    <User
        data={{ testid: 'test-subtitle-block' }}
        subtitle={TestCaption}
    />
  )

  expect(screen.getByTestId('test-subtitle-block')).toHaveTextContent('test caption')
})

test('bold prop applies correct styling when false', () => {
  render(
    <User
        bold={false}
        data={{ testid: 'test-bold-false' }}
        name="Anna Black"
    />
  )
  const titleElement = screen.getByText("Anna Black")
  expect(titleElement).toBeInTheDocument()

  expect(titleElement).toHaveClass('pb_title_kit_size_4_thin')
})

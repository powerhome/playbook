import React from 'react'
import { render, screen } from '../utilities/test-utils'

import CircleIconButton from './_circle_icon_button'

test('default test', () => {
  render(
    <CircleIconButton
        data={{ testid: 'default-test' }}
        icon="plus"
    />
  )

  const kit = screen.getByTestId('default-test')

  expect(kit).toHaveClass('pb_circle_icon_button_kit')
})

test('passes loading prop to button', () => {
  render(
    <CircleIconButton
        data={{ testid: 'loading-test' }}
        icon="plus"
        loading
    />
  )

  const kit = screen.getByTestId('loading-test')
  const button = kit.querySelector('.pb_button_kit_primary_inline_enabled_loading')
  
  expect(button).toBeInTheDocument()
})

test('adds small class when size is small', () => {
  render(
    <CircleIconButton
        data={{ testid: 'small-size-test' }}
        icon="plus"
        size="small"
    />
  )

  const kit = screen.getByTestId('small-size-test')
  
  expect(kit).toHaveClass('pb_circle_icon_button_kit small')
})

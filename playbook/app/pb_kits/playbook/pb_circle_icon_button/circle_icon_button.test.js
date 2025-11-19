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
  const button = kit.querySelector('.pb_button_kit.pb_button_primary.pb_button_inline.pb_button_enabled.pb_button_loading')
  
  expect(button).toBeInTheDocument()
})

test('adds size_small class when size is sm', () => {
  render(
    <CircleIconButton
        data={{ testid: 'small-size-test' }}
        icon="plus"
        size="sm"
    />
  )

  const kit = screen.getByTestId('small-size-test')
  
  expect(kit).toHaveClass('pb_circle_icon_button_kit size_small')
})

test('adds disabled class when disabled is true', () => {
  render(
    <CircleIconButton
        data={{ testid: 'disabled-test' }}
        disabled
        icon="plus"
    />
  )

  const kit = screen.getByTestId('disabled-test')
  const button = kit.querySelector('.pb_button_kit.pb_button_primary.pb_button_inline.pb_button_disabled')
  
  expect(button).toBeInTheDocument()
})

test('Disables button when disabled is true', () => {
  render(
    <CircleIconButton
        data={{ testid: 'disabled-attribute-test' }}
        disabled
        icon="plus"
    />
  )

  const kit = screen.getByTestId('disabled-attribute-test')
  const button = kit.querySelector('button')
  
  expect(button).toBeDisabled()
})

test('Disables link button when disabled is true', () => {
  render(
    <CircleIconButton
        data={{ testid: 'disabled-attribute-test' }}
        disabled
        icon="plus"
        variant="link"
    />
  )

  const kit = screen.getByTestId('disabled-attribute-test')
  const button = kit.querySelector('button')
  
  expect(button).toBeDisabled()
})

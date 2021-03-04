import React from 'react'
import { render, screen } from '../utilities/test-utils'

import CircleIconButton from './_circle_icon_button'

test('default test', () => {
  render(
    <CircleIconButton
        buttonData={{ testid: 'kit-button' }}
        data={{ testid: 'kit' }}
        icon="plus"
    />
  )

  const kit = screen.getByTestId('kit')
  const kitButton = screen.getByTestId('kit-button')

  expect(kit).toHaveClass('pb_circle_icon_button_kit')
  expect(kitButton).toHaveClass('pb_button_kit_primary_inline_enabled')
})

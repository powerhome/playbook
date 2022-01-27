import React from 'react'
import { render, screen } from '../utilities/test-utils'

import { Button, ButtonToolbar } from '../'

test('default test', () => {
  render(
    <ButtonToolbar
        data={{ testid: 'default-test' }}
    >
      <Button
          data={{ testid: 'child-button' }}
          text="Test"
      />
    </ButtonToolbar>
  )

  const kit   = screen.getByTestId('default-test')
  const child = screen.getByTestId('child-button')

  expect(kit).toHaveClass('pb_button_toolbar_kit_horizontal_primary')
  expect(kit).toContainElement(child)
  expect(child).toHaveClass('pb_button_kit_primary_inline_enabled')
})

test('variant and orientation props', () => {
  render(
    <ButtonToolbar
        data={{ testid: 'second-test' }}
        orientation="vertical"
        variant="secondary"
    >
      <Button
          data={{ testid: 'child-button' }}
          text="Create"
          variant="secondary"
      />
    </ButtonToolbar>
  )

  const kit   = screen.getByTestId('second-test')
  const child = screen.getByTestId('child-button')

  expect(kit).toHaveClass('pb_button_toolbar_kit_vertical_secondary')
  expect(child).toHaveClass('pb_button_kit_secondary_inline_enabled')
})

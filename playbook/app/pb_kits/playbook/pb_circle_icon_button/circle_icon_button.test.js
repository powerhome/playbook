
import React from 'react'
import { render, screen } from '../utilities/test-utils'

import CircleIconButton from './_circle_icon_button'

test('default test', () => {
  render(
    <CircleIconButton
        data={{ testid: 'default-test' }}
    />
  )

  const kit   = screen.getByTestId('default-test')

  expect(kit).toHaveClass('pb_circle_icon_button_kit')
  // expect(kit).toHaveAttribute('type', htmlType)
  // expect(kit).toHaveAttribute('value', value)
  // expect(content).toHaveTextContent(text)
})

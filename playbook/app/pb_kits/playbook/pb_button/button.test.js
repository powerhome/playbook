
import React from 'react'
import { render, screen } from '../utilities/test-utils'

import Button from './_button'

const htmlType = 'submit',
  link = 'https://www.google.com',
  text = 'Button Text',
  value = '1234'

test('loads the given image url and name', () => {
  render(
    <Button
        data={{ testid: 'primary-test' }}
        htmlType={htmlType}
        link={link}
        text={text}
        value={value}
    />
  )

  const kit      = screen.getByTestId('primary-test')

  expect(kit).toHaveClass('pb_button_kit_primary_inline_enabled')
  expect(kit).toHaveAttribute('type', htmlType)
  expect(kit).toHaveAttribute('href', link)
  expect(kit).toHaveAttribute('value', value)
  // expect(kit).tagName('A')
})

test('loads the given image url and name', () => {
  render(
    <Button
        data={{ testid: 'variant-test' }}
        variant="secondary"
    />
  )

  const kit      = screen.getByTestId('variant-test')

  expect(kit).toHaveClass('pb_button_kit_secondary_inline_enabled')
  expect(kit).toHaveAttribute('type', 'button')
})

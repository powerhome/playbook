
import React from 'react'
import { appendAlert, fireEvent, render, screen, waitFor } from '../utilities/test-utils'

import Button from './_button'

// Primary Test Variables
const htmlType = 'submit',
  text = 'Button Text',
  value = '1234'

test('passes type, text, and value props to button', () => {
  render(
    <>
      <Button
          data={{ testid: 'primary-test' }}
          htmlType={htmlType}
          text={text}
          value={value}
      />
    </>
  )

  const kit = screen.getByTestId('primary-test')
  const content  = screen.getByText(text)

  expect(kit).toHaveClass('pb_button_kit_primary_inline_enabled')
  expect(kit).toHaveAttribute('type', htmlType)
  expect(kit).toHaveAttribute('value', value)
  expect(content).toHaveTextContent(text)
})

// Link Test Variables
const link = 'https://www.google.com'

test('adds link to button', () => {
  render(
    <Button
        data={{ testid: 'link-test' }}
        link={link}
    />
  )

  const kit = screen.getByTestId('link-test')

  expect(kit).toHaveAttribute('href', link)
})

test('button with secondary variant', () => {
  render(
    <Button
        data={{ testid: 'variant-test' }}
        variant="secondary"
    />
  )

  const kit = screen.getByTestId('variant-test')

  expect(kit).toHaveClass('pb_button_kit_secondary_inline_enabled')
  expect(kit).toHaveAttribute('type', 'button')
})

test('disable prop', () => {
  render(
    <Button
        data={{ testid: 'disable-test' }}
        disabled
    />
  )

  const kit = screen.getByTestId('disable-test')

  expect(kit).toBeDisabled()
})

test('click event', async () => {
  render(
    <Button
        data={{ testid: 'click-test' }}
        onClick={() => appendAlert('clicked button!')}
    />
  )

  const kit = screen.getByTestId('click-test')

  fireEvent.click(kit)

  await waitFor(() => screen.getByText('clicked button!'))

  expect(screen.getByText('clicked button!')).toBeInTheDocument()
})

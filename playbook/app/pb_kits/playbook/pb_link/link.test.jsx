import React from 'react'
import { ensureAccessible, renderKit, render, screen } from '../utilities/test-utils'

import { Link } from 'playbook-ui'

const link = 'https://www.google.com'

const props = {
  data: { testid: 'default' },
  href: link,
}

test('returns namespaced class name', () => {
  const kit = renderKit(Link , props)
  expect(kit).toBeInTheDocument()
  expect(kit).toHaveClass('pb_link_kit')
  expect(kit).toHaveAttribute('href', link)
})

it("should be accessible", async () => {
  ensureAccessible(Link, props)
})

test('with colors', () => {
  ['default', 'body', 'muted', 'destructive'].forEach((color) => {
    const testId = `colors-test-${color}`
    render(
      <Link
          color={color}
          data={{ testid: testId }}
          text="Test colors"
      />
    )

    const kit = screen.getByTestId(testId)
    expect(kit).toHaveClass(`pb_link_kit_${color}`)
  })
})

test('disable prop', () => {
  render(
      <Link
          data={{ testid: 'disable-test' }}
          disabled
      />
  )

  const kit = screen.getByTestId('disable-test')

  expect(kit).toHaveClass('pb_link_kit_disabled')
})

test('underline prop', () => {
  render(
      <Link
          data={{ testid: 'underline-test' }}
          underline
      />
  )

  const kit = screen.getByTestId('underline-test')

  expect(kit).toHaveClass('pb_link_kit_underline')
})

test('adds icon', () => {
  render(
      <Link
          data={{ testid: 'icon-test' }}
          icon="arrow-up-right-from-square"
      />
  )

  const kit = screen.getByTestId('icon-test')

  const icon = kit.querySelector('.pb_icon_kit')
  expect(icon).toBeInTheDocument();
})

test('adds icon right', () => {
  render(
      <Link
          data={{ testid: 'icon-right-test' }}
          iconRight="chevron-right"
      />
  )

  const kit = screen.getByTestId('icon-right-test')

  const icon = kit.querySelector('.pb_icon_kit')
  expect(icon).toBeInTheDocument();
})

import React from 'react'
import { render, screen } from '../utilities/test-utils'

import Detail from './_detail'

test('returns namespaced class name', () => {
  render(
    <Detail
        data={{ testid: 'primary-test' }}
        text="Test class name"
    />
  )

  const kit = screen.getByTestId('primary-test')
  expect(kit).toHaveClass('pb_detail_kit_light')
})

test('with colors', () => {
  ['light', 'default', 'lighter', 'link', 'success', 'error'].forEach((color) => {
    const testId = `colors-test-${color}`

    render(
      <Detail
          color={color}
          data={{ testid: testId }}
          text="Test colors"
      />
    )

    const kit = screen.getByTestId(testId)
    expect(kit).toHaveClass(`pb_detail_kit_${color}`)
  })
})

test('bold font-weight should be 600', () => {
  render(
    <Detail
        bold
        data={{ testid: 'primary-test' }}
        text="Test bold prop"
    />
  )

  const kit = screen.getByTestId('primary-test')
  expect(kit).toHaveClass("bold")
})

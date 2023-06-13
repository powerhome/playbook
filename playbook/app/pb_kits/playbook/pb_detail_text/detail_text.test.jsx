import React from 'react'
import { render, screen } from '../utilities/test-utils'

import DetailText from './_detail_text'

test('returns namespaced class name', () => {
  render(
    <DetailText
        data={{ testid: 'primary-test' }}
        text="Test colors"
    />
  )

  const kit = screen.getByTestId('primary-test')
  expect(kit).toHaveClass('pb_detail_text_kit_light')
})

test('with colors', () => {
  ['light', 'default', 'lighter', 'link', 'success', 'error'].forEach((color) => {
    const testId = `colors-test-${color}`

    render(
      <DetailText
          color={color}
          data={{ testid: testId }}
          text="Test colors"
      />
    )

    const kit = screen.getByTestId(testId)
    expect(kit).toHaveClass(`pb_detail_text_kit_${color}`)
  })
})

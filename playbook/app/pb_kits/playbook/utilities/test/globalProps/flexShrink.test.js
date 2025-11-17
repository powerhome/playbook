import React from 'react'
import { render, screen } from '../../test-utils'

import Body from '../../../pb_body/_body'
import { SCREEN_SIZES } from '../../test-utils'

const testSubject = 'body'

test('Global Props: Returns ordinal suffixed class name', () => {
  for(let x = 0, y = 2; x < y; ++x) {
    const testId = `${testSubject}-${x}`
    render(
      <Body
          data={{ testid: testId }}
          flexShrink={x}
          text="Hi"
      />
    )
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveClass(`flex_shrink_${x}`)

    SCREEN_SIZES.forEach((size) => {
      const testId = `${testSubject}-${x}-${size}`
      render(
        <Body
            data={{ testid: testId }}
            flexShrink={{ [size]: x }}
            text="Hi"
        />
      )
      const kit = screen.getByTestId(testId)
      expect(kit).toHaveClass(`flex_shrink_${size}_${x}`)
    })
  }
})

test('Global Props: returns proper class name with default key', () => {
  const testId = `${testSubject}-default-responsive`
  render(
    <Body
        data={{ testid: testId }}
        flexShrink={{ default: 0, xs: 1, sm: 0, md: 1 }}
        text="Hi"
    />
  )
  const kit = screen.getByTestId(testId)
  // Should have base class for default value
  expect(kit).toHaveClass(`flex_shrink_0`)
  // Should have responsive classes for screen sizes
  expect(kit).toHaveClass(`flex_shrink_xs_1`)
  expect(kit).toHaveClass(`flex_shrink_sm_0`)
  expect(kit).toHaveClass(`flex_shrink_md_1`)
})

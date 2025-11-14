import React from 'react'
import { render, screen } from '../../test-utils'

import Body from '../../../pb_body/_body'
import { camelToSnakeCase } from '../../../utilities/text'
import { SCREEN_SIZES } from '../../test-utils'

const testSubject = 'body'

test('Global Props: returns proper class name', () => {
  const propValues = ["start", "center", "end", "stretch", "baseline", "auto"]
  for(let x = 0, y = propValues.length; x < y; ++x) {
    const testId = `${testSubject}-${propValues[x]}`
    render(
      <Body
          alignSelf={`${propValues[x]}`}
          data={{ testid: testId }}
          text="Hi"
      />
    )
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveClass(`align_self_${camelToSnakeCase(propValues[x])}`)

    SCREEN_SIZES.forEach((size) => {
      const testId = `${testSubject}-${propValues[x]}-${size}`
      render(
        <Body
            alignSelf={{ [size]: propValues[x] }}
            data={{ testid: testId }}
            text="Hi"
        />
      )
      const kit = screen.getByTestId(testId)
      expect(kit).toHaveClass(`align_self_${size}_${camelToSnakeCase(propValues[x])}`)
    })
  }
})

test('Global Props: returns proper class name with default key', () => {
  const testId = `${testSubject}-default-responsive`
  render(
    <Body
        alignSelf={{ default: "end", xs: "center", sm: "end", md: "center" }}
        data={{ testid: testId }}
        text="Hi"
    />
  )
  const kit = screen.getByTestId(testId)
  // Should have base class for default value
  expect(kit).toHaveClass(`align_self_end`)
  // Should have responsive classes for screen sizes
  expect(kit).toHaveClass(`align_self_xs_center`)
  expect(kit).toHaveClass(`align_self_sm_end`)
  expect(kit).toHaveClass(`align_self_md_center`)
})

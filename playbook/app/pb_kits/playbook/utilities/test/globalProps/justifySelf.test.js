import React from 'react'
import { render, screen } from '../../test-utils'

import Body from '../../../pb_body/_body'
import { camelToSnakeCase } from '../../text'
import { SCREEN_SIZES } from '../../test-utils'

const testSubject = 'body'

test('Global Props: returns proper class name', () => {
  const propValues = ["start", "center", "end", "auto", "stretch"]
  for(let x = 0, y = propValues.length; x < y; ++x) {
    const testId = `${testSubject}-${propValues[x]}`
    render(
      <Body
          data={{ testid: testId }}
          justifySelf={`${propValues[x]}`}
          text="Hi"
      />
    )
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveClass(`justify_self_${camelToSnakeCase(propValues[x])}`)

    SCREEN_SIZES.forEach((size) => {
      const testId = `${testSubject}-${propValues[x]}-${size}`
      render(
        <Body
            data={{ testid: testId }}
            justifySelf={{ [size]: propValues[x] }}
            text="Hi"
        />
      )
      const kit = screen.getByTestId(testId)
      expect(kit).toHaveClass(`justify_self_${size}_${camelToSnakeCase(propValues[x])}`)
    })
  }
})

test('Global Props: returns proper class name with default key', () => {
  const testId = `${testSubject}-default-responsive`
  render(
    <Body
        data={{ testid: testId }}
        justifySelf={{ default: "end", xs: "start", sm: "end", md: "center" }}
        text="Hi"
    />
  )
  const kit = screen.getByTestId(testId)
  // Should have base class for default value
  expect(kit).toHaveClass(`justify_self_end`)
  // Should have responsive classes for screen sizes
  expect(kit).toHaveClass(`justify_self_xs_start`)
  expect(kit).toHaveClass(`justify_self_sm_end`)
  expect(kit).toHaveClass(`justify_self_md_center`)
})

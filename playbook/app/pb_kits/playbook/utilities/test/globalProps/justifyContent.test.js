import React from 'react'
import { render, screen } from '../../test-utils'

import Body from '../../../pb_body/_body'
import { camelToSnakeCase } from '../../text'
import { SCREEN_SIZES } from '../../test-utils'

const testSubject = 'body'

test('Global Props: returns proper class name', () => {
  const propValues = ["start", "center", "end", "spaceBetween", "spaceAround", "spaceEvenly"]
  for(let x = 0, y = propValues.length; x < y; ++x) {
    const testId = `${testSubject}-${propValues[x]}`
    render(
      <Body
          data={{ testid: testId }}
          justifyContent={`${propValues[x]}`}
          text="Hi"
      />
    )
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveClass(`justify_content_${camelToSnakeCase(propValues[x])}`)

    SCREEN_SIZES.forEach((size) => {
      const testId = `${testSubject}-${propValues[x]}-${size}`
      render(
        <Body
            data={{ testid: testId }}
            justifyContent={{ [size]: propValues[x] }}
            text="Hi"
        />
      )
      const kit = screen.getByTestId(testId)
      expect(kit).toHaveClass(`justify_content_${size}_${camelToSnakeCase(propValues[x])}`)
    })
  }
})

test('Global Props: returns proper class name with default key', () => {
  const testId = `${testSubject}-default-responsive`
  render(
    <Body
        data={{ testid: testId }}
        justifyContent={{ default: "spaceBetween", xs: "start", sm: "spaceBetween", md: "start" }}
        text="Hi"
    />
  )
  const kit = screen.getByTestId(testId)
  // Should have base class for default value
  expect(kit).toHaveClass(`justify_content_space_between`)
  // Should have responsive classes for screen sizes
  expect(kit).toHaveClass(`justify_content_xs_start`)
  expect(kit).toHaveClass(`justify_content_sm_space_between`)
  expect(kit).toHaveClass(`justify_content_md_start`)
})

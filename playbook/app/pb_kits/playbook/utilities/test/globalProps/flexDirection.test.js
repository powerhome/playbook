import React from 'react'
import { render, screen } from '../../test-utils'

import Body from '../../../pb_body/_body'
import { camelToSnakeCase } from '../../../utilities/text'
import { SCREEN_SIZES } from '../../test-utils'

const testSubject = 'body'

test('Global Props: returns proper class name', () => {
  const propValues = ["row", "column", "columnReverse"]
  for(let x = 0, y = propValues.length; x < y; ++x) {
    const testId = `${testSubject}-${propValues[x]}`
    render(
      <Body
          data={{ testid: testId }}
          flexDirection={`${propValues[x]}`}
          text="Hi"
      />
    )
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveClass(`flex_direction_${camelToSnakeCase(propValues[x])}`)

    SCREEN_SIZES.forEach((size) => {
      const testId = `${testSubject}-${propValues[x]}-${size}`
      render(
        <Body
            data={{ testid: testId }}
            flexDirection={{ [size]: propValues[x] }}
            text="Hi"
        />
      )
      const kit = screen.getByTestId(testId)
      expect(kit).toHaveClass(`flex_direction_${size}_${camelToSnakeCase(propValues[x])}`)
    })
  }
})

test('Global Props: returns proper class name with default key', () => {
  const testId = `${testSubject}-default-responsive`
  render(
    <Body
        data={{ testid: testId }}
        flexDirection={{ default: "column", xs: "row", sm: "column", md: "row" }}
        text="Hi"
    />
  )
  const kit = screen.getByTestId(testId)
  // Should have base class for default value
  expect(kit).toHaveClass(`flex_direction_column`)
  // Should have responsive classes for screen sizes
  expect(kit).toHaveClass(`flex_direction_xs_row`)
  expect(kit).toHaveClass(`flex_direction_sm_column`)
  expect(kit).toHaveClass(`flex_direction_md_row`)
})

import React from 'react'
import { render, screen } from '../../test-utils'

import Body from '../../../pb_body/_body'
import { SCREEN_SIZES } from '../../test-utils'

const testSubject = 'body'

test('Global Props: Returns ordinal suffixed class name', () => {
  for(let x = 0, y = 13; x < y; ++x) {
    const testId = `${testSubject}-${x}`
    render(
      <Body
          data={{ testid: testId }}
          flex={`${x}`}
          text="Hi"
      />
    )
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveClass(`flex_${x}`)

    SCREEN_SIZES.forEach((size) => {
      const testId = `${testSubject}-${x}-${size}`
      render(
        <Body
            data={{ testid: testId }}
            flex={{ [size]: x }}
            text="Hi"
        />
      )
      const kit = screen.getByTestId(testId)
      expect(kit).toHaveClass(`flex_${size}_${x}`)
    })
  }
})

test('Global Props: returns proper class name', () => {
  const propValues = ["auto", "initial", "none"]
  for(let x = 0, y = propValues.length; x < y; ++x) {
    const testId = `${testSubject}-${propValues[x]}`
    render(
      <Body
          data={{ testid: testId }}
          flex={`${propValues[x]}`}
          text="Hi"
      />
    )
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveClass(`flex_${propValues[x]}`)

    SCREEN_SIZES.forEach((size) => {
      const testId = `${testSubject}-${propValues[x]}-${size}`
      render(
        <Body
            data={{ testid: testId }}
            flex={{ [size]: propValues[x] }}
            text="Hi"
        />
      )
      const kit = screen.getByTestId(testId)
      expect(kit).toHaveClass(`flex_${size}_${propValues[x]}`)
    })
  }
})

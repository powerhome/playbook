import React from 'react'
import { render, screen } from '../../test-utils'

import Body from '../../../pb_body/_body'
import { camelToSnakeCase } from '../../../utilities/text'
import { SCREEN_SIZES } from '../../test-utils'

const testSubject = 'body'

test('Global Props: returns proper class name', () => {
  const propValues = ["wrap", "nowrap", "wrapReverse"]
  for(let x = 0, y = 3; x < y; ++x) {
    const testId = `${testSubject}-${propValues[x]}`
    render(
      <Body
          data={{ testid: testId }}
          flexWrap={`${propValues[x]}`}
          text="Hi"
      />
    )
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveClass(`flex_wrap_${camelToSnakeCase(propValues[x])}`)

    SCREEN_SIZES.forEach((size) => {
      const testId = `${testSubject}-${propValues[x]}-${size}`
      render(
        <Body
            data={{ testid: testId }}
            flexWrap={{ [size]: propValues[x] }}
            text="Hi"
        />
      )
      const kit = screen.getByTestId(testId)
      expect(kit).toHaveClass(`flex_wrap_${size}_${camelToSnakeCase(propValues[x])}`)
    })
  }
})

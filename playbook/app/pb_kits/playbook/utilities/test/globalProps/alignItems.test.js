import React from 'react'
import { render, screen } from '../../test-utils'

import Body from '../../../pb_body/_body'
import { camelToSnakeCase } from '../../../utilities/text'
import { SCREEN_SIZES } from '../../test-utils'

const testSubject = 'body'

test('Global Props: returns proper class name', () => {
  const propValues = ["start", "center", "end", "baseline", "stretch", "flexStart", "flexEnd"]
  for(let x = 0, y = propValues.length; x < y; ++x) {
    const testId = `${testSubject}-${propValues[x]}`
    render(
      <Body
          alignItems={`${propValues[x]}`}
          data={{ testid: testId }}
          text="Hi"
      />
    )
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveClass(`align_items_${camelToSnakeCase(propValues[x])}`)
    SCREEN_SIZES.forEach((size) => {
      const testId = `${testSubject}-${propValues[x]}-${size}`
      render(
        <Body
            alignItems={{ [size]: propValues[x] }}
            data={{ testid: testId }}
            text="Hi"
        />
      )
      const kit = screen.getByTestId(testId)
      expect(kit).toHaveClass(`align_items_${size}_${camelToSnakeCase(propValues[x])}`)
    })
  }
})

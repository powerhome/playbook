import React from 'react'
import { render, screen } from '../../test-utils'

import Body from '../../../pb_body/_body'
import { SCREEN_SIZES } from '../../test-utils'

const testSubject = 'body'

test('Global Props: Returns ordinal suffixed class name', () => {
  for(let x = 1, y = 13; x < y; ++x) {
    const testId = `${testSubject}-${x}`
    render(
      <Body
          data={{ testid: testId }}
          order={`${x}`}
          text="Hi"
      />
    )
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveClass(`flex_order_${x}`)

    SCREEN_SIZES.forEach((size) => {
      const testId = `${testSubject}-${x}-${size}`
      render(
        <Body
            data={{ testid: testId }}
            order={{ [size]: x }}
            text="Hi"
        />
      )
      const kit = screen.getByTestId(testId)
      expect(kit).toHaveClass(`flex_order_${size}_${x}`)
    })
  }
})

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
          flexGrow={x}
          text="Hi"
      />
    )
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveClass(`flex_grow_${x}`)

    SCREEN_SIZES.forEach((size) => {
      const testId = `${testSubject}-${x}-${size}`
      render(
        <Body
            data={{ testid: testId }}
            flexGrow={{ [size]: x }}
            text="Hi"
        />
      )
      const kit = screen.getByTestId(testId)
      expect(kit).toHaveClass(`flex_grow_${size}_${x}`)
    })
  }
})

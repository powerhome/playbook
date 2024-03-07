import React from 'react'
import { render, screen } from '../../test-utils'

import Body from '../../../pb_body/_body'

const testSubject = 'body'

test('Global Props: Returns corrrect truncate class name', () => {
  for(let x = 1, y = 5; x <= y; ++x) {
    const testId = `${testSubject}-${x}`
    render(
      <Body
          data={{ testid: testId }}
          text="Hi"
          truncate={`${x}`}
      />
    )
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveClass(`truncate_${x}`)
  }
})

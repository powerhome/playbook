import React from 'react'
import { render, screen } from '../utilities/test-utils'
import { Dialog } from '../'

/* See these resources for more testing info:
  - https://github.com/testing-library/jest-dom#usage for useage and examples
  - https://jestjs.io/docs/en/using-matchers
*/

test('generated scaffold test - update me', () => {
  const testId = 'test1'

  render(
    <Dialog
        data={{ testid: testId }}
    />
  )

  const kit = screen.getByTestId(testId)
  expect(kit).toBeInTheDocument()
})

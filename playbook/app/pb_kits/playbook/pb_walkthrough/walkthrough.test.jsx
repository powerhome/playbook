/* eslint-disable no-unused-vars */
import { ensureAccessible, render, renderKit, screen } from '../utilities/test-utils'
import React from 'react'
import { Walkthrough } from 'playbook-ui'

/* See these resources for more testing info:
  - https://github.com/testing-library/jest-dom#usage for useage and examples
  - https://jestjs.io/docs/en/using-matchers
*/

const testId = 'walkthroughKitTest',
  kitClass = 'pb_walkthrough'

test('expect kit to exist', () => {
  const props = {
    data: { testid: testId },
  }

  const kit = renderKit(Walkthrough, props)
  expect(kit).toBeInTheDocument()
  expect(kit).toHaveClass(kitClass)
})

test('returns namespaced class name', () => {
  render(
    <Walkthrough
        className="additional_class"
        data={{ testid: testId }}
    />
  )

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass('additional_class')
})

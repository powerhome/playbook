import React from 'react'
import { render, screen } from '../utilities/test-utils'

import { Container } from 'playbook-ui'

/* See these resources for more testing info:
  - https://github.com/testing-library/jest-dom#usage for useage and examples
  - https://jestjs.io/docs/en/using-matchers
*/

test('Container renders with default props', () => {
  const props = {
    children: 'Container Content'
  }

  render(<Container {...props}>{props.children}</Container>)
  expect(screen.getByText(props.children)).toBeInTheDocument()
})

test('Container renders with custom tag', () => {
  const props = {
    tag: 'span',
    children: 'Container Content'
  }

  render(<Container {...props}>{props.children}</Container>)
  expect(screen.getByText(props.children)).toBeInTheDocument()
})
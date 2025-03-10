import React from 'react'
import { render, screen } from '../utilities/test-utils'

import { EmptyState } from 'playbook-ui'


test('returns namespaced class name', () => {
  render(
    <EmptyState
        data={{ testid: 'primary-test' }}
        text="some text"
    />
  )

  const kit = screen.getByTestId('primary-test')
  expect(kit).toHaveClass('pb_empty_state_kit')
})
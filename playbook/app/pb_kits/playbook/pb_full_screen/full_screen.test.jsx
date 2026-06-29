import React from 'react'
import { fireEvent, render, screen } from '../utilities/test-utils'

import { FullScreen } from 'playbook-ui'

/* See these resources for more testing info:
  - https://github.com/testing-library/jest-dom#usage for useage and examples
  - https://jestjs.io/docs/en/using-matchers
*/

test('generated scaffold test - update me', () => {
  const props = {
    data: { testid: 'default' }
  }

  render(<FullScreen {...props} />)
    expect(screen.getByTestId('default')).toBeInTheDocument()
})

test('stickyHeader is true by default', () => {
  render(
    <FullScreen
        data={{ testid: 'default' }}
        headerText="Fullscreen"
        trigger={({ onClick }) => <button onClick={onClick}>Open</button>}
    >
      <div>Content</div>
    </FullScreen>
  )

  fireEvent.click(screen.getByText('Open'))

  expect(document.querySelector('.fullscreen-header')).toHaveClass('fullscreen-header-sticky')
})

test('stickyHeader can be disabled', () => {
  render(
    <FullScreen
        data={{ testid: 'default' }}
        headerText="Fullscreen"
        stickyHeader={false}
        trigger={({ onClick }) => <button onClick={onClick}>Open</button>}
    >
      <div>Content</div>
    </FullScreen>
  )

  fireEvent.click(screen.getByText('Open'))

  expect(document.querySelector('.fullscreen-header')).not.toHaveClass('fullscreen-header-sticky')
})

test('contentPadding is lg by default', () => {
  render(
    <FullScreen
        data={{ testid: 'default' }}
        trigger={({ onClick }) => <button onClick={onClick}>Open</button>}
    >
      <div>Content</div>
    </FullScreen>
  )

  fireEvent.click(screen.getByText('Open'))

  expect(document.querySelector('.fullscreen-content')).toHaveClass('p_lg')
})

test('contentPadding can be customized', () => {
  render(
    <FullScreen
        contentPadding="sm"
        data={{ testid: 'default' }}
        trigger={({ onClick }) => <button onClick={onClick}>Open</button>}
    >
      <div>Content</div>
    </FullScreen>
  )

  fireEvent.click(screen.getByText('Open'))

  expect(document.querySelector('.fullscreen-content')).toHaveClass('p_sm')
})

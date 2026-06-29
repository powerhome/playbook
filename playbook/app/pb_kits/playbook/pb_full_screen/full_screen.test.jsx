import React from 'react'
import { fireEvent, render, screen } from '../utilities/test-utils'

import { FullScreen, useFullScreen } from 'playbook-ui'

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

test('can be controlled by useFullScreen from an external trigger', () => {
  const ExternalTriggerExample = () => {
    const { isFullscreen, enter, exit } = useFullScreen()

    return (
      <>
        <div data-testid="toolbar">
          <button onClick={enter}>Open from toolbar</button>
        </div>
        <FullScreen
            data={{ testid: 'default' }}
            headerText="Fullscreen"
            isFullscreen={isFullscreen}
            onClose={exit}
        >
          <div>Content</div>
        </FullScreen>
      </>
    )
  }

  render(<ExternalTriggerExample />)

  expect(screen.getByTestId('toolbar')).toBeInTheDocument()
  expect(document.querySelector('.fullscreen-overlay')).not.toBeInTheDocument()

  fireEvent.click(screen.getByText('Open from toolbar'))

  expect(document.querySelector('.fullscreen-overlay')).toBeInTheDocument()
  expect(document.querySelector('.fullscreen-content')).toHaveTextContent('Content')

  fireEvent.click(document.querySelector('.fullscreen-close-button'))

  expect(document.querySelector('.fullscreen-overlay')).not.toBeInTheDocument()
})

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
  expect(document.querySelector('.fullscreen-content')).toHaveClass('fullscreen-content-sticky')
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
  expect(document.querySelector('.fullscreen-content')).not.toHaveClass('fullscreen-content-sticky')
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

test('headerText renders with title styling by default', () => {
  render(
    <FullScreen
        headerText="Fullscreen Title"
        trigger={({ onClick }) => <button onClick={onClick}>Open</button>}
    >
      <div>Content</div>
    </FullScreen>
  )

  fireEvent.click(screen.getByText('Open'))

  expect(screen.getByText('Fullscreen Title')).toHaveClass('pb_title_kit')
  expect(screen.getByText('Fullscreen Title')).toHaveClass('pb_title_4')
})

test('headerTextStyling can render header text as body text', () => {
  render(
    <FullScreen
        headerText="Fullscreen Body"
        headerTextStyling="body"
        trigger={({ onClick }) => <button onClick={onClick}>Open</button>}
    >
      <div>Content</div>
    </FullScreen>
  )

  fireEvent.click(screen.getByText('Open'))

  expect(screen.getByText('Fullscreen Body')).toHaveClass('pb_body_kit')
})

test('isFullscreen opens fullscreen in controlled mode', () => {
  render(
    <FullScreen
        headerText="Controlled Fullscreen"
        isFullscreen
    >
      <div>Controlled Content</div>
    </FullScreen>
  )

  expect(document.querySelector('.fullscreen-overlay')).toBeInTheDocument()
  expect(document.querySelector('.fullscreen-content')).toHaveTextContent('Controlled Content')
  expect(screen.getByText('Controlled Fullscreen')).toBeInTheDocument()
})

test('trigger receives current state and toggles fullscreen', () => {
  const onOpen = jest.fn()
  const onClose = jest.fn()

  render(
    <FullScreen
        onClose={onClose}
        onOpen={onOpen}
        trigger={({ onClick, isOpen }) => (
          <button onClick={onClick}>{isOpen ? 'Close Fullscreen' : 'Open Fullscreen'}</button>
        )}
    >
      <div>Content</div>
    </FullScreen>
  )

  expect(screen.getByText('Open Fullscreen')).toBeInTheDocument()

  fireEvent.click(screen.getByText('Open Fullscreen'))

  expect(onOpen).toHaveBeenCalledTimes(1)
  expect(screen.getByText('Close Fullscreen')).toBeInTheDocument()
  expect(document.querySelector('.fullscreen-overlay')).toBeInTheDocument()

  fireEvent.click(document.querySelector('.fullscreen-close-button'))

  expect(onClose).toHaveBeenCalledTimes(1)
  expect(screen.getByText('Open Fullscreen')).toBeInTheDocument()
  expect(document.querySelector('.fullscreen-overlay')).not.toBeInTheDocument()
})

test('escToExit closes fullscreen by default', () => {
  const onClose = jest.fn()

  render(
    <FullScreen
        onClose={onClose}
        trigger={({ onClick }) => <button onClick={onClick}>Open</button>}
    >
      <div>Content</div>
    </FullScreen>
  )

  fireEvent.click(screen.getByText('Open'))
  fireEvent.keyDown(document, { key: 'Escape' })

  expect(onClose).toHaveBeenCalledTimes(1)
  expect(document.querySelector('.fullscreen-overlay')).not.toBeInTheDocument()
})

test('escToExit can be disabled', () => {
  const onClose = jest.fn()

  render(
    <FullScreen
        escToExit={false}
        onClose={onClose}
        trigger={({ onClick }) => <button onClick={onClick}>Open</button>}
    >
      <div>Content</div>
    </FullScreen>
  )

  fireEvent.click(screen.getByText('Open'))
  fireEvent.keyDown(document, { key: 'Escape' })

  expect(onClose).not.toHaveBeenCalled()
  expect(document.querySelector('.fullscreen-overlay')).toBeInTheDocument()
})

test('can be controlled by useFullScreen from an external trigger', () => {
  const ExternalTriggerExample = () => {
    const [isFullscreen, setIsFullscreen] = useFullScreen(false)

    return (
      <>
        <div data-testid="toolbar">
          <button onClick={() => setIsFullscreen(true)}>Open from toolbar</button>
        </div>
        <FullScreen
            data={{ testid: 'default' }}
            headerText="Fullscreen"
            isFullscreen={isFullscreen}
            onClose={() => setIsFullscreen(false)}
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

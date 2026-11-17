import React from 'react'
import { fireEvent, render, screen } from '../utilities/test-utils'

import { ChatTemplate } from 'playbook-ui'
import { MIN_WINDOW_HEIGHT, MIN_WINDOW_WIDTH, moveRect, resizeRect } from './useFloatingWindow'

const testId = 'chat-template'
const kitClass = 'pb_chat_template_kit'

const MESSAGES = [
  { id: 1, role: 'user', content: 'What is the weather like at HQ?' },
  { id: 2, role: 'agent', content: 'Sunny and mild.' },
]

const renderChat = (props = {}) => render(
  <ChatTemplate
      data={{ testid: testId }}
      messages={MESSAGES}
      {...props}
  />
)

const getPromptInput = () => screen.getByLabelText('Ask a question...')

test('renders the kit class and an accessible region', () => {
  renderChat({ title: 'Nitro Intelligence Chat' })
  const kit = screen.getByTestId(testId)

  expect(kit).toHaveClass(kitClass)
  expect(kit).toHaveAttribute('role', 'region')
  expect(kit).toHaveAttribute('aria-label', 'Nitro Intelligence Chat')
})

test('renders user and agent messages in the conversation log', () => {
  renderChat()
  const thread = screen.getByRole('log')

  expect(thread).toHaveTextContent('What is the weather like at HQ?')
  expect(screen.getByText('What is the weather like at HQ?').closest('.chat-template-message')).toHaveClass('chat-template-message-user')
  expect(screen.getByText('Sunny and mild.').closest('.chat-template-message')).toHaveClass('chat-template-message-agent')
})

test('submits the trimmed prompt and clears the input', () => {
  const onSubmit = jest.fn()
  renderChat({ onSubmit })
  const input = getPromptInput()

  fireEvent.change(input, { target: { value: '  Summarize my project  ' } })
  fireEvent.click(screen.getByLabelText('Send message'))

  expect(onSubmit).toHaveBeenCalledWith('Summarize my project')
  expect(input).toHaveValue('')
})

test('does not submit an empty prompt', () => {
  const onSubmit = jest.fn()
  renderChat({ onSubmit })

  fireEvent.change(getPromptInput(), { target: { value: '   ' } })
  fireEvent.submit(getPromptInput().closest('form'))

  expect(onSubmit).not.toHaveBeenCalled()
  expect(screen.getByLabelText('Send message')).toBeDisabled()
})

test('shows a loading indicator and disables sending while loading', () => {
  const onSubmit = jest.fn()
  renderChat({ loading: true, loadingText: ' Thinking', onSubmit })

  fireEvent.change(getPromptInput(), { target: { value: 'Next question' } })

  expect(screen.getByRole('log')).toHaveTextContent('Thinking')
  expect(screen.getByLabelText('Send message')).toBeDisabled()
})

test('shows the empty state when there are no messages', () => {
  renderChat({ emptyState: 'Ask about compensation.', messages: [] })

  expect(screen.getByText('Ask about compensation.')).toBeInTheDocument()
})

test('hides the empty state once there are messages', () => {
  renderChat({ emptyState: 'Ask about compensation.' })

  expect(screen.queryByText('Ask about compensation.')).not.toBeInTheDocument()
})

test('shows errors as an alert', () => {
  renderChat({ error: 'Something went wrong.' })

  expect(screen.getByRole('alert')).toHaveTextContent('Something went wrong.')
})

test('calls onClear and hides the clear button when the thread is empty', () => {
  const onClear = jest.fn()
  const { rerender } = renderChat({ onClear })

  fireEvent.click(screen.getByLabelText('New chat'))
  expect(onClear).toHaveBeenCalledTimes(1)

  rerender(
    <ChatTemplate
        data={{ testid: testId }}
        messages={[]}
        onClear={onClear}
    />
  )
  expect(screen.queryByLabelText('New chat')).not.toBeInTheDocument()
})

test('only renders clear and close buttons when handlers are provided', () => {
  renderChat()

  expect(screen.queryByLabelText('New chat')).not.toBeInTheDocument()
  expect(screen.queryByLabelText('Close chat')).not.toBeInTheDocument()
})

test('renderContent renders response patterns and falls back to content', () => {
  const messages = [
    { id: 1, role: 'agent', type: 'table', rows: ['Row A'] },
    { id: 2, role: 'agent', content: 'Plain text reply' },
  ]
  const renderContent = (message) => (
    message.type === 'table' ? <table><tbody><tr><td>{message.rows[0]}</td></tr></tbody></table> : undefined
  )
  renderChat({ messages, renderContent })

  expect(screen.getByRole('table')).toHaveTextContent('Row A')
  expect(screen.getByText('Plain text reply')).toBeInTheDocument()
})

test('renders context content', () => {
  renderChat({ context: <span>{'Project #10482'}</span> })

  expect(screen.getByText('Project #10482').closest('.chat-template-context')).toBeInTheDocument()
})

test('floating renders a dialog with resize handles from every side and corner', () => {
  renderChat({ floating: true })
  const kit = screen.getByTestId(testId)

  expect(kit).toHaveAttribute('role', 'dialog')
  expect(kit).toHaveClass('chat-template-floating')
  expect(kit.querySelectorAll('.chat-template-resize-handle')).toHaveLength(8)
  expect(getPromptInput()).toHaveFocus()
})

test('inline chats do not render resize handles', () => {
  renderChat()

  expect(screen.getByTestId(testId).querySelectorAll('.chat-template-resize-handle')).toHaveLength(0)
})

test('floating opens in the bottom-right corner and moves with the arrow keys', () => {
  renderChat({ defaultHeight: 500, defaultWidth: 400, floating: true })
  const kit = screen.getByTestId(testId)
  const startX = window.innerWidth - 16 - 400

  expect(kit.style.getPropertyValue('--pb-chat-template-x')).toBe(`${startX}px`)
  expect(kit.style.getPropertyValue('--pb-chat-template-width')).toBe('400px')

  fireEvent.keyDown(kit.querySelector('.chat-template-header'), { key: 'ArrowLeft' })
  expect(kit.style.getPropertyValue('--pb-chat-template-x')).toBe(`${startX - 16}px`)

  fireEvent.keyDown(kit.querySelector('.chat-template-header'), { key: 'ArrowLeft', shiftKey: true })
  expect(kit.style.getPropertyValue('--pb-chat-template-width')).toBe('384px')
})

test('keeps htmlOptions styles alongside global inline props', () => {
  renderChat({ height: '480px', htmlOptions: { style: { outline: '1px solid red' } } })
  const kit = screen.getByTestId(testId)

  expect(kit.style.outline).toBe('1px solid red')
  expect(kit.style.height).toBe('480px')
})

test('floating size ignores the height prop so resizing can change it', () => {
  renderChat({ floating: true, height: '480px' })
  const kit = screen.getByTestId(testId)

  expect(kit.style.height).toBe('')
  expect(kit.style.getPropertyValue('--pb-chat-template-height')).toBe('560px')
})

test('Escape calls onClose only when floating', () => {
  const onClose = jest.fn()
  const { rerender } = renderChat({ onClose })

  fireEvent.keyDown(getPromptInput(), { key: 'Escape' })
  expect(onClose).not.toHaveBeenCalled()

  rerender(
    <ChatTemplate
        data={{ testid: testId }}
        floating
        messages={MESSAGES}
        onClose={onClose}
    />
  )
  fireEvent.keyDown(getPromptInput(), { key: 'Escape' })
  expect(onClose).toHaveBeenCalledTimes(1)
})

describe('floating window geometry', () => {
  const start = { height: 500, width: 400, x: 200, y: 100 }

  test('moveRect keeps the window inside the viewport', () => {
    expect(moveRect(start, -1000, -1000)).toMatchObject({ x: 16, y: 16 })
    expect(moveRect(start, 5000, 5000)).toMatchObject({
      x: window.innerWidth - 16 - start.width,
      y: window.innerHeight - 16 - start.height,
    })
  })

  test('resizing from the west edge keeps the east edge fixed', () => {
    const rect = resizeRect(start, 'w', -50, 0)

    expect(rect).toMatchObject({ width: 450, x: 150 })
  })

  test('resizing respects the minimum size', () => {
    const rect = resizeRect(start, 'nw', 1000, 1000)

    expect(rect.width).toBe(MIN_WINDOW_WIDTH)
    expect(rect.height).toBe(MIN_WINDOW_HEIGHT)
    expect(rect.x + rect.width).toBe(start.x + start.width)
    expect(rect.y + rect.height).toBe(start.y + start.height)
  })

  test('resizing from the south-east corner stops at the viewport edge', () => {
    const rect = resizeRect(start, 'se', 5000, 5000)

    expect(rect.x + rect.width).toBe(window.innerWidth - 16)
    expect(rect.y + rect.height).toBe(window.innerHeight - 16)
  })
})

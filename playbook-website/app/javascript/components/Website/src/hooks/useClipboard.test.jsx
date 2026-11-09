import React from 'react'
import { act, render, fireEvent, cleanup } from '@testing-library/react'
import { useClipboard } from './useClipboard'

function CopyButton({ value = 'Example' }) {
  const { onCopy, hasCopied } = useClipboard(value, 100)
  return <button onClick={onCopy}>{hasCopied ? 'Copied' : 'Copy'}</button>
}

const clipboardDescriptor = Object.getOwnPropertyDescriptor(navigator, 'clipboard')

beforeEach(() => { jest.useFakeTimers() })
afterEach(() => {
  cleanup()
  jest.useRealTimers()
  if (clipboardDescriptor) Object.defineProperty(navigator, 'clipboard', clipboardDescriptor)
  else delete navigator.clipboard
})

const setWrite = writeText => Object.defineProperty(navigator, 'clipboard', {
  configurable: true,
  value: { writeText },
})

test('reports success after writing and resets after the requested timeout', async () => {
  let resolveWrite
  const write = jest.fn(() => new Promise(resolve => { resolveWrite = resolve }))
  setWrite(write)
  const { getByRole } = render(<CopyButton />)
  fireEvent.click(getByRole('button'))
  expect(getByRole('button').textContent).toBe('Copy')
  await act(async () => { resolveWrite() })
  expect(write).toHaveBeenCalledWith('Example')
  expect(getByRole('button').textContent).toBe('Copied')
  act(() => { jest.advanceTimersByTime(100) })
  expect(getByRole('button').textContent).toBe('Copy')
})

test('clears a previous success when a subsequent write fails', async () => {
  setWrite(jest.fn().mockResolvedValueOnce().mockRejectedValueOnce(new Error('Denied')))
  const { getByRole } = render(<CopyButton />)
  await act(async () => { fireEvent.click(getByRole('button')) })
  expect(getByRole('button').textContent).toBe('Copied')
  await act(async () => { fireEvent.click(getByRole('button')) })
  expect(getByRole('button').textContent).toBe('Copy')
})

test('ignores an older write completing after a newer copy attempt', async () => {
  let resolveFirst
  setWrite(jest.fn()
    .mockImplementationOnce(() => new Promise(resolve => { resolveFirst = resolve }))
    .mockRejectedValueOnce(new Error('Denied')))
  const { getByRole } = render(<CopyButton />)
  fireEvent.click(getByRole('button'))
  await act(async () => { fireEvent.click(getByRole('button')) })
  await act(async () => { resolveFirst() })
  expect(getByRole('button').textContent).toBe('Copy')
})

test('copies updated values and tolerates unmounting with a pending write', async () => {
  let resolveWrite
  const write = jest.fn(() => new Promise(resolve => { resolveWrite = resolve }))
  setWrite(write)
  const { getByRole, rerender, unmount } = render(<CopyButton />)
  rerender(<CopyButton value="Updated" />)
  fireEvent.click(getByRole('button'))
  expect(write).toHaveBeenCalledWith('Updated')
  unmount()
  await act(async () => { resolveWrite() })
})

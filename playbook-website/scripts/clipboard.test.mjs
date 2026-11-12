import assert from 'node:assert/strict'
import { afterEach, test } from 'node:test'
import { copyText } from '../app/javascript/components/Website/src/utils/clipboard.ts'

const navigatorDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'navigator')
const itemDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'ClipboardItem')

afterEach(() => {
  for (const [key, descriptor] of [['navigator', navigatorDescriptor], ['ClipboardItem', itemDescriptor]]) {
    if (descriptor) Object.defineProperty(globalThis, key, descriptor)
    else delete globalThis[key]
  }
})

const setClipboard = clipboard => Object.defineProperty(globalThis, 'navigator', {
  configurable: true,
  value: { clipboard },
})

test('waits for the native text write before reporting success', async () => {
  let resolveWrite
  let written
  setClipboard({ writeText: value => {
    written = value
    return new Promise(resolve => { resolveWrite = resolve })
  } })
  let completed = false
  const result = copyText('line one\nline two').then(value => { completed = true; return value })
  await Promise.resolve()
  assert.equal(completed, false)
  assert.equal(written, 'line one\nline two')
  resolveWrite()
  assert.equal(await result, true)
})

test('reports failure for rejected writes and missing clipboard APIs', async () => {
  setClipboard({ writeText: async () => { throw new Error('Permission denied') } })
  assert.equal(await copyText('text'), false)
  setClipboard(undefined)
  assert.equal(await copyText('text'), false)
})

test('preserves the requested MIME format for rich text', async () => {
  let written
  Object.defineProperty(globalThis, 'ClipboardItem', {
    configurable: true,
    value: class { constructor(data) { this.data = data } },
  })
  setClipboard({ write: async items => { written = items } })
  assert.equal(await copyText('<b>Example</b>', 'text/html'), true)
  assert.equal(written[0].data['text/html'].type, 'text/html')
  assert.equal(await written[0].data['text/html'].text(), '<b>Example</b>')
})

test('reports failure if rich clipboard writes are unsupported', async () => {
  setClipboard({ writeText: async () => {} })
  assert.equal(await copyText('<b>Example</b>', 'text/html'), false)
})

import { autoPositionFixed } from './autoPositionFixed'

const mockStopAutoUpdate = jest.fn()

jest.mock('@floating-ui/dom', () => ({
  // Run the update once immediately, like the real autoUpdate does.
  autoUpdate: jest.fn((_reference, _floating, update) => {
    update()
    return mockStopAutoUpdate
  }),
  computePosition: jest.fn(() => Promise.resolve({ x: 10.37, y: 20.62, placement: 'top-start' })),
}))

const flushPromises = () => new Promise((resolve) => setTimeout(resolve, 0))

describe('autoPositionFixed', () => {
  let reference: HTMLElement
  let floating: HTMLElement
  const originalDpr = window.devicePixelRatio

  beforeEach(() => {
    reference = document.createElement('button')
    floating = document.createElement('div')
    document.body.append(reference, floating)
    mockStopAutoUpdate.mockClear()
  })

  afterEach(() => {
    document.body.innerHTML = ''
    Object.defineProperty(window, 'devicePixelRatio', { value: originalDpr, configurable: true })
    Object.defineProperty(window, 'visualViewport', { value: undefined, configurable: true })
  })

  test('writes the same DOM output Popper.js did: fixed, margin 0, rounded coordinates, data-popper-placement', async () => {
    Object.defineProperty(window, 'devicePixelRatio', { value: 2, configurable: true })

    autoPositionFixed(reference, floating, { placement: 'top-start' })
    await flushPromises()

    expect(floating.style.position).toBe('fixed')
    expect(floating.style.margin).toBe('0px')
    // 10.37 → 10.5 and 20.62 → 20.5 at devicePixelRatio 2
    expect(floating.style.left).toBe('10.5px')
    expect(floating.style.top).toBe('20.5px')
    expect(floating.getAttribute('data-popper-placement')).toBe('top-start')
  })

  test('rounds to whole pixels at devicePixelRatio 1', async () => {
    Object.defineProperty(window, 'devicePixelRatio', { value: 1, configurable: true })

    autoPositionFixed(reference, floating, {})
    await flushPromises()

    expect(floating.style.left).toBe('10px')
    expect(floating.style.top).toBe('21px')
  })

  test('repositions on visual viewport scroll/resize and unsubscribes on cleanup', () => {
    const viewport = new EventTarget()
    const add = jest.spyOn(viewport, 'addEventListener')
    const remove = jest.spyOn(viewport, 'removeEventListener')
    Object.defineProperty(window, 'visualViewport', { value: viewport, configurable: true })

    const cleanup = autoPositionFixed(reference, floating, {})
    expect(add.mock.calls.map(([type]) => type)).toEqual(['scroll', 'resize'])

    cleanup()
    expect(mockStopAutoUpdate).toHaveBeenCalledTimes(1)
    expect(remove.mock.calls.map(([type]) => type)).toEqual(['scroll', 'resize'])
  })
})

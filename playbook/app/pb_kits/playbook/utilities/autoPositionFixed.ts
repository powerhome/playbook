import { autoUpdate, computePosition, ComputePositionConfig } from '@floating-ui/dom'

// Popper.js rounded offsets to device pixels (`roundOffsetsByDPR`); match it so positions don't change.
const roundByDPR = (value: number): number => {
  const dpr = window.devicePixelRatio || 1
  return Math.round(value * dpr) / dpr
}

/**
 * Keeps a `position: fixed` floating element attached to its reference until the returned cleanup runs.
 * Writes the same DOM output Popper.js did for the Rails kits that used it (Popover, Filter):
 * device-pixel-rounded `left`/`top`, `margin: 0` and `data-popper-placement`.
 */
export const autoPositionFixed = (
  reference: HTMLElement,
  floating: HTMLElement,
  config: Omit<ComputePositionConfig, 'strategy'>,
): (() => void) => {
  Object.assign(floating.style, { position: 'fixed', margin: '0' })

  const update = () => {
    void computePosition(reference, floating, { ...config, strategy: 'fixed' }).then(({ x, y, placement }) => {
      Object.assign(floating.style, { left: `${roundByDPR(x)}px`, top: `${roundByDPR(y)}px` })
      floating.setAttribute('data-popper-placement', placement)
    })
  }

  const stopAutoUpdate = autoUpdate(reference, floating, update)

  // autoUpdate doesn't listen to the visual viewport (pinch-zoom, mobile keyboard); the previous
  // subscribeFloatingKitReposition subscription did, so keep that behavior.
  const viewport = typeof window !== 'undefined' ? window.visualViewport : null
  viewport?.addEventListener('scroll', update)
  viewport?.addEventListener('resize', update)

  return () => {
    stopAutoUpdate()
    viewport?.removeEventListener('scroll', update)
    viewport?.removeEventListener('resize', update)
  }
}

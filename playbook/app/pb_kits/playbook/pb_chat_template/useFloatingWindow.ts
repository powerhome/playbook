import React, { useEffect, useLayoutEffect, useRef } from 'react'

export type ResizeDirection = 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w' | 'nw'

type WindowRect = {
  height: number,
  width: number,
  x: number,
  y: number,
}

type FloatingWindowOptions = {
  defaultHeight: number,
  defaultWidth: number,
  enabled: boolean,
}

type RectUpdater = (start: WindowRect, deltaX: number, deltaY: number) => WindowRect

export const RESIZE_DIRECTIONS: ResizeDirection[] = ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw']
export const MIN_WINDOW_HEIGHT = 360
export const MIN_WINDOW_WIDTH = 320
const VIEWPORT_MARGIN = 16
const KEYBOARD_STEP = 16

const ARROW_KEY_OFFSETS: { [key: string]: [number, number] } = {
  ArrowDown: [0, 1],
  ArrowLeft: [-1, 0],
  ArrowRight: [1, 0],
  ArrowUp: [0, -1],
}

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

const viewportRight = () => window.innerWidth - VIEWPORT_MARGIN
const viewportBottom = () => window.innerHeight - VIEWPORT_MARGIN

export const moveRect: RectUpdater = (start, deltaX, deltaY) => ({
  ...start,
  x: clamp(start.x + deltaX, VIEWPORT_MARGIN, viewportRight() - start.width),
  y: clamp(start.y + deltaY, VIEWPORT_MARGIN, viewportBottom() - start.height),
})

export const resizeRect = (start: WindowRect, direction: ResizeDirection, deltaX: number, deltaY: number): WindowRect => {
  const rect = { ...start }
  const startRight = start.x + start.width
  const startBottom = start.y + start.height

  if (direction.includes('e')) {
    rect.width = clamp(start.width + deltaX, MIN_WINDOW_WIDTH, viewportRight() - start.x)
  }
  if (direction.includes('w')) {
    rect.x = clamp(start.x + deltaX, VIEWPORT_MARGIN, startRight - MIN_WINDOW_WIDTH)
    rect.width = startRight - rect.x
  }
  if (direction.includes('s')) {
    rect.height = clamp(start.height + deltaY, MIN_WINDOW_HEIGHT, viewportBottom() - start.y)
  }
  if (direction.includes('n')) {
    rect.y = clamp(start.y + deltaY, VIEWPORT_MARGIN, startBottom - MIN_WINDOW_HEIGHT)
    rect.height = startBottom - rect.y
  }

  return rect
}

const fitToViewport = (rect: WindowRect): WindowRect => {
  const width = clamp(rect.width, MIN_WINDOW_WIDTH, viewportRight() - VIEWPORT_MARGIN)
  const height = clamp(rect.height, MIN_WINDOW_HEIGHT, viewportBottom() - VIEWPORT_MARGIN)

  return moveRect({ ...rect, height, width }, 0, 0)
}

const useFloatingWindow = ({ defaultHeight, defaultWidth, enabled }: FloatingWindowOptions) => {
  const windowRef = useRef<HTMLDivElement>(null)
  const rectRef = useRef<WindowRect | null>(null)
  const stopInteractionRef = useRef<(() => void) | null>(null)

  // Writes CSS variables directly so dragging never re-renders the conversation.
  const applyRect = (rect: WindowRect) => {
    rectRef.current = rect
    const element = windowRef.current
    if (!element) return

    element.style.setProperty('--pb-chat-template-height', `${rect.height}px`)
    element.style.setProperty('--pb-chat-template-width', `${rect.width}px`)
    element.style.setProperty('--pb-chat-template-x', `${rect.x}px`)
    element.style.setProperty('--pb-chat-template-y', `${rect.y}px`)
  }

  useLayoutEffect(() => {
    if (!enabled) return

    applyRect(fitToViewport({
      height: defaultHeight,
      width: defaultWidth,
      x: viewportRight() - defaultWidth,
      y: viewportBottom() - defaultHeight,
    }))
  }, [defaultHeight, defaultWidth, enabled])

  useEffect(() => {
    if (!enabled) return

    const handleViewportResize = () => {
      if (rectRef.current) applyRect(fitToViewport(rectRef.current))
    }

    window.addEventListener('resize', handleViewportResize)
    return () => {
      window.removeEventListener('resize', handleViewportResize)
      stopInteractionRef.current?.()
    }
  }, [enabled])

  const startInteraction = (event: React.PointerEvent, updateRect: RectUpdater) => {
    if (!enabled || event.button !== 0 || !rectRef.current) return
    event.preventDefault()

    const start = rectRef.current
    const { clientX: startX, clientY: startY } = event

    const handlePointerMove = (moveEvent: PointerEvent) => {
      applyRect(updateRect(start, moveEvent.clientX - startX, moveEvent.clientY - startY))
    }
    const stopInteraction = () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', stopInteraction)
      stopInteractionRef.current = null
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', stopInteraction)
    stopInteractionRef.current = stopInteraction
  }

  const startDrag = (event: React.PointerEvent) => {
    if ((event.target as HTMLElement).closest('button')) return
    startInteraction(event, moveRect)
  }

  const startResize = (direction: ResizeDirection) => (event: React.PointerEvent) => {
    startInteraction(event, (start, deltaX, deltaY) => resizeRect(start, direction, deltaX, deltaY))
  }

  const handleKeyboardMove = (event: React.KeyboardEvent) => {
    const offset = ARROW_KEY_OFFSETS[event.key]
    if (!enabled || !offset || event.target !== event.currentTarget || !rectRef.current) return
    event.preventDefault()

    const [deltaX, deltaY] = offset.map((direction) => direction * KEYBOARD_STEP)
    applyRect(event.shiftKey
      ? resizeRect(rectRef.current, 'se', deltaX, deltaY)
      : moveRect(rectRef.current, deltaX, deltaY))
  }

  return { handleKeyboardMove, startDrag, startResize, windowRef }
}

export default useFloatingWindow

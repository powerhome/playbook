import React, { useEffect, useState } from 'react'

import { GenericObject } from '../../types'

export type PillDropTarget = {
  after: boolean
  index: number
}

// Vertical reach (px) above/below a pill row that still targets a drop position in that row.
const ROW_TOLERANCE = 80

let lastPointer: { x: number, y: number } | null = null
let pointerTrackingInstalled = false

const ensurePointerTracking = () => {
  if (pointerTrackingInstalled || typeof document === 'undefined') return
  pointerTrackingInstalled = true

  document.addEventListener('mousemove', (event: MouseEvent) => {
    if (event.buttons === 0) return
    lastPointer = { x: event.clientX, y: event.clientY }
  }, true)

  document.addEventListener('touchmove', (event: TouchEvent) => {
    const touch = event.touches[0]
    if (touch) lastPointer = { x: touch.clientX, y: touch.clientY }
  }, { capture: true, passive: true })
}

const getVerticalDistance = (rect: DOMRect, y: number): number => (
  Math.max(rect.top - y, y - rect.bottom, 0)
)

const getDropTarget = (pills: Element[], x: number, y: number): PillDropTarget | null => {
  if (pills.length === 0) return null

  const rects = pills.map((pill) => pill.getBoundingClientRect())
  const nearestRect = rects.reduce((nearest, rect) => (
    getVerticalDistance(rect, y) < getVerticalDistance(nearest, y) ? rect : nearest
  ))
  if (getVerticalDistance(nearestRect, y) > ROW_TOLERANCE) return null

  const rowIndexes = rects
    .map((rect, index) => ({ index, rect }))
    .filter(({ rect }) => rect.top < nearestRect.bottom && rect.bottom > nearestRect.top)
    .map(({ index }) => index)

  const pillAfterPointer = rowIndexes.find((index) => x < rects[index].left + rects[index].width / 2)
  if (pillAfterPointer !== undefined) {
    return { after: false, index: pillAfterPointer }
  }

  return { after: true, index: rowIndexes[rowIndexes.length - 1] }
}

const usePillDropIndicator = (
  dragId: string,
  value: GenericObject[],
  getItemId: (item: GenericObject) => string,
  pendingReorderRef: React.MutableRefObject<GenericObject[] | null>,
  containerSelector = '.pb_dropdown_draggable_pills',
): PillDropTarget | null => {
  const [dropTarget, setDropTarget] = useState<PillDropTarget | null>(null)

  useEffect(() => {
    ensurePointerTracking()
  }, [])

  useEffect(() => {
    const source = document.querySelector<HTMLElement>(`${containerSelector} .is_dragging`)
    if (!dragId || !source?.parentElement) return undefined

    const pills = Array.from(source.parentElement.children)
    const sourceIndex = value.findIndex((item) => getItemId(item) === dragId)
    if (sourceIndex < 0 || pills.length === 0) return undefined

    const sourceRect = source.getBoundingClientRect()

    const ghost = source.cloneNode(true) as HTMLElement
    ghost.className = 'pb_dropdown_pill_drag_preview'
    ghost.setAttribute('inert', '')
    ghost.style.left = `${sourceRect.left}px`
    ghost.style.top = `${sourceRect.top}px`
    ghost.style.width = `${sourceRect.width}px`
    document.body.appendChild(ghost)

    const pointerOrigin = {
      x: sourceRect.left + sourceRect.width / 2,
      y: sourceRect.top + sourceRect.height / 2,
    }
    pendingReorderRef.current = null

    const handlePointerMove = (x: number, y: number) => {
      ghost.style.translate = `${x - pointerOrigin.x}px ${y - pointerOrigin.y}px`

      const target = getDropTarget(pills, x, y)
      const targetSlot = target ? target.index + Number(target.after) : -1
      const isCurrentPosition = targetSlot === sourceIndex || targetSlot === sourceIndex + 1

      if (!target || isCurrentPosition) {
        pendingReorderRef.current = null
        setDropTarget(null)
        return
      }

      const reordered = value.filter((item) => getItemId(item) !== dragId)
      reordered.splice(targetSlot > sourceIndex ? targetSlot - 1 : targetSlot, 0, value[sourceIndex])
      pendingReorderRef.current = reordered

      setDropTarget((current) => {
        const isSameTarget = current?.index === target.index && current.after === target.after
        return isSameTarget ? current : target
      })
    }

    const handleMouseMove = (event: MouseEvent) => {
      handlePointerMove(event.clientX, event.clientY)
    }

    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0]
      if (touch) handlePointerMove(touch.clientX, touch.clientY)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('touchmove', handleTouchMove, { passive: true })

    if (lastPointer) {
      handlePointerMove(lastPointer.x, lastPointer.y)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('touchmove', handleTouchMove)
      ghost.remove()
      setDropTarget(null)
    }
  }, [containerSelector, dragId, getItemId, pendingReorderRef, value])

  return dropTarget
}

export default usePillDropIndicator

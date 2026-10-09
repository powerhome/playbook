import React, { useEffect, useState } from 'react'

import { SelectValueType } from '../_typeahead'

export type PillDropTarget = {
  after: boolean
  index: number
}

// Vertical reach (px) above/below a pill row that still targets a drop position in that row.
// Use Infinity to target the nearest row from anywhere on the page.
const ROW_TOLERANCE = 80

const getVerticalDistance = (rect: DOMRect, y: number): number => (
  Math.max(rect.top - y, y - rect.bottom, 0)
)

// Finds the drop position from the pointer: the nearest pill row (within ROW_TOLERANCE),
// then the gap in that row. Left of a row targets its first pill; right of it (e.g. over
// the input) targets after its last pill.
const getDropTarget = (pills: Element[], x: number, y: number): PillDropTarget | null => {
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

// While a pill is dragged, a ghost copy follows the pointer and the targeted pill gets a
// before/after drop line. Targeting the pill's current spot shows no line and commits nothing.
const usePillDropIndicator = (
  dragId: string,
  value: SelectValueType[],
  pendingReorderRef: React.MutableRefObject<SelectValueType[] | null>,
): PillDropTarget | null => {
  const [dropTarget, setDropTarget] = useState<PillDropTarget | null>(null)

  useEffect(() => {
    // Only one pill can be dragged at a time, so the dragging item is unique on the page
    const source = document.querySelector<HTMLElement>('.pb_typeahead_draggable_pills .is_dragging')
    if (!dragId || !source) return undefined

    const pills = Array.from(source.parentElement.children)
    const sourceIndex = value.findIndex((item) => item.value === dragId)
    const sourceRect = source.getBoundingClientRect()

    const ghost = source.cloneNode(true) as HTMLElement
    ghost.className = 'pb_typeahead_pill_drag_preview'
    ghost.setAttribute('inert', '')
    ghost.style.left = `${sourceRect.left}px`
    ghost.style.top = `${sourceRect.top}px`
    ghost.style.width = `${sourceRect.width}px`
    document.body.appendChild(ghost)

    let dragStart: { x: number, y: number } | null = null
    pendingReorderRef.current = null

    const handlePointerMove = (x: number, y: number) => {
      if (!dragStart) dragStart = { x, y }
      ghost.style.translate = `${x - dragStart.x}px ${y - dragStart.y}px`

      const target = getDropTarget(pills, x, y)
      const targetSlot = target ? target.index + Number(target.after) : -1
      const isCurrentPosition = targetSlot === sourceIndex || targetSlot === sourceIndex + 1

      if (!target || isCurrentPosition) {
        pendingReorderRef.current = null
        setDropTarget(null)
        return
      }

      const reordered = value.filter((item) => item.value !== dragId)
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

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('touchmove', handleTouchMove)
      ghost.remove()
      setDropTarget(null)
    }
  }, [dragId, pendingReorderRef, value])

  return dropTarget
}

export default usePillDropIndicator

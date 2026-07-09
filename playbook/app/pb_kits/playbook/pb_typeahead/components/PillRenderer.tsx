import React from 'react'

import Badge from '../../pb_badge/_badge'
import Body from '../../pb_body/_body'
import FormPill from '../../pb_form_pill/_form_pill'
import Icon from '../../pb_icon/_icon'
import { SelectValueType } from '../_typeahead'

type PillColorType =
  | 'primary'
  | 'neutral'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'data_1'
  | 'data_2'
  | 'data_3'
  | 'data_4'
  | 'data_5'
  | 'data_6'
  | 'data_7'
  | 'data_8'
  | 'windows'
  | 'siding'
  | 'roofing'
  | 'doors'
  | 'gutters'
  | 'solar'
  | 'insulation'
  | 'accessories'

type PillRendererProps = {
  data: SelectValueType
  dark?: boolean
  index?: number
  isFocused?: boolean
  multiKit?: string
  onKeyboardReorder?: (direction: 'left' | 'right') => void
  onRemove?: (event: React.MouseEvent | React.KeyboardEvent) => void
  pillColor?: PillColorType
  pillDragHandle?: boolean
  removeProps?: { onClick?: (event: React.MouseEvent | React.KeyboardEvent) => void }
  selectProps?: Record<string, unknown>
  showPillIndex?: boolean
  totalCount?: number
  truncate?: 'none' | 1 | 2 | 3 | 4 | 5
  wrapped?: boolean
}

const PillRenderer = ({
  data,
  dark,
  index = 0,
  isFocused = false,
  multiKit = '',
  onKeyboardReorder,
  onRemove,
  pillColor,
  pillDragHandle = false,
  removeProps,
  showPillIndex = false,
  totalCount = 0,
  truncate,
  wrapped,
}: PillRendererProps) => {
  const { imageUrl } = data
  const baseLabel = data.label || data.name || ''
  const label = showPillIndex ? `${index + 1}. ${baseLabel}` : baseLabel
  const pillClassName = isFocused ? 'pb_form_pill_or_badge_focused' : ''
  const positionLabel = totalCount > 0
    ? `${baseLabel}, position ${index + 1} of ${totalCount}, press Control+Shift+Arrow keys to reorder`
    : baseLabel

  const handleRemove = (event: React.MouseEvent | React.KeyboardEvent) => {
    if (removeProps?.onClick) {
      removeProps.onClick(event)
    } else if (onRemove) {
      onRemove(event)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Backspace' || event.key === 'Delete') {
      event.preventDefault()
      event.stopPropagation()
      handleRemove(event)
    } else if (event.key === 'ArrowLeft' && event.ctrlKey && event.shiftKey) {
      event.preventDefault()
      event.stopPropagation()
      onKeyboardReorder?.('left')
    } else if (event.key === 'ArrowRight' && event.ctrlKey && event.shiftKey) {
      event.preventDefault()
      event.stopPropagation()
      onKeyboardReorder?.('right')
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      const selectInput = event.currentTarget.closest('.pb_typeahead_kit')?.querySelector('input')
      if (selectInput instanceof HTMLInputElement) {
        selectInput.focus()
      }
    }
  }

  const closeProps = removeProps || { onClick: handleRemove }

  const pillContent = (
    <>
      {pillDragHandle && (
        <span
            aria-hidden="true"
            className="pb_draggable_handle pb_typeahead_pill_drag_handle"
            onMouseDown={(event) => {
              event.stopPropagation()
            }}
        >
          <Body color="light">
            <Icon
                icon="grip-dots-vertical"
                verticalAlign="middle"
            />
          </Body>
        </span>
      )}

      {multiKit === 'badge' && (
        <Badge
            aria={{ label: positionLabel }}
            className={pillClassName}
            closeProps={closeProps}
            htmlOptions={{ onKeyDown: handleKeyDown }}
            marginRight="xs"
            removeIcon
            tabIndex={0}
            text={label}
            variant="primary"
        />
      )}

      {multiKit !== 'badge' && imageUrl && (
        <FormPill
            avatarUrl={imageUrl}
            className={pillClassName}
            closeProps={closeProps}
            color={pillColor}
            dark={dark}
            htmlOptions={{ 'aria-label': positionLabel, onKeyDown: handleKeyDown }}
            marginRight="xs"
            name={label}
            size={multiKit === 'smallPill' ? 'small' : ''}
            tabIndex={0}
            text=""
            truncate={truncate}
            wrapped={wrapped}
        />
      )}

      {multiKit !== 'badge' && !imageUrl && (
        <FormPill
            className={pillClassName}
            closeProps={closeProps}
            color={pillColor}
            dark={dark}
            htmlOptions={{ 'aria-label': positionLabel, onKeyDown: handleKeyDown }}
            marginRight="xs"
            name=""
            size={multiKit === 'smallPill' ? 'small' : ''}
            tabIndex={0}
            text={label}
            truncate={truncate}
            wrapped={wrapped}
        />
      )}
    </>
  )

  if (pillDragHandle) {
    return (
      <span className="pb_typeahead_pill_with_handle">
        {pillContent}
      </span>
    )
  }

  return pillContent
}

export default PillRenderer

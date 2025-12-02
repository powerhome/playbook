import React from 'react'
import { components } from 'react-select'

import Badge from '../../pb_badge/_badge'
import FormPill from '../../pb_form_pill/_form_pill'
import { SelectValueType } from '../_typeahead'

type Props = {
  data: SelectValueType,
  multiValueTemplate: any,
  wrapped?: boolean,
  pillColor?: "primary" | "neutral" | "success" | "warning" | "error" | "info" | "data_1" | "data_2" | "data_3" | "data_4" | "data_5" | "data_6" | "data_7" | "data_8" | "windows" | "siding" | "roofing" | "doors" | "gutters" | "solar" | "insulation" | "accessories",
  removeProps: any,
  selectProps: any,
  isFocused?: boolean,
}


const MultiValue = (props: Props) => {
  const { removeProps, isFocused } = props
  const { imageUrl, label } = props.data
  const { dark, multiKit, pillColor, truncate, wrapped, inputDisplay } = props.selectProps

  // If inputDisplay is "none", don't render the pill/badge, just return null (the count handled in ValueContainer file)
  if (inputDisplay === 'none') {
    return null
  }

  const formPillProps = {
    marginRight: 'xs',
    name: label,
    avatarUrl: '',
    dark,
  }

  if (typeof imageUrl === 'string') formPillProps.avatarUrl = imageUrl

  // Add className for focus state
  const pillClassName = isFocused ? 'pb_form_pill_or_badge_focused' : ''

  // Handle keyboard events on the pill itself to enable deletion when using tabIndex
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Backspace' || event.key === 'Delete') {
      event.preventDefault()
      event.stopPropagation()
      // Trigger the remove action from react-select
      if (removeProps && removeProps.onClick) {
        removeProps.onClick(event as any)
      }
    }
    // if arrow keys used, transfer focus to input so react-select can take over
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      const selectInput = event.currentTarget.closest('.pb_typeahead_kit')?.querySelector('input')
      if (selectInput instanceof HTMLInputElement) {
        selectInput.focus()
      }
    }
  }

  return (
    <components.MultiValueContainer
        className="text_input_multivalue_container"
        {...props}
    >
      {multiKit === 'badge' &&
        <Badge
            className={pillClassName}
            closeProps={removeProps}
            htmlOptions={{onKeyDown:handleKeyDown}}
            marginRight="xs"
            removeIcon
            tabIndex={0}
            text={label}
            variant="primary"
        />
      }

      {multiKit !== 'badge' && imageUrl &&
        <FormPill
            avatarUrl={imageUrl}
            className={pillClassName}
            closeProps={removeProps}
            color={pillColor}
            dark={dark}
            htmlOptions={{onKeyDown:handleKeyDown}}
            marginRight="xs"
            name={label}
            size={multiKit === 'smallPill' ? 'small' : ''}
            tabIndex={0}
            text=''
            truncate={truncate}
            wrapped={wrapped}
            {...props}
        />
      }

      {multiKit !== 'badge' && !imageUrl &&
        <FormPill
            className={pillClassName}
            closeProps={removeProps}
            color={pillColor}
            dark={dark}
            htmlOptions={{onKeyDown:handleKeyDown}}
            marginRight="xs"
            name=''
            size={multiKit === 'smallPill' ? 'small' : ''}
            tabIndex={0}
            text={label}
            truncate={truncate}
            wrapped={wrapped}
            {...props}
        />
      }
    </components.MultiValueContainer>
  )
}

export default MultiValue

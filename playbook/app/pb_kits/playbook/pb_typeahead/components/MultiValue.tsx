import React from 'react'
import { components } from 'react-select'

import Badge from '../../pb_badge/_badge'
import FormPill from '../../pb_form_pill/_form_pill'
import { SelectValueType } from '../_typeahead'

type Props = {
  data: SelectValueType,
  multiValueTemplate: any,
  pillColor?: "neutral" | "primary" | "neutral" | "success" | "warning" | "error",
  removeProps: any,
  selectProps: any,
}

const MultiValue = (props: Props) => {
  const { removeProps } = props
  const { imageUrl, label } = props.data
  const { dark, multiKit, pillColor } = props.selectProps

  const formPillProps = {
    marginRight: 'xs',
    name: label,
    avatarUrl: '',
    dark,
  }

  if (typeof imageUrl === 'string') formPillProps.avatarUrl = imageUrl

  return (
    <components.MultiValueContainer
        className="text_input_multivalue_container"
        {...props}
    >
      {multiKit === 'badge' &&
        <Badge
            closeProps={removeProps}
            removeIcon
            text={label}
            variant="primary"
        />
      }

      {multiKit !== 'badge' && imageUrl &&
        <FormPill
            avatarUrl={imageUrl}
            closeProps={removeProps}
            color={pillColor}
            dark={dark}
            marginRight="xs"
            name={label}
            size={multiKit === 'smallPill' ? 'small' : ''}
            text=''
            {...props}
        />
      }

      {multiKit !== 'badge' && !imageUrl &&
        <FormPill
            closeProps={removeProps}
            color={pillColor}
            dark={dark}
            marginRight="xs"
            name=''
            size={multiKit === 'smallPill' ? 'small' : ''}
            text={label}
            {...props}
        />
      }
    </components.MultiValueContainer>
  )
}

export default MultiValue

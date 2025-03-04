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
}


const MultiValue = (props: Props) => {
  const { removeProps } = props
  const { imageUrl, label } = props.data
  const { dark, multiKit, pillColor, truncate, wrapped } = props.selectProps

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
            truncate={truncate}
            wrapped={wrapped}
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
            truncate={truncate}
            wrapped={wrapped}
            {...props}
        />
      }
    </components.MultiValueContainer>
  )
}

export default MultiValue

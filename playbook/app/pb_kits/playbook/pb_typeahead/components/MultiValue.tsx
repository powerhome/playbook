import React from 'react'
import { components } from 'react-select'

import Badge from '../../pb_badge/_badge'
import FormPill from '../../pb_form_pill/_form_pill'
import { SelectValueType } from '../_typeahead'

type Props = {
  data: SelectValueType,
  removeProps?: {
    onClick?: React.MouseEventHandler<HTMLSpanElement>,
    onMouseDown?: React.MouseEventHandler<HTMLSpanElement>,
    onTouchEnd?: React.TouchEventHandler<HTMLSpanElement>,
  },
  selectProps: {
    multiKit?: string,
  },
}

const MultiValue = (props: Props): React.ReactElement => {
  const { removeProps } = props
  const { imageUrl, label } = props.data
  const { multiKit } = props.selectProps

  const formPillProps = {
    marginRight: 'xs',
    name: label,
    avatarUrl: '',
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
            marginRight="xs"
            name={label}
            size={multiKit === 'smallPill' ? 'small' : ''}
            text=''
        />
      }

      {multiKit !== 'badge' && !imageUrl &&
        <FormPill
            closeProps={removeProps}
            marginRight="xs"
            name=''
            size={multiKit === 'smallPill' ? 'small' : ''}
            text={label}
        />
      }
    </components.MultiValueContainer>
  )
}

export default MultiValue

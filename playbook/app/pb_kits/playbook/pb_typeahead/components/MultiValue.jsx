/* @flow */

import React from 'react'
import { components } from 'react-select'

import Badge from '../../pb_badge/_badge'
import FormPill from '../../pb_form_pill/_form_pill'

type Props = {
  data: object,
  multiValueTemplate: any,
  removeProps: any,
  selectProps: any,
}

const MultiValue = (props: Props) => {
  const { removeProps } = props
  const { imageUrl, label } = props.data
  const { multiKit } = props.selectProps

  const formPillProps = {
    marginRight: 'xs',
    name: label,
  }

  if (typeof imageUrl === 'string') formPillProps.avatarUrl = imageUrl

  return (
    <components.MultiValueContainer
        className="text_input_multivalue_container"
        {...props}
    >
      <If condition={multiKit === 'badge'}>
        <Badge
            closeProps={removeProps}
            removeIcon
            text={label}
            variant="primary"
        />
        <Else />
        <If condition={imageUrl}>
          <FormPill
              avatarUrl={imageUrl}
              closeProps={removeProps}
              marginRight="xs"
              name={label}
              size={multiKit === 'smallPill' ? 'small' : ''}
          />
          <Else />
          <FormPill
              closeProps={removeProps}
              marginRight="xs"
              size={multiKit === 'smallPill' ? 'small' : ''}
              text={label}
          />
        </If>
      </If>
    </components.MultiValueContainer>
  )
}

export default MultiValue

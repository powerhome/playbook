/* @flow */

import React from 'react'
import { components } from 'react-select'

import { Badge, FormPill } from '../../'

type Props = {
  data: object,
  multiValueTemplate: any,
  removeProps: any,
  selectProps: any,
}

const MultiValue = (props: Props) => {
  const { removeProps } = props
  const { imageUrl, label } = props.data
  const { badges } = props.selectProps

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
      <If condition={badges}>
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
          />
          <Else />
          <FormPill
              closeProps={removeProps}
              marginRight="xs"
              text={label}
          />
        </If>
      </If>
    </components.MultiValueContainer>
  )
}

export default MultiValue

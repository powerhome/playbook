/* @flow */

import React from 'react'
import { components } from 'react-select'

import { FormPill } from '../../'

type Props = {
  data: object,
  multiValueTemplate: any,
  removeProps: any,
  selectProps: any,
}

const MultiValue = (props: Props) => {
  const { removeProps } = props
  const { imageUrl, label } = props.data

  const formPillProps = {
    marginRight: 'xs',
    name: label,
  }

  if (typeof imageUrl === 'string') formPillProps.avatarUrl = imageUrl

  const handleOnClick = removeProps.onClick
  const handleMouseDown = (e) => e.stopPropagation()

  return (
    <components.MultiValueContainer
        className="text_input_multivalue_container"
        {...props}
    >
      <If condition={imageUrl}>
        <FormPill
            avatarUrl={imageUrl}
            marginRight="xs"
            name={label}
            onClick={handleOnClick}
        />
        <Else />
        <FormPill
            marginRight="xs"
            onClick={handleOnClick}
            onCloseMouseDown={handleMouseDown}
            text={label}
        />
      </If>
    </components.MultiValueContainer>
  )
}

export default MultiValue

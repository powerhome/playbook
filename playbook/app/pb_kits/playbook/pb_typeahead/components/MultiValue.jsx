/* @flow */

import React from 'react'
import { components } from 'react-select'

import { FormPill, Badge } from '../../'

type Props = {
  data: object,
  multiValueTemplate: any,
  removeProps: any,
  selectProps: any,
}

const MultiValue = (props: Props) => {
  const { removeProps } = props
  const { imageUrl, label } = props.data

  console.log(props.selectProps.badges)

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
      {/* <If condition={imageUrl}>
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
      </If> */}
      <If condition={props.selectProps.badges}>
        <Badge
            closeProps={removeProps}
            removeIcon
            // removeOnClick={() => alert('remove')}
            text={label}
            variant="primary"
        />
      </If>
    </components.MultiValueContainer>
  )
}

export default MultiValue

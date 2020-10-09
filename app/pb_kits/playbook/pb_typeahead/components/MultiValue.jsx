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
  const {
    data,
    removeProps,
    selectProps,
  } = props

  const { imageUrl, label } = data

  const handleOnMultiValueRemove = () => {
    const multiValueRemoveEvent = new CustomEvent('pb-typeahead-kit-result-option-remove', { detail: data })
    document.dispatchEvent(multiValueRemoveEvent)
  }

  const handleOnClick = () => {
    if (selectProps.onMultiValueClick) selectProps.onMultiValueClick(data)
    handleOnMultiValueRemove()
    removeProps.onClick()
  }

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
            text={label}
        />
      </If>
    </components.MultiValueContainer>
  )
}

export default MultiValue

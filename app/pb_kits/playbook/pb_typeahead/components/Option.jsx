/* @flow */

import React from 'react'
import { components } from 'react-select'

import {
  User,
} from '../../'

const Option = (props: any) => {
  const {
    imageUrl,
    label,
  } = props.data

  const handleOptionClicked = () => {
    const resultSelectedEvent = new CustomEvent('pb-typeahead-kit-result-option-select', { detail: props.data })
    document.dispatchEvent(resultSelectedEvent)
  }

  return (
    <components.Option {...props}>
      <div onClick={handleOptionClicked}>
        <Choose>
          <When condition={imageUrl}>
            <User
                align="left"
                avatarUrl={imageUrl}
                name={label}
                orientation="horizontal"
            />
          </When>
          <When condition={!imageUrl}>
            {label}
          </When>
        </Choose>
      </div>
    </components.Option>
  )
}

export default Option

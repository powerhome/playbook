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

  return (
    <components.Option {...props}>
      <div>
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

/* @flow */

import React from 'react'
import { components } from 'react-select'

import {
  User,
} from '../../'

const Option = (props: any) => {
  const {
    imageUrl,
  } = props.data
  const { valueComponent } = props.selectProps

  return (
    <components.Option {...props}>
      <div>
        <Choose>
          <When condition={!valueComponent && imageUrl}>
            <User
                align="left"
                avatarUrl={imageUrl}
                name={props.label}
                orientation="horizontal"
            />
          </When>
          <When condition={valueComponent}>
            { valueComponent(props.data) }
          </When>
          <Otherwise>
            {props.label}
          </Otherwise>
        </Choose>
      </div>
    </components.Option>
  )
}

export default Option

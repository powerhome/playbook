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
  console.log("props", props)
  console.log(valueComponent)
  return (
    <components.Option {...props}>
      <div>
        <Choose>
          <When condition={false}>
            <User
                align="left"
                avatarUrl={imageUrl}
                name={props.label}
                orientation="horizontal"
            />
          </When>
          <When condition={false}>
            {props.label}
          </When>
          <When condition={true}>
            { valueComponent(props.data) }
          </When>
        </Choose>
      </div>
    </components.Option>
  )
}

export default Option

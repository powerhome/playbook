/* @flow */

import React from 'react'
import { components } from 'react-select'

import {
  Flex,
  TextInput,
} from '../..'

type Props = {
  selectProps: any,
}

const TypeaheadControl = (props: Props) => (
  <div className="pb_typeahead_wrapper">
    <TextInput
        label={props.selectProps.label}
    >
      <Flex>
        <components.Control
            className="text_input"
            {...props}
        />
      </Flex>
    </TextInput>
  </div>
)

export default TypeaheadControl

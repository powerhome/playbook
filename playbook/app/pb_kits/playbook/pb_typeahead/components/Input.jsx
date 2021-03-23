/* @flow */

import React from 'react'
import { components } from 'react-select'
import { Flex, Icon } from '../../'

const Input = (props: any) => (
  <Flex
      align="center"
  >
    <If condition={props.selectProps.plusIcon}>
      <Icon
          className="typeahead-plus-icon"
          icon="plus"
      />
    </If>
    <components.Input
        className="input"
        {...props}
    />
  </Flex>
)

export default Input

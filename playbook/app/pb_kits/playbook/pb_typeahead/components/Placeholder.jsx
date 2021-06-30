/* @flow */

import React from 'react'
import { components } from 'react-select'

import Flex from '../../pb_flex/_flex'
import Icon from '../../pb_icon/_icon'

const Placeholder = (props: any) => (
  <>
    <Flex
        align="center"
        className="placeholder"
    >
      <components.IndicatorsContainer
          {...props}
      />
      <If condition={props.selectProps.plusIcon}>
        <Icon
            className="typeahead-plus-icon"
            icon="plus"
        />
      </If>
    </Flex>
  </>
)

export default Placeholder

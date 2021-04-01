/* @flow */

import React from 'react'
import { Flex, Icon } from '../../'
import { components } from 'react-select'

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

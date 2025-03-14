import React from 'react'
import { components } from 'react-select'

import Flex from '../../pb_flex/_flex'
import Icon from '../../pb_icon/_icon'

type PlaceholderProps = {
  children: React.ReactNode,
  selectProps: {
    plusIcon?: boolean,
  },
}

const Placeholder = (props: PlaceholderProps): React.ReactElement => (
  <>
    <Flex
        align="center"
        className="placeholder"
    >
      <components.IndicatorsContainer
          {...props}
      />
      {props.selectProps.plusIcon &&
        <Icon
            className="typeahead-plus-icon"
            icon="plus"
        />
      }
    </Flex>
  </>
)

export default Placeholder

import React from 'react'
import { components, PlaceholderProps as ReactSelectPlaceholderProps } from 'react-select'

import Flex from '../../pb_flex/_flex'
import Icon from '../../pb_icon/_icon'

interface CustomSelectProps {
  plusIcon?: boolean;
}

type PlaceholderProps = ReactSelectPlaceholderProps & {
  selectProps: ReactSelectPlaceholderProps['selectProps'] & CustomSelectProps;
};

const Placeholder = (props: PlaceholderProps): JSX.Element => (
  <>
    <Flex
        align="center"
        className="placeholder"
    >
      <components.IndicatorsContainer
          {...props}
      />
      {props.selectProps.plusIcon && (
        <Icon
            className="typeahead-plus-icon"
            icon="plus"
        />
      )}
    </Flex>
  </>
)

export default Placeholder

import React from 'react'
import { components } from 'react-select'

import { ValueContainerProps } from 'react-select'

const ValueContainer = (props: ValueContainerProps): JSX.Element => (
  <components.ValueContainer
      className="text_input_value_container"
      {...props}
  />
)

export default ValueContainer

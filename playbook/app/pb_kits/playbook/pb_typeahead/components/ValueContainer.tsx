import React from 'react'
import { components } from 'react-select'

type ValueContainerProps = {
  children: React.ReactNode,
}

const ValueContainer = (props: ValueContainerProps): React.ReactElement => (
  <components.ValueContainer
      className="text_input_value_container"
      {...props}
  />
)

export default ValueContainer

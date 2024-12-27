import React from 'react'
import { components } from 'react-select'

const ValueContainer = (props: any): JSX.Element => (
  <components.ValueContainer
      className="text_input_value_container"
      {...props}
  />
)

export default ValueContainer

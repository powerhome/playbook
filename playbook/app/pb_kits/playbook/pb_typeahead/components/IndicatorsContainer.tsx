import React from 'react'
import { components } from 'react-select'

const IndicatorsContainer = (props: any): JSX.Element => (
  <components.IndicatorsContainer
      className="text_input_indicators"
      {...props}
  />
)

export default IndicatorsContainer

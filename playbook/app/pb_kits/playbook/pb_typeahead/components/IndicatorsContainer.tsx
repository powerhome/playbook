import React from 'react'
import { components } from 'react-select'

import { IndicatorsContainerProps } from 'react-select'

const IndicatorsContainer = (props: IndicatorsContainerProps<unknown>): JSX.Element => (
  <components.IndicatorsContainer
      className="text_input_indicators"
      {...props}
  />
)

export default IndicatorsContainer

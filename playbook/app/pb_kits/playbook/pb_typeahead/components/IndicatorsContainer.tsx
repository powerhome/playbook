import React from 'react'
import { components } from 'react-select'

type IndicatorsContainerProps = {
  children: React.ReactNode,
}


const IndicatorsContainer = (props: IndicatorsContainerProps): React.ReactElement => (
  <components.IndicatorsContainer
      className="text_input_indicators"
      {...props}
  />
)

export default IndicatorsContainer

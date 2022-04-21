/* eslint-disable flowtype/no-types-missing-file-annotation */

// React Pure component - do not use state!
import React from 'react'
import ExampleFullTemplate from './Templates/ExampleFullTemplate'
import PropsValuesTemplate from './Templates/PropsValuesTemplate'
import TokensTemplate from './Templates/TokensTemplate'
import Colors from './Colors'

const VisualGuidelines = (): React.ReactElement => (
  <React.Fragment>
    <Colors />
    <ExampleFullTemplate />
    <PropsValuesTemplate />
    <TokensTemplate />
  </React.Fragment>
)

export default VisualGuidelines

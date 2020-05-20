/* @flow */

import React from 'react'
import { Caption } from '../../'

type ResultsCountProps = {
  results?: ?number
}
const ResultsCount = ({ results }: ResultsCountProps) => (
  <Caption
      className="filter-results"
      size="xs"
  >
    <If condition={results}>
      {`${results} `}
      {results == 1 ? 'Result' : 'Results'}
    </If>
  </Caption>
)

export default ResultsCount

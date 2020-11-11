/* @flow */

import React from 'react'
import { Caption, TitleCount } from '../../'

const resultsText = (results: number): string => results == 1 ? 'Result' : 'Results'

type ResultsCountProps = {
  results?: ?number,
  title?: boolean,
}
const ResultsCount = ({ dark, results, title }: ResultsCountProps) => (
  <Choose>
    <When condition={results && title}>
      <TitleCount
          dark={dark}
          align="center"
          count={results}
          title={`${resultsText(results)}:`}
      />
    </When>
    <When condition={results}>
      <Caption
          dark={dark}
          className="filter-results"
          size="xs"
          text={`${results} ${resultsText(results)}`}
      />
    </When>
    <Otherwise>
      <div />
    </Otherwise>
  </Choose>
)

export default ResultsCount

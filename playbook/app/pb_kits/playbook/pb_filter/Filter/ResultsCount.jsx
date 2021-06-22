/* @flow */

import React from 'react'

import Caption from '../../pb_caption/_caption'
import TitleCount from '../../pb_title_count/_title_count'

const resultsText = (results: number): string => results == 1 ? 'Result' : 'Results'

type ResultsCountProps = {
  dark?: boolean,
  results?: ?number,
  title?: boolean,
}
const ResultsCount = ({ dark, results, title }: ResultsCountProps) => (
  <Choose>
    <When condition={results && title}>
      <TitleCount
          align="center"
          count={results}
          dark={dark}
          title={`${resultsText(results)}:`}
      />
    </When>
    <When condition={results}>
      <Caption
          className="filter-results"
          dark={dark}
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

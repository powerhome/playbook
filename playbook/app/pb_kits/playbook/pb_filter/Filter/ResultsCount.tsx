import React from 'react'

import Caption from '../../pb_caption/_caption'
import TitleCount from '../../pb_title_count/_title_count'

const resultsText = (results: number): string => results == 1 ? 'Result' : 'Results'

type ResultsCountProps = {
  dark?: boolean,
  results?: number | null,
  title?: boolean,
}
const ResultsCount = ({ dark, results, title }: ResultsCountProps): React.ReactElement => {
  
  const resultTitle = () => {
    if (results == null) return null
    return (
      <TitleCount
          align="center"
          count={results}
          dark={dark}
          title={`${resultsText(results)}:`}
      />
    )
  }

  const justResults = () => {
    if (results == null) return null
    return (
      <Caption
          className="filter-results"
          dark={dark}
          size="xs"
          text={`${results} ${resultsText(results)}`}
      />
    )
  }

  const displayResultsCount = () => {
    if (results != null && results >=0 && title) {
      return (
        <>
          {resultTitle()}
        </>
      )
    } else if (results !=null && results >=0 ) {
      return (
        <>
          {justResults()}
        </>
      )
    } else {
      return (
        <div />
      )
    }
  }
  
  return (
    <>
      {displayResultsCount()}
    </>
  )
}

export default ResultsCount

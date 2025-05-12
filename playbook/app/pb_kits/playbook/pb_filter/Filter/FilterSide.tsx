import React from 'react'

import { FilterDescription } from './CurrentFilters'
import FilterBackground, { FilterBackgroundProps } from './FilterBackground'
import ResultsCount from './ResultsCount'

import Flex from '../../pb_flex/_flex'
import SectionSeparator from '../../pb_section_separator/_section_separator'
import Card from '../../pb_card/_card'

export type FilterSideProps = {
  children?: React.ReactChild[] | React.ReactChild,
  filters?: FilterDescription,
  results?: number,
} & FilterBackgroundProps

const FilterSide = ({
  onSortChange,
  sortOptions,
  sortValue,
  filters,
  results,
  children,
  dark,
  maxHeight,
  minWidth,
  placement,
  popoverProps,
  ...bgProps
}: FilterSideProps): React.ReactElement => (
  <FilterBackground
      dark={dark}
      {...bgProps}
  >
    <Card.Body padding="sm">
      <Flex
          justify="start"
          orientation="row"
      >
        <ResultsCount
            dark={dark}
            results={results}
            title
        />
      </Flex>
    </Card.Body>
    <SectionSeparator dark={dark} />
    <Card.Body padding="sm">
      { children({ closePopover: () => ((true)) }) }
    </Card.Body>
  </FilterBackground>
)

export default FilterSide

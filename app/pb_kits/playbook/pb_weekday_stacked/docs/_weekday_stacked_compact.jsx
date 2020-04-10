import React from 'react'
import {
  Flex,
  // FlexItem,
  WeekdayStacked,
} from '../..'

const WeekdayStackedCompact = () => (
  <Flex spacing="evenly">
    <WeekdayStacked
        compact
        date={new Date('2019/11/4')}
        dayOnly
    />
    <WeekdayStacked
        compact
        date={new Date('2019/11/5')}
        dayOnly
    />
    <WeekdayStacked
        compact
        date={new Date('2019/11/6')}
        dayOnly
    />
    <WeekdayStacked
        compact
        date={new Date('2019/11/7')}
        dayOnly
    />
    <WeekdayStacked
        compact
        date={new Date('2019/11/8')}
        dayOnly
    />
    <WeekdayStacked
        compact
        date={new Date('2019/11/9')}
        dayOnly
    />
    <WeekdayStacked
        compact
        date={new Date('2019/11/10')}
        dayOnly
    />
  </Flex>
)

export default WeekdayStackedCompact

/* @flow */

import React from 'react'
import classnames from 'classnames'
import { buildCss } from '../utilities/props'
import { systemProps } from '../utilities/systemProps.js'

import { Body, DateYearStacked, Flex, FlexItem, Icon } from '../'

type DateRangeStackedProps = {
  className?: String | Array<String>,
  data?: String,
  dark?: Boolean,
  endDate: String,
  id?: String,
  startDate: String,
}

const DateRangeStacked = (props: DateRangeStackedProps) => {
  const { className, dark = false, endDate, startDate } = props
  const css = classnames(className, buildCss('pb_date_range_stacked'), systemProps(props))

  return (
    <div className={css}>
      <Flex vertical="center">
        <FlexItem>
          <DateYearStacked
              align="right"
              dark={dark}
              date={startDate}
          />
        </FlexItem>
        <FlexItem>
          <div>
            <Body
                color="light"
                tag="span"
            >
              <Icon
                  className="pb_date_range_stacked_arrow"
                  fixedWidth
                  icon="long-arrow-right"
              />
            </Body>
          </div>
        </FlexItem>
        <FlexItem>
          <DateYearStacked
              dark={dark}
              date={endDate}
          />
        </FlexItem>
      </Flex>
    </div>
  )
}

export default DateRangeStacked

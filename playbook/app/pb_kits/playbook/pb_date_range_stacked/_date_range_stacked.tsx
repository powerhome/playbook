import React from 'react'
import classnames from 'classnames'

import { buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'

import Body from '../pb_body/_body'
import Flex from '../pb_flex/_flex'
import FlexItem from '../pb_flex/_flex_item'
import DateYearStacked from '../pb_date_year_stacked/_date_year_stacked'
import Icon from '../pb_icon/_icon'

type DateRangeStackedProps = {
  className?: string | string[],
  data?: string,
  dark?: boolean,
  endDate: string,
  id?: string,
  startDate: string,
}

const DateRangeStacked = (props: DateRangeStackedProps) => {
  const { className, dark = false, endDate, startDate, data={} } = props
  const css = classnames(
    buildCss('pb_date_range_stacked'),
    globalProps(props),
    className
  )
  const dataProps = buildDataProps(data)

  return (
    <div {...dataProps} className={css}>
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

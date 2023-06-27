import React from 'react'
import classnames from 'classnames'
import { toMonth, toDay, toYear } from '../pb_kit/dateTime'

// import DateTime from '../pb_kit/dateTime'
import { buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'

import Body from '../pb_body/_body'
import Title from '../pb_title/_title'

type DateYearStackedProps = {
  align?: "left" | "center" | "right",
  className?: string | string[],
  dark?: boolean,
  data?: string,
  date: Date,
  id?: string,
}

const DateYearStacked = (props: DateYearStackedProps) => {
  const { align = 'left', className, dark = false, date, data={} } = props
  const dateTimestamp = date
  const css = classnames(
    buildCss('pb_date_year_stacked', align),
    globalProps(props),
    className
  )
  const dataProps = buildDataProps(data)

  return (
    <div {...dataProps}
    className={css}>
      <Title
          dark={dark}
          size={4}
          text={`${toDay(dateTimestamp)} ${toMonth(dateTimestamp).toUpperCase()}`}
      />
      <Body color="light">{toYear(dateTimestamp)}</Body>
    </div>
  )
}

export default DateYearStacked

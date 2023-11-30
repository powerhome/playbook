import React from 'react'
import classnames from 'classnames'

import { buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'
import DateTime from '../pb_kit/dateTime';

import Body from '../pb_body/_body'
import Title from '../pb_title/_title'

type DateYearStackedProps = {
  align?: "left" | "center" | "right",
  className?: string | string[],
  dark?: boolean,
  data?: string,
  date: Date,
  htmlOptions?: {[key: string]: string | number | boolean | Function},
  id?: string,
}

const DateYearStacked = (props: DateYearStackedProps) => {
  const { align = 'left', className, dark = false, date, data={} } = props
  const css = classnames(
    buildCss('pb_date_year_stacked', align),
    globalProps(props),
    className
  )
   const dataProps = buildDataProps(data)
   const htmlProps = buildHtmlProps(htmlOptions)

  return (
    <div 
        {...dataProps}
        {...htmlProps}
        className={css}
    >
      <Title
          dark={dark}
          size={4}
          text={`${DateTime.toDay(date)} ${DateTime.toMonth(date).toUpperCase()}`}
      />
      <Body color="light">{DateTime.toYear(date)}</Body>
    </div>
  )
}

export default DateYearStacked

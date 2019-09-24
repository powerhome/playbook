/* @flow */
/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'

type DateYearStackedProps = {
  align?: 'option_1' | 'option_2',
  className?: String,
  dark?: Boolean,
  data?: String,
  date?: String,
  id?: String,
  
}

const DateYearStacked = ({ align, className, dark, data, date, id }: DateYearStackedProps) => (
  <div>
    {`kit content`}
  </div>
)

export default DateYearStacked

import React from 'react'

import DatePicker from '../_date_picker'
import Icon from '../../pb_icon/_icon'

const DatePickerError = (props) => (
  <div>
    <DatePicker
        error={<>
          <Icon icon="warning" /> Invalid date. Please pick a valid date.
        </>}
        pickerId="date-picker-error"
        {...props}
    />
  </div>
)

export default DatePickerError

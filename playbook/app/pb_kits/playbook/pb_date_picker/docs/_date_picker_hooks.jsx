import React from 'react'

import DatePicker from '../_date_picker'

const DatePickerHooks = (props) => {
  // Define hooks
  const changeHook = () => {
    alert('date changed')
  }
  const openHook = () => {
    alert('calendar opened')
  }

  // Access flatpickr instances with picker ids and assign them variables
  window.addEventListener('DOMContentLoaded', () => {
    const fpChange = document.querySelector('#date-picker-hooks-onchange')._flatpickr
    const fpOpen = document.querySelector('#date-picker-hooks-onopen')._flatpickr

    // Push one or more hooks to flatpickr instance's Event config arrays
    fpChange.config.onChange.push(changeHook)
    fpOpen.config.onOpen.push(openHook)
  })

  return (
    <div>
      <DatePicker
          label="onChange"
          pickerId="date-picker-hooks-onchange"
          {...props}
      />
      <DatePicker
          label="onOpen"
          pickerId="date-picker-hooks-onopen"
          {...props}
      />
    </div>
  )
}

export default DatePickerHooks

import React, { useEffect } from 'react'
import { Button, DatePicker } from '../../'

const DatePickerFlatpickrMethods = () => {
  let fpInstance
  useEffect(() => {
    fpInstance = document.querySelector('#fp-methods')._flatpickr
  }, [])
  const clickHandlerClear = () => {
    fpInstance.clear()
  }
  const clickHandlerClose = () => {
    fpInstance.close()
  }
  const clickHandlerToday = () => {
    fpInstance.setDate(new Date(), true)
  }

  return (
    <div>
      <Button
          marginRight="sm"
          onClick={clickHandlerClose}
          text="Close"
      />
      <Button
          marginRight="sm"
          onClick={clickHandlerClear}
          text="Clear"
      />
      <Button
          onClick={clickHandlerToday}
          text="Today"
      />
      <DatePicker
          hideLabel
          marginTop="sm"
          pickerId="fp-methods"
      />
    </div>
  )
}

export default DatePickerFlatpickrMethods

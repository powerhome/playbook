import React, { useEffect } from 'react'
import { Button, DatePicker, FormGroup } from '../../'

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
      <FormGroup>
        <DatePicker
            hideLabel
            pickerId="fp-methods"
        />
        <Button
            onClick={clickHandlerClose}
            text="Close"
        />
        <Button
            onClick={clickHandlerClear}
            text="Clear"
            variant="secondary"
        />
        <Button
            onClick={clickHandlerToday}
            text="Today"
        />
      </FormGroup>
    </div>
  )
}

export default DatePickerFlatpickrMethods

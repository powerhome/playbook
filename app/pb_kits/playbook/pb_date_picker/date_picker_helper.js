import flatpickr from 'flatpickr'

const datePickerHelper = (config) => {
  const {
    disableDate,
    disableRange,
    disableWeekdays,
    format,
    maxDate,
    minDate,
    mode,
    pickerId,
  } = config

  const defaultDateGetter = () => {
    if (mode === 'single') {
      return new Date()
    } else if (mode === 'range') {
      const today = new Date()
      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)
      return [today, tomorrow]
    }
  }
  const disabledParser = () => {
    if (disableDate) {
      return disableDate
    } else if (disableRange) {
      return disableRange
    } else {
      return []
    }
  }

  flatpickr(`#${pickerId}`, {
    allowInput: true,
    dateFormat: format,
    defaultDate: defaultDateGetter(),
    disable: disableWeekdays ? [
      (date) => {
        const weekdayObj = {
          Sunday: 0,
          Monday: 1,
          Tuesday: 2,
          Wednesday: 3,
          Thursday: 4,
          Friday: 5,
          Saturday: 6,
        }
        return (
          // try to refactor with for loop
          date.getDay() === weekdayObj[disableWeekdays[0]] ||
          date.getDay() === weekdayObj[disableWeekdays[1]] ||
          date.getDay() === weekdayObj[disableWeekdays[2]] ||
          date.getDay() === weekdayObj[disableWeekdays[3]] ||
          date.getDay() === weekdayObj[disableWeekdays[4]] ||
          date.getDay() === weekdayObj[disableWeekdays[5]] ||
          date.getDay() === weekdayObj[disableWeekdays[6]]
        )
      },
    ] : disabledParser(),
    maxDate: maxDate,
    minDate: minDate,
    mode: mode,
    static: true,
  })

  const picker = document.querySelector(`#${pickerId}`)._flatpickr

  picker.input.addEventListener('input', (e) => {
    picker.input.setAttribute('value', e.target.value)
    const variant = picker.config.mode
    if (variant === 'single' && e.target.value.split('').length === 10) {
      picker.setDate(e.target.value)
    } else if (variant === 'range' && e.target.value.split('').length === 24) {
      picker.setDate(e.target.value)
    }
  })
}

export default datePickerHelper

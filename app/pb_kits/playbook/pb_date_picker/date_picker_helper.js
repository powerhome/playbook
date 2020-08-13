import flatpickr from 'flatpickr'

const datePickerHelper = (config) => {
  const {
    defaultDate,
    disableDate,
    disableRange,
    disableWeekdays,
    format,
    maxDate,
    minDate,
    mode,
    onChange,
    pickerId,
    readOnly,
  } = config

  const defaultDateGetter = () => {
    if (defaultDate !== '') {
      if (defaultDate === 'blank') {
        return ''
      } else {
        return defaultDate
      }
    }
    if (mode === 'single' && defaultDate === '') {
      return new Date()
    } else if (mode === 'range' && defaultDate === '') {
      const today = new Date()
      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)
      return [today, tomorrow]
    }
  }
  const disabledParser = () => {
    if (disableDate && disableDate.length > 0) {
      return disableDate
    } else if (disableRange && disableRange.length > 0) {
      return disableRange
    } else {
      return []
    }
  }

  flatpickr(`#${pickerId}`, {
    allowInput: !readOnly,
    dateFormat: format,
    defaultDate: defaultDateGetter(),
    disable: disableWeekdays && disableWeekdays.length > 0 ? [
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
    onChange: onChange || [],
    static: true,
  })

  document.querySelector(`#${pickerId}`).addEventListener('input', (e) => {
    const picker = document.querySelector(`#${pickerId}`)._flatpickr
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

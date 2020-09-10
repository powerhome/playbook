import flatpickr from 'flatpickr'

const datePickerHelper = (config) => {
  const {
    allowInput,
    defaultDate,
    disableDate,
    disableRange,
    disableWeekdays,
    format,
    hideIcon,
    maxDate,
    minDate,
    mode,
    pickerId,
    yearRange,
  } = config

  // ===========================================================
  // |                   Hook Definitions                      |
  // ===========================================================

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
  const calendarResizer = () => {
    const cal = document.querySelector(`#cal-${pickerId}.open`)
    const parentInput = cal.parentElement
    if (cal.getBoundingClientRect().right > window.innerWidth) {
      parentInput.style.display = 'flex'
      parentInput.style.justifyContent = 'center'
    }
    if (cal.offsetWidth <= parentInput.offsetWidth) {
      parentInput.style.display = ''
      parentInput.style.justifyContent = ''
    }
  }

  // ===========================================================
  // |             Flatpickr initializer w/ config             |
  // ===========================================================

  flatpickr(`#${pickerId}`, {
    disableMobile: true,
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
    nextArrow: '<i class="far fa-angle-right"></i>',
    onOpen: [() => {
      calendarResizer()
      window.addEventListener('resize', calendarResizer)
    }],
    onClose: [() => {
      window.removeEventListener('resize', calendarResizer)
    }],
    onYearChange: [],
    prevArrow: '<i class="far fa-angle-left"></i>',
    static: true,
  })

  // ===========================================================
  //                 Additional JS Functionality               |
  // ===========================================================

  // Assign dynamically sourced flatpickr instance to variable
  const picker = document.querySelector(`#${pickerId}`)._flatpickr
  picker.innerContainer.parentElement.id = `cal-${pickerId}`

  // replace year selector with dropdown
  picker.yearElements[0].parentElement.innerHTML = `<select class="numInput cur-year" type="number" tabIndex="-1" aria-label="Year" id="year-${pickerId}"></select>`

  // create html option tags for desired years
  let years = ''
  for (let year = yearRange[1]; year >= yearRange[0]; year--) {
    years += `<option value="${year}">${year}</option>`
  }

  // variablize each dropdown selecttor
  const dropdown = document.querySelector(`#year-${pickerId}`)

  // inject year options into dropdown and assign it the flatpickr's current year value
  dropdown.innerHTML = years
  dropdown.value = picker.currentYear

  // whenever a new year is selected from dropdown update flatpickr's current year value
  dropdown.addEventListener('input', (e) => {
    picker.changeYear(Number(e.target.value))
  })

  // two way binding
  const yearChangeHook = () => {
    dropdown.value = picker.currentYear
  }
  picker.config.onYearChange.push(yearChangeHook)

  // click handling for Calendar Icon
  if (!hideIcon){
    document.querySelector(`#cal-icon-${pickerId}`).addEventListener('click', () => {
      picker.toggle()
    })
  }

  // Adding dropdown icons to year and month selects
  picker.monthElements[0].insertAdjacentHTML('afterend', '<i class="far fa-angle-down month-dropdown-icon"></i>')
  dropdown.insertAdjacentHTML('afterend', '<i class="far fa-angle-down year-dropdown-icon" id="test-id"></i>')

  // Set input value attribute on page load
  picker.input.setAttribute('value', picker.input.value)
  // logic for updating value when typing
  document.querySelector(`#${pickerId}`).addEventListener('input', (e) => {
    picker.input.setAttribute('value', e.target.value)
    const variant = picker.config.mode
    if (variant === 'single' && e.target.value.split('').length === 10) {
      picker.setDate(e.target.value)
      dropdown.value = picker.currentYear
    } else if (variant === 'range' && e.target.value.split('').length === 24) {
      picker.setDate(e.target.value)
      dropdown.value = picker.currentYear
    }
  })
  if (allowInput){
    picker.input.removeAttribute('readonly')
  }
}

export default datePickerHelper

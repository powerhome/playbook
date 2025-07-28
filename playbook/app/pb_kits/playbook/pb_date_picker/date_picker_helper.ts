import flatpickr from 'flatpickr'
import { Instance } from "flatpickr/dist/types/instance"
import { BaseOptions } from 'flatpickr/dist/types/options'
import monthSelectPlugin from 'flatpickr/dist/plugins/monthSelect'
import weekSelect from "flatpickr/dist/plugins/weekSelect/weekSelect"
import timeSelectPlugin from './plugins/timeSelect'
import quickPickPlugin from './plugins/quickPick'
import { getAllIcons } from '../utilities/icons/allicons';

declare global { interface Window { __pbSeenOnce?: Set<string> } }
window.__pbSeenOnce ||= new Set<string>() 

const angleDown = getAllIcons().angleDown.string

const getPositionElement = (element: string | Element) => {
  return (typeof element === 'string') ? document.querySelectorAll(element)[0] : element
}

type DatePickerConfig = {
  closeOnSelect?: boolean,
  customQuickPickDates: { override: boolean, dates: any[] },
  disableDate?: number[],
  disableRange?: number[],
  disableWeekdays?: number[],
  format?: string,
  pickerId?: ArrayLike<Node> | Node | string,
  required: boolean,
  hideIcon?: boolean;
  inLine?: boolean,
  onChange: (dateStr: string, selectedDates: Date[]) => void,
  selectionType?: "month" | "week" | "quickpick" | "",
  onClose: (dateStr: Date[] | string, selectedDates: Date[] | string) => void,
  showTimezone?: boolean,
  staticPosition: boolean,
  thisRangesEndToday?: boolean,
  timeCaption?: string,
  timeFormat?: string,
  yearRange: number[],
  controlsStartId?: string,
    controlsEndId?: string,
    syncStartWith?: string,
    syncEndWith?: string,
} & Pick<BaseOptions, "allowInput" | "defaultDate" | "enableTime" | "maxDate" | "minDate" | "mode" | "plugins" | "position" | "positionElement" >

const datePickerHelper = (config: DatePickerConfig, scrollContainer: string | HTMLElement) => {
  const noop = () => {
    // intentionally left empty as a no-op placeholder
  }

  const {
    allowInput,
    closeOnSelect = true,
    customQuickPickDates = { override: true, dates: [] },
    defaultDate,
    disableDate,
    disableRange,
    disableWeekdays,
    enableTime,
    format,
    maxDate,
    minDate,
    mode,
    onChange = noop,
    onClose = noop,
    pickerId,
    plugins,
    position = "auto",
    positionElement,
    required,
    selectionType,
    showTimezone,
    staticPosition = true,
    thisRangesEndToday = false,
    timeCaption = 'Select Time',
    timeFormat = 'at h:i K',
    yearRange,
    controlsStartId,
    controlsEndId,
    syncStartWith,
    syncEndWith,
  } = config

  // ===========================================================
  // |                   Hook Definitions                      |
  // ===========================================================

  const defaultDateGetter = () => {
  const pickerInput = document.querySelector<HTMLElement & { [x: string]: any }>(`#${pickerId}`)._flatpickr

  const inTurboFrame = pickerInput?.closest('turbo-frame') !== null
  const fieldValue   = (pickerInput?.value ?? '').trim()
  const seenBefore   = window.__pbSeenOnce.has(pickerId as string)

  if (!inTurboFrame) {
    return defaultDate === '' ? null : defaultDate
  }

   if (fieldValue) return fieldValue

  // User submitted empty value, keep empty
  if (seenBefore) return null

  // Show default date on first render
  window.__pbSeenOnce.add(pickerId as string)
  return defaultDate === '' ? null : defaultDate
  }

  const disabledWeekDays = () => {
    return (
      [
        (date: any) => {
          const weekdayObj: {
            [day: string]: number
          } = {
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
      ]
    )
  }

  const disabledParser = () => {
    const disabledArray=[]

    disableDate && disableDate.length > 0 && disabledArray.push(...disableDate)
    disableRange && disableRange.length > 0 && disabledArray.push(...disableRange)
    disableWeekdays && disableWeekdays.length > 0 && disabledArray.push(...disabledWeekDays())

    return disabledArray
  }
  const calendarResizer = () => {
    const cal = document.querySelector(`#cal-${pickerId}.open`) as HTMLElement
    const parentInput = cal.parentElement
    if (cal?.getBoundingClientRect().right > window.innerWidth) {
      parentInput.style.display = 'flex'
      parentInput.style.justifyContent = 'center'
    }
    if (cal.offsetWidth <= parentInput.offsetWidth) {
      parentInput.style.display = ''
      parentInput.style.justifyContent = ''
    }
  }

  const setPlugins = (thisRangesEndToday: boolean, customQuickPickDates: any) => {
    const pluginList = []

    // month and week selection
    if (selectionType === "month" || plugins.length > 0) {
      pluginList.push(monthSelectPlugin({ shorthand: true, dateFormat: 'F Y', altFormat: 'F Y' }))
    } else if ( selectionType === "week") {
      pluginList.push(weekSelect())

    } else if (selectionType === "quickpick") {
      //------- QUICKPICK VARIANT PLUGIN -------------//
      pluginList.push(quickPickPlugin(thisRangesEndToday, customQuickPickDates, defaultDate as string))
    }

    // time selection
    if (enableTime) pluginList.push(timeSelectPlugin({ caption: timeCaption, showTimezone: showTimezone}))

    return pluginList
  }

  const getDateFormat = () => {
    return enableTime ? `${format} ${timeFormat}` : format
  }

  // Attach / detach to / from scroll events
  const initialPicker = document.querySelector<HTMLElement & { [x: string]: any }>(`#${pickerId}`)._flatpickr
  const scrollEvent = () => {
    initialPicker._positionCalendar()
  }
  function attachToScroll(scrollParent: string | HTMLElement) {
    document.querySelectorAll(scrollParent as string)[0]?.addEventListener("scroll", scrollEvent, { passive: true })
  }
  function detachFromScroll(scrollParent: string | HTMLElement = document.body) {
    document.querySelectorAll(scrollParent as string)[0]?.removeEventListener("scroll", scrollEvent)
  }

  // two way binding
  const yearChangeHook = (fp: Instance) => {
      const yearInput = document.querySelector(`#year-${fp.input.id}`) as HTMLInputElement
      yearInput.value = fp.currentYear?.toString()
  }

  const handleDatePickerChange = (fp: Instance, selectedDates: Date[]) => {
    const inputEl = fp.input

    if (inputEl) {
      const inlineDatePickerElem = inputEl.closest('.inline-date-picker')
      if (inlineDatePickerElem) {
        if (selectedDates && selectedDates.length > 0) {
          inlineDatePickerElem.classList.add('show-angle-down-icon')
        } else {
          inlineDatePickerElem.classList.remove('show-angle-down-icon')
        }
      }
    }
  }

  // ===========================================================
  // |             Flatpickr initializer w/ config             |
  // ===========================================================

  flatpickr(`#${pickerId}`, {
    allowInput,
    closeOnSelect,
    disableMobile: true,
    dateFormat: getDateFormat(),
    defaultDate: defaultDateGetter(),
    disable: disabledParser(),
    enableTime,
    locale: {
      rangeSeparator: ' to '
    },
    maxDate,
    minDate,
    mode,
    nextArrow: '<i class="far fa-angle-right"></i>',
    onOpen: [() => {
      calendarResizer()
      window.addEventListener('resize', calendarResizer)
      if (!staticPosition && scrollContainer) attachToScroll(scrollContainer)
    }],
    onClose: [(selectedDates, dateStr) => {
      window.removeEventListener('resize', calendarResizer)
      if (!staticPosition && scrollContainer) detachFromScroll(scrollContainer as HTMLElement)
      onClose(selectedDates, dateStr)
    }],
    onChange: [(selectedDates, dateStr, fp) => {
      handleDatePickerChange(fp, selectedDates)
      yearChangeHook(fp)
      onChange(dateStr, selectedDates)
    }],
    onYearChange: [(_selectedDates, _dateStr, fp) => {
      yearChangeHook(fp)
    }],
    plugins: setPlugins(thisRangesEndToday, customQuickPickDates),
    position,
    positionElement: getPositionElement(positionElement),
    prevArrow: '<i class="far fa-angle-left"></i>',
    static: staticPosition,
  })

  // Assign dynamically sourced flatpickr instance to variable
  const picker = document.querySelector<HTMLElement & { [x: string]: any }>(`#${pickerId}`)._flatpickr
  picker.innerContainer.parentElement.id = `cal-${pickerId}`

  // replace year selector with dropdown
  picker.yearElements[0].parentElement.innerHTML = `<select class="numInput cur-year" type="number" tabIndex="-1" aria-label="Year" id="year-${pickerId}"></select>`

  // create html option tags for desired years
  let years = ''
  for (let year = yearRange[1]; year >= yearRange[0]; year--) {
    years += `<option value="${year}">${year}</option>`
  }

  // variablize each dropdown selector
  const dropdown = document.querySelector<HTMLElement & { [x: string]: any }>(`#year-${pickerId}`)

  // inject year options into dropdown and assign it the flatpickr's current year value
  dropdown.innerHTML = years
  dropdown.value = picker.currentYear

  // whenever a new year is selected from dropdown update flatpickr's current year value
  dropdown.addEventListener('input', (e: Event & { target: { value: string}}) => {
    picker.changeYear(Number(e.target.value))
  })

  // Reverse month and year dropdown reset on form.reset()
  if (picker.input.form) {
    picker.input.form.addEventListener('reset', () => {
      // Code block triggers after form.reset() is called and executed
      setTimeout(() => {
        dropdown.value = picker.currentYear
        picker.monthsDropdownContainer.value = picker.currentMonth

        /* Reset date picker to default value on form.reset() */
        if (defaultDate){
          picker.setDate(defaultDate)
          yearChangeHook(picker)
        }
      }, 0)
    })
  }

  // === Automatic Sync Logic for 3 input range pattern===

  // If this is a quickpick that controls start and end
  if (selectionType === "quickpick" && (controlsStartId || controlsEndId)) {
    picker.config.onClose.push((selectedDates:string) => {
      const [start, end] = selectedDates;

      if (controlsStartId) {
        const startPicker = (document.querySelector(`#${controlsStartId}`) as HTMLElement & { _flatpickr?: any })?._flatpickr;
        startPicker?.setDate(start, true);
      }

      if (controlsEndId) {
        const endPicker = (document.querySelector(`#${controlsEndId}`) as HTMLElement & { _flatpickr?: any })?._flatpickr;
        endPicker?.setDate(end, true);
      }
    });
  }

  // If this is a start picker that syncs with a quickpick
  if (syncStartWith) {
    picker.config.onClose.push((selectedDates: string) => {
      if (selectedDates?.length) {
        const quickpick = (document.querySelector(`#${syncStartWith}`) as HTMLElement & { _flatpickr?: any })?._flatpickr;
        quickpick?.clear();
      }
    });
  }

  // If this is an end picker that syncs with a quickpick
  if (syncEndWith) {
    picker.config.onClose.push((selectedDates: string) => {
      if (selectedDates?.length) {
        const quickpick = (document.querySelector(`#${syncEndWith}`) as HTMLElement & { _flatpickr?: any })?._flatpickr;
        quickpick?.clear();
      }
    });
  }
// === End of Automatic Sync Logic ===

    
  // Adding dropdown icons to year and month select
  dropdown.insertAdjacentHTML('afterend', `<i class="year-dropdown-icon">${angleDown}</i>`)
  if (picker.monthElements[0].parentElement) {
    return picker.monthElements[0].insertAdjacentHTML('afterend', `<i class="month-dropdown-icon">${angleDown}</i>`)}
  // if (picker.weekElements[0].parentElement){
  //   return  picker.weekElements[0].insertAdjacentHTML('afterend', '<i class="far fa-angle-down year-dropdown-icon" id="test-id"></i>')
  // }

  // Remove readonly attribute for validation and or text input
  if (allowInput){
    picker.input.removeAttribute('readonly')
  }
  if (required){
    picker.input.removeAttribute('readonly')
    picker.input.addEventListener('keydown', (e: Event) => e.preventDefault())
    picker.input.style.caretColor = 'transparent'
    picker.input.style.cursor = 'pointer'
  }

  // Fix event bubbling bug on wrapper
  document.querySelector(`#${pickerId}`).parentElement.addEventListener('click', (e) => e.stopPropagation())
}

export default datePickerHelper

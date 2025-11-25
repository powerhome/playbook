import flatpickr from 'flatpickr'
import { Instance } from "flatpickr/dist/types/instance"
import { BaseOptions } from 'flatpickr/dist/types/options'
import monthSelectPlugin from 'flatpickr/dist/plugins/monthSelect'
import weekSelect from "flatpickr/dist/plugins/weekSelect/weekSelect"
import timeSelectPlugin from './plugins/timeSelect'
import quickPickPlugin from './plugins/quickPick'
import { getAllIcons } from '../utilities/icons/allicons';

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
  selectionType?: "month" | "week" | "quickpick" | "timeSelection" | "",
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
    if (defaultDate === '') {
      // For time-only selection needs a default date so flatpickr has something to work with internally (will not be displayed)
      if (selectionType === "timeSelection") {
        return new Date()
      }
      return null
    } else {
      return defaultDate
    }
  }

  // Helper function to get min/max years based on yearRange. If minDate/maxDate provided, grab year from those values
  const getMinMaxYears = () => {
    const [minYear, maxYear] = yearRange;

    const extractYear = (dateOption: typeof minDate | typeof maxDate): number | null => {
      if (!dateOption) return null;

      // If it's already a number, assume it's a year
      if (typeof dateOption === 'number') {
        return dateOption;
      }

      // If it's a string, extract year with regex
      if (typeof dateOption === 'string') {
        const match = dateOption.match(/\b(19|20)\d{2}\b/);
        return match ? parseInt(match[0], 10) : null;
      }

      // If it's a Date object, get the year directly
      if (dateOption instanceof Date) {
        return dateOption.getFullYear();
      }

      return null;
    };

    const setMinYear = minDate ? (extractYear(minDate) ?? minYear) : minYear;
    const setMaxYear = maxDate ? (extractYear(maxDate) ?? maxYear) : maxYear;

    return { setMinYear, setMaxYear };
  };

  const { setMinYear, setMaxYear } = getMinMaxYears()

  // Helper function to get min/max dates based on yearRange
  const getMinMaxDates = () => {
    const setMinDate = minDate || `01/01/${setMinYear}`
    const setMaxDate = maxDate || `12/31/${setMaxYear}`

    return { setMinDate, setMaxDate }
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
    // Skip calendar resizer and calendar/parentInput logicfor time-only selection (no calendar exists)
    if (selectionType === "timeSelection") return
    
    const cal = document.querySelector(`#cal-${pickerId}.open`) as HTMLElement
    if (!cal) return
    const parentInput = cal.parentElement
    if (!parentInput) return
    if (cal?.getBoundingClientRect().right > window.innerWidth) {
      parentInput.style.display = 'flex'
      parentInput.style.justifyContent = 'center'
    }
    if (cal.offsetWidth <= parentInput.offsetWidth) {
      parentInput.style.display = ''
      parentInput.style.justifyContent = ''
    }
  }

  const positionCalendarIfNeeded = (fp: Instance) => {
    const cal = document.querySelector(`#cal-${pickerId}`) as HTMLElement
    if (!cal) return

    const inputRect = fp.input.getBoundingClientRect()
    const h = cal.getBoundingClientRect().height || 300
    const spaceBelow = window.innerHeight - inputRect.bottom
    const spaceAbove = inputRect.top

    if (spaceBelow < h + 10 && spaceAbove >= h + 10) {
      if (staticPosition) {
        cal.style.top = 'auto'
        cal.style.bottom = 'calc(100% + 5px)'
      } else {
        cal.style.position = 'fixed'
        cal.style.top = `${Math.max(10, inputRect.top - h - 5)}px`
        cal.style.left = `${inputRect.left}px`
      }
    } else if (staticPosition) {
      cal.style.top = ''
      cal.style.bottom = ''
    } else {
      Object.assign(cal.style, { position: '', top: '', left: '', bottom: '', right: '', transform: '' })
      fp._positionCalendar()
    }
  }

  const setPlugins = (thisRangesEndToday: boolean, customQuickPickDates: any) => {
    const pluginList = []

    // time-only selection - use only timeSelect plugin
    if (selectionType === "timeSelection") {
      pluginList.push(timeSelectPlugin({ caption: timeCaption, showTimezone: showTimezone}))
      return pluginList
    }

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
    if (selectionType === "timeSelection") return timeFormat
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

  // Store resize / position handler reference for cleanup
  let resizeRepositionHandlerRef: (() => void) | null = null

  // ===========================================================
  // |             Flatpickr initializer w/ config             |
  // ===========================================================

  const { setMinDate, setMaxDate } = getMinMaxDates()

  flatpickr(`#${pickerId}`, {
    allowInput,
    closeOnSelect,
    disableMobile: true,
    dateFormat: getDateFormat(),
    defaultDate: defaultDateGetter(),
    disable: disabledParser(),
    enableTime,
    ...(selectionType === "timeSelection" && {
      noCalendar: true,
      enableTime: true,
    }),
    locale: {
      rangeSeparator: ' to '
    },
    maxDate: setMaxDate,
    minDate: setMinDate,
    mode,
    nextArrow: '<i class="far fa-angle-right"></i>',
    onOpen: [(_selectedDates, _dateStr, fp) => {
      // Skip calendar positioning/resizing for time-only selection
      if (selectionType !== "timeSelection") {
        calendarResizer()
        if (resizeRepositionHandlerRef) {
          window.removeEventListener('resize', resizeRepositionHandlerRef)
        }
        resizeRepositionHandlerRef = () => {
          calendarResizer()
          positionCalendarIfNeeded(fp)
        }
        window.addEventListener('resize', resizeRepositionHandlerRef)
        if (!staticPosition && scrollContainer) attachToScroll(scrollContainer)
        positionCalendarIfNeeded(fp)
      }
    }],
    onClose: [(selectedDates, dateStr) => {
      if (resizeRepositionHandlerRef) {
        window.removeEventListener('resize', resizeRepositionHandlerRef)
        resizeRepositionHandlerRef = null
      }
      if (!staticPosition && scrollContainer) detachFromScroll(scrollContainer as HTMLElement)
      onClose(selectedDates, dateStr)
    }],
    onChange: [(selectedDates, dateStr, fp) => {
      handleDatePickerChange(fp, selectedDates)
      // Skip year change hook for time-only selection
      if (selectionType !== "timeSelection") {
        yearChangeHook(fp)
      }
      onChange(dateStr, selectedDates)
    }],
    onYearChange: [(_selectedDates, _dateStr, fp) => {
      // Skip year change hook for time-only selection
      if (selectionType !== "timeSelection") {
        yearChangeHook(fp)
      }
    }],
    onReady: [(_selectedDates, _dateStr, fp) => {
      // Set up immediate removal of "at " prefix for time-only selection
      if (selectionType === "timeSelection") {
        // Remove immediately on ready
        if (fp.input.value) {
          fp.input.value = fp.input.value.replace(/^at\s+/i, '')
        }
        
        // Override the input's value setter to intercept and remove "at " immediately
        const input = fp.input
        const originalDescriptor = Object.getOwnPropertyDescriptor(input, 'value') || 
          Object.getOwnPropertyDescriptor(Object.getPrototypeOf(input), 'value')
        
        if (originalDescriptor && originalDescriptor.set) {
          Object.defineProperty(input, 'value', {
            get: originalDescriptor.get,
            set: function(newValue: string) {
              if (typeof newValue === 'string' && newValue.match(/^at\s+/i)) {
                newValue = newValue.replace(/^at\s+/i, '')
              }
              originalDescriptor.set!.call(this, newValue)
            },
            configurable: true
          })
        }
      }
    }],
    plugins: setPlugins(thisRangesEndToday, customQuickPickDates),
    position,
    positionElement: getPositionElement(positionElement),
    prevArrow: '<i class="far fa-angle-left"></i>',
    static: staticPosition,
  })

  // Assign dynamically sourced flatpickr instance to variable
  const picker = document.querySelector<HTMLElement & { [x: string]: any }>(`#${pickerId}`)._flatpickr


  // Skip all calendar setup for time-only selection
  if (selectionType !== "timeSelection") {
    picker.innerContainer.parentElement.id = `cal-${pickerId}`

  // replace year selector with dropdown
  picker.yearElements[0].parentElement.innerHTML = `<select class="numInput cur-year" type="number" tabIndex="-1" aria-label="Year" id="year-${pickerId}"></select>`

  // create html option tags for desired years
  let years = ''
  for (let year = setMaxYear; year >= setMinYear; year--) {
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
        const element = document.querySelector(`#${syncStartWith}`) as any;
        // Check if it's a Dropdown QuickPick (has _dropdownRef) or DatePicker QuickPick (has _flatpickr)
        if (element?._dropdownRef?.current) {
          element._dropdownRef.current.clearSelected();
        } else {
          const quickpick = element?._flatpickr;
          quickpick?.clear();
        }
      }
    });
  }

  // If this is an end picker that syncs with a quickpick
  if (syncEndWith) {
    picker.config.onClose.push((selectedDates: string) => {
      if (selectedDates?.length) {
        const element = document.querySelector(`#${syncEndWith}`) as any;
        // Check if it's a Dropdown QuickPick (has _dropdownRef) or DatePicker QuickPick (has _flatpickr)
        if (element?._dropdownRef?.current) {
          element._dropdownRef.current.clearSelected();
        } else {
          const quickpick = element?._flatpickr;
          quickpick?.clear();
        }
      }
    });
  }
// === End of Automatic Sync Logic ===

  // Adding dropdown icons to year and month select
  const dropdown = document.querySelector<HTMLElement & { [x: string]: any }>(`#year-${pickerId}`)
  if (dropdown) {
    dropdown.insertAdjacentHTML('afterend', `<i class="year-dropdown-icon">${angleDown}</i>`)
  }
  if (picker.monthElements && picker.monthElements[0]?.parentElement) {
    picker.monthElements[0].insertAdjacentHTML('afterend', `<i class="month-dropdown-icon">${angleDown}</i>`)
  }
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

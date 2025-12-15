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
    if (defaultDate === '') {
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

  // Store resize / position handler reference for cleanup
  let resizeRepositionHandlerRef: (() => void) | null = null

  // ===========================================================
  // |             Flatpickr initializer w/ config             |
  // ===========================================================

  const { setMinDate, setMaxDate } = getMinMaxDates()

  // Default Date + Min/Max Date Initialization Helper Functions section ----/
  const toDateObject = (dateValue: any): Date | null => {
    if (!dateValue) return null
    if (dateValue instanceof Date) return dateValue
    if (typeof dateValue === 'string') {
      const parsed = new Date(dateValue)
      return isNaN(parsed.getTime()) ? null : parsed
    }
    if (typeof dateValue === 'number') {
      return new Date(dateValue)
    }
    return null
  }

  // Formatting Date for Flatpickr
  const formatDateForFlatpickr = (dateValue: any): string | null => {
    const dateObj = toDateObject(dateValue)
    if (!dateObj) return null
    
    const year = dateObj.getFullYear()
    const month = String(dateObj.getMonth() + 1).padStart(2, '0')
    const day = String(dateObj.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  // Helper to check if defaultDate is earlier than minDate
  const isDefaultDateBeforeMinDate = (defaultDateValue: any, minDateValue: any): boolean => {
    if (!defaultDateValue || !minDateValue) return false
    
    const defaultDateObj = toDateObject(defaultDateValue)
    const minDateObj = toDateObject(minDateValue)
    
    if (!defaultDateObj || !minDateObj) return false

    const defaultDateOnly = new Date(defaultDateObj.getFullYear(), defaultDateObj.getMonth(), defaultDateObj.getDate())
    const minDateOnly = new Date(minDateObj.getFullYear(), minDateObj.getMonth(), minDateObj.getDate())
    
    return defaultDateOnly < minDateOnly
  }

  // Helper to check if defaultDate is later than maxDate
  const isDefaultDateAfterMaxDate = (defaultDateValue: any, maxDateValue: any): boolean => {
    if (!defaultDateValue || !maxDateValue) return false
    
    const defaultDateObj = toDateObject(defaultDateValue)
    const maxDateObj = toDateObject(maxDateValue)
    
    if (!defaultDateObj || !maxDateObj) return false
    
    const defaultDateOnly = new Date(defaultDateObj.getFullYear(), defaultDateObj.getMonth(), defaultDateObj.getDate())
    const maxDateOnly = new Date(maxDateObj.getFullYear(), maxDateObj.getMonth(), maxDateObj.getDate())
    
    return defaultDateOnly > maxDateOnly
  }

  const defaultDateValue: any = defaultDateGetter()
  // Only check for and out-of-range if user actually provided minDate/maxDate constraints
  const isBeforeMin = minDate && isDefaultDateBeforeMinDate(defaultDateValue, setMinDate)
  const isAfterMax = maxDate && isDefaultDateAfterMaxDate(defaultDateValue, setMaxDate)
  
  // Store these values for use in onClose handler
  const hasOutOfRangeDefault = (isBeforeMin || isAfterMax) && defaultDateValue
  
  // Temporarily adjust minDate/maxDate to allow defaultDate to render if it's out of range via user provided minDate/maxDate constraints
  const effectiveMinDate = isBeforeMin && defaultDateValue && minDate
    ? formatDateForFlatpickr(defaultDateValue) || setMinDate
    : setMinDate
  
  const effectiveMaxDate = isAfterMax && defaultDateValue && maxDate
    ? formatDateForFlatpickr(defaultDateValue) || setMaxDate
    : setMaxDate
  
  // End of Default Date + Min/Max Date Initialization Helper Functions section ----/
  
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
    maxDate: effectiveMaxDate,
    minDate: effectiveMinDate,
    mode,
    nextArrow: '<i class="far fa-angle-right"></i>',
    onOpen: [(_selectedDates, _dateStr, fp) => {
      // If defaultDate was out of range of a dev set min/max date, restore it when calendar opens (in situation where the input was manually cleared or the calendar was closed without selection)
      if (hasOutOfRangeDefault) {
        const dateObj = toDateObject(defaultDateValue)
        if (dateObj) {
          const inputIsBlank = !fp.input.value || fp.input.value.trim() === ''
          const noSelection = !fp.selectedDates || fp.selectedDates.length === 0
          
          if (inputIsBlank || noSelection) {
            const formattedDate = fp.formatDate(dateObj, getDateFormat())
            if (formattedDate) {
              fp.input.value = formattedDate
            }
            fp.selectedDates = [dateObj]
            fp.jumpToDate(dateObj)
            setTimeout(() => {
              yearChangeHook(fp)
            }, 0)
          }
        }
      }
      
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
    }],
    onClose: [(selectedDates, dateStr, fp) => {
      if (resizeRepositionHandlerRef) {
        window.removeEventListener('resize', resizeRepositionHandlerRef)
        resizeRepositionHandlerRef = null
      }
      if (!staticPosition && scrollContainer) detachFromScroll(scrollContainer as HTMLElement)
      
      // If defaultDate was out of range and no date was selected, preserve the default date
      if (hasOutOfRangeDefault && (!selectedDates || selectedDates.length === 0)) {
        const dateObj = toDateObject(defaultDateValue)
        if (dateObj && fp.input) {
          const formattedDate = fp.formatDate(dateObj, getDateFormat())
          if (formattedDate) {
            setTimeout(() => {
              if (fp.input && (!fp.selectedDates || fp.selectedDates.length === 0)) {
                fp.input.value = formattedDate
                fp.selectedDates = [dateObj]
                fp.jumpToDate(dateObj)
              }
            }, 0)
          }
        }
      }
      
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

  // If defaultDate was out of range, restore the original minDate/maxDate after initialization (defaultDate displayed, still cannot select dates outside the actual range via user provided minDate/maxDate constraints)
  if ((isBeforeMin || isAfterMax) && defaultDateValue) {
    const dateObj = toDateObject(defaultDateValue)
    const formattedDate = dateObj ? picker.formatDate(dateObj, getDateFormat()) : null
    
    setTimeout(() => {
      if (!dateObj || !picker.input || !formattedDate) return

      picker.setDate(dateObj, false)

      if (isBeforeMin && setMinDate && minDate) {
        picker.set('minDate', setMinDate)
      }
      if (isAfterMax && setMaxDate && maxDate) {
        picker.set('maxDate', setMaxDate)
      }
      picker.input.value = formattedDate

      picker.selectedDates = [dateObj]
      
      setTimeout(() => {
        yearChangeHook(picker)
      }, 0)
      
      // Restore function for out-of-range default dates
      const restoreOutOfRangeValue = () => {
        if (!picker.input) return
        
        const inputIsBlank = !picker.input.value || picker.input.value.trim() === ''
        const noSelection = !picker.selectedDates || picker.selectedDates.length === 0
        
        if (inputIsBlank || noSelection) {
          setTimeout(() => {
            if (picker.input && (!picker.input.value || picker.input.value.trim() === '')) {
              picker.input.value = formattedDate
            }
            if (!picker.selectedDates || picker.selectedDates.length === 0) {
              picker.selectedDates = [dateObj]
              if (picker.isOpen) {
                picker.jumpToDate(dateObj)
                picker.redraw()
                setTimeout(() => {
                  yearChangeHook(picker)
                }, 0)
              }
            }
          }, 0)
        }
      }
      
      const originalClear = picker.clear.bind(picker)
      picker.clear = function(...args: any[]) {
        const result = originalClear(...args)
        setTimeout(() => restoreOutOfRangeValue(), 0)
        return result
      }

      picker.input.addEventListener('input', restoreOutOfRangeValue)
      
      picker.config.onClose.push(() => {
        restoreOutOfRangeValue()
      })
    }, 10)
  }

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
        // Check if it's a React Dropdown (has _dropdownRef)
        if (element?._dropdownRef?.current) {
          element._dropdownRef.current.clearSelected();
        }
        // Check if it's a Rails Dropdown (has _pbDropdownInstance)
        else if (element?._pbDropdownInstance) {
          element._pbDropdownInstance.clearSelected();
        }
        // Check if it's a DatePicker QuickPick (has _flatpickr)
        else {
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
        // Check if it's a React Dropdown (has _dropdownRef)
        if (element?._dropdownRef?.current) {
          element._dropdownRef.current.clearSelected();
        }
        // Check if it's a Rails Dropdown (has _pbDropdownInstance)
        else if (element?._pbDropdownInstance) {
          element._pbDropdownInstance.clearSelected();
        }
        // Check if it's a DatePicker QuickPick (has _flatpickr)
        else {
          const quickpick = element?._flatpickr;
          quickpick?.clear();
        }
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

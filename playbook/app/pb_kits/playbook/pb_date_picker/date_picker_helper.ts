import flatpickr from 'flatpickr'
import { Instance } from "flatpickr/dist/types/instance"
import { BaseOptions } from 'flatpickr/dist/types/options'
import monthSelectPlugin from 'flatpickr/dist/plugins/monthSelect'
import weekSelect from "flatpickr/dist/plugins/weekSelect/weekSelect"
import timeSelectPlugin from './plugins/timeSelect'
import quickPickPlugin from './plugins/quickPick'
import { getAllIcons } from '../utilities/icons/allicons';
import {
  announceFloatingKitOpen,
  nextPortaledFloatingZIndex,
  positionDropdownPortalToWrapper,
  resolveFloatingOwnerId,
  resolvePortaledFloatingZIndex,
  resolvePortaledKitHost,
  kitRequiresPortaledFloatingUi,
  setFloatingOwnerAttribute,
  subscribeFloatingKitOpen,
  subscribeFloatingKitReposition,
} from '../utilities/floatingPortalHosts'

const { angleDown, angleLeft, angleRight } = getAllIcons()
const angleDownString = angleDown.string
const angleLeftString = angleLeft.string
const angleRightString = angleRight.string

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
  yearAscending?: boolean,
  yearRange: number[],
  controlsStartId?: string,
    controlsEndId?: string,
    syncStartWith?: string,
    syncEndWith?: string,
  /** React Dialog floating root; omit in Rails (DOM resolution only). */
  dialogPortalTarget?: HTMLElement | null,
} & Pick<BaseOptions, "allowInput" | "defaultDate" | "enableTime" | "maxDate" | "minDate" | "mode" | "plugins" | "position" | "positionElement" | "inline" >

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
    yearAscending,
    yearRange,
    controlsStartId,
    controlsEndId,
    syncStartWith,
    syncEndWith,
    dialogPortalTarget,
    inline = false,
  } = config

  const inputElForPortal =
    typeof document !== "undefined"
      ? document.querySelector<HTMLElement>(`#${String(pickerId)}`)
      : null
  const kitRootForPortal = inputElForPortal?.closest(".pb_date_picker_kit") as HTMLElement | null
  const portalHost =
    !inline && kitRootForPortal && kitRequiresPortaledFloatingUi(kitRootForPortal)
      ? resolvePortaledKitHost(kitRootForPortal, dialogPortalTarget ?? null)
      : null

  const floatingOwnerId = resolveFloatingOwnerId(kitRootForPortal)
  const effectiveStatic = portalHost ? false : staticPosition

  type DatePickerInputEl = HTMLElement & {
    _flatpickr?: Instance
    _pbDatePickerOpenUnsub?: () => void
  }

  const existingInput = document.querySelector(`#${String(pickerId)}`) as DatePickerInputEl | null
  if (existingInput?._pbDatePickerOpenUnsub) {
    existingInput._pbDatePickerOpenUnsub()
    delete existingInput._pbDatePickerOpenUnsub
  }
  if (existingInput?._flatpickr) {
    existingInput._flatpickr.destroy()
  }

  let portalAppendShell: HTMLElement | undefined

  const removePortalShell = (): void => {
    if (!portalHost) return

    const shellSelector = `[data-pb-date-picker-floating-shell="${String(pickerId)}"]`
    const shell =
      portalAppendShell?.isConnected
        ? portalAppendShell
        : (portalHost.querySelector(shellSelector) as HTMLElement | undefined)

    shell?.remove()
    portalAppendShell = undefined
  }

  const ensurePortalShell = (): HTMLElement | undefined => {
    if (!portalHost) return undefined
    if (portalAppendShell?.isConnected) return portalAppendShell

    const shellSelector = `[data-pb-date-picker-floating-shell="${String(pickerId)}"]`
    portalAppendShell =
      portalHost.querySelector(shellSelector) as HTMLElement | undefined

    if (!portalAppendShell) {
      portalAppendShell = document.createElement("div")
      portalAppendShell.className = "pb_date_picker_floating_shell pb_date_picker_kit"
      portalAppendShell.setAttribute(
        "data-pb-date-picker-floating-shell",
        String(pickerId),
      )
      portalAppendShell.addEventListener("mousedown", (e) => {
        e.stopPropagation()
      })
      portalAppendShell.addEventListener("click", (e) => {
        e.stopPropagation()
      })
      portalHost.appendChild(portalAppendShell)
    }

    setFloatingOwnerAttribute(portalAppendShell, floatingOwnerId)
    return portalAppendShell
  }

  const mountCalendarInPortalShell = (fp: Instance): void => {
    const shell = ensurePortalShell()
    if (!shell?.isConnected || !fp.calendarContainer) return
    if (fp.calendarContainer.parentElement !== shell) {
      shell.appendChild(fp.calendarContainer)
    }
  }

  let activePortalZIndex: string | undefined

  let unsubscribeFloatingReposition: (() => void) | null = null

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
    if (portalHost) {
      mountCalendarInPortalShell(fp)
      fp._positionCalendar()
      return
    }

    const cal = document.querySelector(`#cal-${pickerId}`) as HTMLElement
    if (!cal) return

    const inputRect = fp.input.getBoundingClientRect()
    const h = cal.getBoundingClientRect().height || 300
    const spaceBelow = window.innerHeight - inputRect.bottom
    const spaceAbove = inputRect.top

    if (spaceBelow < h + 10 && spaceAbove >= h + 10) {
      if (effectiveStatic) {
        cal.style.top = 'auto'
        cal.style.bottom = 'calc(100% + 5px)'
      } else {
        cal.style.position = 'fixed'
        cal.style.top = `${Math.max(10, inputRect.top - h - 5)}px`
        cal.style.left = `${inputRect.left}px`
      }
    } else if (effectiveStatic) {
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
  const scrollEvent = () => {
    const fp = document.querySelector<HTMLElement & { _flatpickr?: Instance }>(`#${pickerId}`)
      ?._flatpickr
    fp?._positionCalendar()
  }
  function attachToScroll(scrollParent: string | HTMLElement) {
    document.querySelectorAll(scrollParent as string)[0]?.addEventListener("scroll", scrollEvent, { passive: true })
  }
  function detachFromScroll(scrollParent: string | HTMLElement = document.body) {
    document.querySelectorAll(scrollParent as string)[0]?.removeEventListener("scroll", scrollEvent)
  }

  const yearSelectId = `year-${pickerId}`

  const yearDropdownFromCalendar = (fp: Instance): HTMLSelectElement | null => {
    return fp.calendarContainer?.querySelector<HTMLSelectElement>(`#${yearSelectId}`) ?? null
  }

  const yearDropdownIsReady = (fp: Instance): boolean => {
    const dropdown = yearDropdownFromCalendar(fp)
    return dropdown !== null && dropdown.options.length > 0
  }

  // two way binding
  const yearChangeHook = (fp: Instance) => {
    const yearInput = yearDropdownFromCalendar(fp)
    if (yearInput) {
      yearInput.value = fp.currentYear?.toString()
    }
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
    if (dateValue instanceof Date) {
      return isNaN(dateValue.getTime()) ? null : dateValue
    }
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
  const resolveDatePickerPortalWrapper = (input: HTMLElement): HTMLElement | null => {
    return (
      (input.closest(".date_picker_input_wrapper") as HTMLElement | null) ??
      (input.closest(".text_input_wrapper") as HTMLElement | null) ??
      (input.closest(".input_wrapper") as HTMLElement | null) ??
      (input.closest(".pb_date_picker_kit") as HTMLElement | null)
    )
  }

  const portalPositionFn: ((self: Instance) => void) | undefined = portalHost
    ? (self: Instance) => {
        mountCalendarInPortalShell(self)
        const shell = ensurePortalShell()
        const cal = self.calendarContainer
        if (!cal || !shell) return
        const wrap = resolveDatePickerPortalWrapper(self.input)
        const host = shell.parentElement as HTMLElement | null
        if (!wrap || !host) return
        positionDropdownPortalToWrapper({
          panel: cal,
          wrapperViewportRect: wrap.getBoundingClientRect(),
          positionHost: host,
          matchWrapperWidth: false,
          zIndex: activePortalZIndex,
        })
      }
    : undefined

  const setupYearMonthDropdowns = (fp: Instance) => {
    if (yearDropdownIsReady(fp) || !fp.yearElements?.[0]?.parentElement) return

    fp.yearElements[0].parentElement.innerHTML = `<select class="numInput cur-year" type="number" tabIndex="-1" aria-label="Year" id="${yearSelectId}"></select>`

    let years = ''
    if (yearAscending) {
      for (let year = setMinYear; year <= setMaxYear; year++) {
        years += `<option value="${year}">${year}</option>`
      }
    } else {
      for (let year = setMaxYear; year >= setMinYear; year--) {
        years += `<option value="${year}">${year}</option>`
      }
    }

    const dropdown = yearDropdownFromCalendar(fp)
    if (!dropdown) return

    dropdown.innerHTML = years
    dropdown.value = String(fp.currentYear)

    dropdown.addEventListener('input', (e: Event & { target: { value: string }}) => {
      fp.changeYear(Number(e.target.value))
    })

    if (fp.input.form) {
      fp.input.form.addEventListener('reset', () => {
        setTimeout(() => {
          dropdown.value = String(fp.currentYear)
          if (fp.monthsDropdownContainer) {
            fp.monthsDropdownContainer.value = String(fp.currentMonth)
          }

          if (defaultDate) {
            fp.setDate(defaultDate)
            yearChangeHook(fp)
          }
        }, 0)
      })
    }

    if (!dropdown.nextElementSibling?.classList.contains('year-dropdown-icon')) {
      dropdown.insertAdjacentHTML('afterend', `<i class="year-dropdown-icon">${angleDownString}</i>`)
    }
    if (
      fp.monthElements[0]?.parentElement &&
      !fp.calendarContainer?.querySelector('.month-dropdown-icon')
    ) {
      fp.monthElements[0].insertAdjacentHTML('afterend', `<i class="month-dropdown-icon">${angleDownString}</i>`)
    }
  }

  const assignCalendarId = (fp: Instance): void => {
    const calEl = fp.calendarContainer ?? fp.innerContainer?.parentElement
    if (calEl) {
      calEl.id = `cal-${pickerId}`
    }
  }

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
    nextArrow: `<div style="height: 14px;">${angleRightString}</div>`,
    onOpen: [(_selectedDates, _dateStr, fp) => {
      activePortalZIndex = portalHost
        ? resolvePortaledFloatingZIndex(
            portalHost,
            nextPortaledFloatingZIndex(),
          )
        : undefined
      if (portalHost) {
        mountCalendarInPortalShell(fp)
      }
      if (portalAppendShell) {
        portalAppendShell.style.zIndex = activePortalZIndex
        setFloatingOwnerAttribute(portalAppendShell, floatingOwnerId)
      }
      if (fp.calendarContainer) {
        fp.calendarContainer.style.zIndex = activePortalZIndex
        setFloatingOwnerAttribute(fp.calendarContainer, floatingOwnerId)
      }
      announceFloatingKitOpen('date-picker', floatingOwnerId)

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
      if (!effectiveStatic && scrollContainer) attachToScroll(scrollContainer)
      if (portalHost) {
        unsubscribeFloatingReposition = subscribeFloatingKitReposition(() => {
          positionCalendarIfNeeded(fp)
        })
      }
      assignCalendarId(fp)
      positionCalendarIfNeeded(fp)
      setupYearMonthDropdowns(fp)
    }],
    onDestroy: [() => {
      if (unsubscribeFloatingReposition) {
        unsubscribeFloatingReposition()
        unsubscribeFloatingReposition = null
      }
      if (resizeRepositionHandlerRef) {
        window.removeEventListener('resize', resizeRepositionHandlerRef)
        resizeRepositionHandlerRef = null
      }
      removePortalShell()
    }],
    onClose: [(selectedDates, dateStr, fp) => {
      if (unsubscribeFloatingReposition) {
        unsubscribeFloatingReposition()
        unsubscribeFloatingReposition = null
      }
      if (resizeRepositionHandlerRef) {
        window.removeEventListener('resize', resizeRepositionHandlerRef)
        resizeRepositionHandlerRef = null
      }
      if (!effectiveStatic && scrollContainer) detachFromScroll(scrollContainer as HTMLElement)
      
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
    position: portalPositionFn ?? position,
    positionElement: getPositionElement(positionElement),
    prevArrow: `<div style="height: 14px;">${angleLeftString}</div>`,
    static: effectiveStatic,
  })

  // Assign dynamically sourced flatpickr instance to variable
  const picker = document.querySelector<HTMLElement & { [x: string]: any }>(`#${pickerId}`)?._flatpickr
  if (!picker) return

  assignCalendarId(picker)

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

  setupYearMonthDropdowns(picker)

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

  // Label click toggles calendar: stop pointer bubbling to document, then toggle (avoids flatpickr close + input-focus reopen).
  const datePickerLabel = document.querySelector(`label[for="${pickerId}"]`)
  if (datePickerLabel) {
    type LabelHandlerRefs = { stopPointer?: (e: Event) => void, click?: (e: MouseEvent) => void }
    const labelWithRefs = datePickerLabel as HTMLElement & { _pbDatePickerLabelHandlers?: LabelHandlerRefs }
    const prev = labelWithRefs._pbDatePickerLabelHandlers
    if (prev?.stopPointer) {
      datePickerLabel.removeEventListener('mousedown', prev.stopPointer)
      datePickerLabel.removeEventListener('touchstart', prev.stopPointer)
    }
    if (prev?.click) {
      datePickerLabel.removeEventListener('click', prev.click)
    }

    const stopPointerForFlatpickrDocClose = (e: Event) => {
      e.stopPropagation()
    }
    const onDatePickerLabelClick = (e: MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      if (picker.input.disabled) return
      picker.toggle()
      if (picker.isOpen) {
        picker.input.focus()
      }
    }
    datePickerLabel.addEventListener('mousedown', stopPointerForFlatpickrDocClose)
    datePickerLabel.addEventListener('touchstart', stopPointerForFlatpickrDocClose, { passive: true })
    datePickerLabel.addEventListener('click', onDatePickerLabelClick)

    labelWithRefs._pbDatePickerLabelHandlers = {
      stopPointer: stopPointerForFlatpickrDocClose,
      click: onDatePickerLabelClick,
    }
  }

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

  const stopPointerForFlatpickrDocClose = (e: Event) => {
    e.stopPropagation()
  }

  // Prevent flatpickr's document mousedown listener from treating the opening click as outside.
  picker.input.addEventListener('mousedown', stopPointerForFlatpickrDocClose)
  picker.input.addEventListener('touchstart', stopPointerForFlatpickrDocClose, { passive: true })

  const calIconWrapper = document.querySelector(`#cal-icon-${pickerId}`) as HTMLElement | null
  const isPointerInCalIcon = (e: MouseEvent) => {
    if (!calIconWrapper) return false
    const rect = calIconWrapper.getBoundingClientRect()
    return (
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom
    )
  }

  const openDatePickerFromUi = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (picker.input.disabled) return
    if (picker.isOpen) {
      picker.close()
      return
    }
    picker.open()
    picker.input.focus()
  }

  const textInputWrapper = picker.input.closest('.text_input_wrapper') as HTMLElement | null
  const inputWrapper = picker.input.closest('.input_wrapper') as HTMLElement | null
  inputWrapper?.addEventListener('click', (e: MouseEvent) => {
    if (e.target === picker.input) return
    if (!isPointerInCalIcon(e) && !textInputWrapper?.contains(e.target as Node)) return
    openDatePickerFromUi(e)
  })

  const pickerInput = picker.input as DatePickerInputEl
  pickerInput._pbDatePickerOpenUnsub = subscribeFloatingKitOpen(({ kitKind }) => {
    if (kitKind !== 'date-picker' && picker.isOpen) {
      picker.close()
    }
  })

  // Fix event bubbling bug on wrapper
  document.querySelector(`#${pickerId}`)?.parentElement?.addEventListener('click', (e) => e.stopPropagation())
}

export default datePickerHelper

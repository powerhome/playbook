import monthSelectPlugin from 'flatpickr/dist/plugins/monthSelect'
import weekSelect from 'flatpickr/dist/plugins/weekSelect/weekSelect'
import { Instance } from 'flatpickr/dist/types/instance'

const isSameMonth = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth()

// monthSelect only rebuilds its months from its own arrows, so changing the year another way
// (the year dropdown or input) kept the previous year's disabled, selected and today states.
const refreshMonthsOnYearChange = (fp: Instance) => ({
  onYearChange: () => {
    const { minDate, maxDate } = fp.config
    const today = new Date()
    fp.calendarContainer
      ?.querySelectorAll<HTMLElement & { dateObj: Date }>('.flatpickr-monthSelect-month')
      .forEach((month) => {
        month.dateObj = new Date(fp.currentYear, month.dateObj.getMonth())
        const enabled = fp.isEnabled(month.dateObj, true)
        month.classList.toggle('flatpickr-disabled', !enabled)
        month.classList.toggle('selected', enabled && fp.selectedDates.some((date) => isSameMonth(date, month.dateObj)))
        month.classList.toggle('today', isSameMonth(today, month.dateObj))
      })
    fp.prevMonthNav?.classList.toggle('flatpickr-disabled', !!minDate && fp.currentYear === minDate.getFullYear())
    fp.nextMonthNav?.classList.toggle('flatpickr-disabled', !!maxDate && fp.currentYear === maxDate.getFullYear())
  },
})

// Flatpickr plugins backing the `month` and `week` selection types.
// Shared by the Date Picker kit and Filter's interactive date-picker chips.
const selectionTypePlugins = (selectionType?: string) => {
  if (selectionType === 'month') return [monthSelectPlugin({ shorthand: true, dateFormat: 'F Y', altFormat: 'F Y' }), refreshMonthsOnYearChange]
  if (selectionType === 'week') return [weekSelect()]
  return []
}

export default selectionTypePlugins

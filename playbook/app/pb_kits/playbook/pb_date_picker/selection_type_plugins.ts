import monthSelectPlugin from 'flatpickr/dist/plugins/monthSelect'
import weekSelect from 'flatpickr/dist/plugins/weekSelect/weekSelect'
import { Instance } from 'flatpickr/dist/types/instance'

// monthSelect only refreshes disabled months from its own arrows, so changing the year
// another way (the year dropdown or input) left the previous year's months disabled.
const refreshMonthsOnYearChange = (fp: Instance) => ({
  onYearChange: () => {
    const { minDate, maxDate } = fp.config
    fp.calendarContainer
      ?.querySelectorAll<HTMLElement & { dateObj: Date }>('.flatpickr-monthSelect-month')
      .forEach((month) => {
        month.dateObj = new Date(fp.currentYear, month.dateObj.getMonth())
        month.classList.toggle('flatpickr-disabled', !fp.isEnabled(month.dateObj, true))
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

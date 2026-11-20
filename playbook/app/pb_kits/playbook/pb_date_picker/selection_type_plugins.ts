import monthSelectPlugin from 'flatpickr/dist/plugins/monthSelect'
import weekSelect from 'flatpickr/dist/plugins/weekSelect/weekSelect'

// Flatpickr plugins backing the `month` and `week` selection types.
// Shared by the Date Picker kit and Filter's interactive date-picker chips.
const selectionTypePlugins = (selectionType?: string) => {
  if (selectionType === 'month') return [monthSelectPlugin({ shorthand: true, dateFormat: 'F Y', altFormat: 'F Y' })]
  if (selectionType === 'week') return [weekSelect()]
  return []
}

export default selectionTypePlugins

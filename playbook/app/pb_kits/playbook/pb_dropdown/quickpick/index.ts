// QuickPick default options for Dropdown
// This provides hardcoded common options similar to the DatePicker QuickPick functionality

type QuickPickOption = {
  label: string;
  value: string;
  id?: string;
};

// Default hardcoded QuickPick options
const defaultQuickPickOptions: QuickPickOption[] = [
  { label: 'Today', value: 'today', id: 'quickpick-today' },
  { label: 'Yesterday', value: 'yesterday', id: 'quickpick-yesterday' },
  { label: 'This Week', value: 'this_week', id: 'quickpick-this-week' },
  { label: 'Last Week', value: 'last_week', id: 'quickpick-last-week' },
  { label: 'This Month', value: 'this_month', id: 'quickpick-this-month' },
  { label: 'Last Month', value: 'last_month', id: 'quickpick-last-month' },
  { label: 'This Quarter', value: 'this_quarter', id: 'quickpick-this-quarter' },
  { label: 'Last Quarter', value: 'last_quarter', id: 'quickpick-last-quarter' },
  { label: 'This Year', value: 'this_year', id: 'quickpick-this-year' },
  { label: 'Last Year', value: 'last_year', id: 'quickpick-last-year' },
];

// Helper to get QuickPick options
const getQuickPickOptions = (): QuickPickOption[] => {
  return defaultQuickPickOptions;
};

export default getQuickPickOptions
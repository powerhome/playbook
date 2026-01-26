// QuickPick default options for Dropdown
// This provides date range options similar to the DatePicker QuickPick functionality

import DateTime from '../../pb_kit/dateTime';

type QuickPickOption = {
  label: string;
  value: Date[];
  formattedStartDate?: string;
  formattedEndDate?: string;
  id?: string;
};

type CustomQuickPickDate = {
  label: string;
  value: string[] | { timePeriod: string; amount: number };
};

type CustomQuickPickDates = {
  override?: boolean;
  dates: CustomQuickPickDate[];
};

// Helper function to calculate date range from timePeriod and amount
const calculateDateRange = (timePeriod: string, amount: number): Date[] => {
  const endDate = new Date();
  const startDate = new Date();

  switch (timePeriod) {
    case 'days':
      startDate.setDate(endDate.getDate() - amount);
      break;
    case 'weeks':
      startDate.setDate(endDate.getDate() - (amount * 7));
      break;
    case 'months':
      startDate.setMonth(endDate.getMonth() - amount);
      break;
    case 'quarters':
      startDate.setMonth(endDate.getMonth() - (amount * 3));
      break;
    case 'years':
      startDate.setFullYear(endDate.getFullYear() - amount);
      break;
    default:
      throw new Error('Invalid time period');
  }
  return [startDate, endDate];
};

// Helper to format date for display
const formatDate = (date: Date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
};

// Helper to create a QuickPickOption from a custom date
const createOptionFromCustomDate = (customDate: CustomQuickPickDate): QuickPickOption => {
  let dateRange: Date[];
  
  if (Array.isArray(customDate.value)) {
    // Explicit date range as string array
    dateRange = customDate.value.map((dateStr: string) => new Date(dateStr));
  } else {
    // Calculate from timePeriod and amount
    dateRange = calculateDateRange(
      customDate.value.timePeriod,
      customDate.value.amount
    );
  }

  return {
    label: customDate.label,
    value: dateRange,
    formattedStartDate: formatDate(dateRange[0]),
    formattedEndDate: formatDate(dateRange[1]),
    id: `quickpick-${customDate.label.toLowerCase().replace(/\s+/g, '-')}`,
  };
};

// Helper to get QuickPick options with date ranges
const getQuickPickOptions = (rangeEndsToday = false, customQuickPickDates?: CustomQuickPickDates): QuickPickOption[] => {
  const today = new Date();
  const yesterday = DateTime.getYesterdayDate(new Date());

  const thisWeekStartDate = DateTime.getFirstDayOfWeek(new Date());
  const thisWeekEndDate = rangeEndsToday ? new Date() : DateTime.getLastDayOfWeek(new Date());
  const lastWeekStartDate = DateTime.getPreviousWeekStartDate(new Date());
  const lastWeekEndDate = DateTime.getPreviousWeekEndDate(new Date());

  const thisMonthStartDate = DateTime.getMonthStartDate(new Date());
  const thisMonthEndDate = rangeEndsToday ? new Date() : DateTime.getMonthEndDate(new Date());
  const lastMonthStartDate = DateTime.getPreviousMonthStartDate(new Date());
  const lastMonthEndDate = DateTime.getPreviousMonthEndDate(new Date());

  const thisQuarterStartDate = DateTime.getQuarterStartDate(new Date());
  const thisQuarterEndDate = rangeEndsToday ? new Date() : DateTime.getQuarterEndDate(new Date());
  const lastQuarterStartDate = DateTime.getPreviousQuarterStartDate(new Date());
  const lastQuarterEndDate = DateTime.getPreviousQuarterEndDate(new Date());

  const thisYearStartDate = DateTime.getYearStartDate(new Date());
  const thisYearEndDate = rangeEndsToday ? new Date() : DateTime.getYearEndDate(new Date());
  const lastYearStartDate = DateTime.getPreviousYearStartDate(new Date());
  const lastYearEndDate = DateTime.getPreviousYearEndDate(new Date());

  const defaultOptions: QuickPickOption[] = [
    { label: 'Today', value: [today, today], id: 'quickpick-today' },
    { label: 'Yesterday', value: [yesterday, yesterday], formattedStartDate: `${formatDate(yesterday)}`, formattedEndDate: `${formatDate(yesterday)}`, id: 'quickpick-yesterday' },
    { label: 'This Week', value: [thisWeekStartDate, thisWeekEndDate], formattedStartDate: `${formatDate(thisWeekStartDate)}`, formattedEndDate: `${formatDate(thisWeekEndDate)}`, id: 'quickpick-this-week' },
    { label: 'This Month', value: [thisMonthStartDate, thisMonthEndDate], formattedStartDate: `${formatDate(thisMonthStartDate)}`, formattedEndDate: `${formatDate(thisMonthEndDate)}`, id: 'quickpick-this-month' },
    { label: 'This Quarter', value: [thisQuarterStartDate, thisQuarterEndDate], formattedStartDate: `${formatDate(thisQuarterStartDate)}`, formattedEndDate: `${formatDate(thisQuarterEndDate)}`, id: 'quickpick-this-quarter' },
    { label: 'This Year', value: [thisYearStartDate, thisYearEndDate], formattedStartDate: `${formatDate(thisYearStartDate)}`, formattedEndDate: `${formatDate(thisYearEndDate)}`, id: 'quickpick-this-year' },
    { label: 'Last Week', value: [lastWeekStartDate, lastWeekEndDate], formattedStartDate: `${formatDate(lastWeekStartDate)}`, formattedEndDate: `${formatDate(lastWeekEndDate)}`, id: 'quickpick-last-week' },
    { label: 'Last Month', value: [lastMonthStartDate, lastMonthEndDate], formattedStartDate: `${formatDate(lastMonthStartDate)}`, formattedEndDate: `${formatDate(lastMonthEndDate)}`, id: 'quickpick-last-month' },
    { label: 'Last Quarter', value: [lastQuarterStartDate, lastQuarterEndDate], formattedStartDate: `${formatDate(lastQuarterStartDate)}`, formattedEndDate: `${formatDate(lastQuarterEndDate)}`, id: 'quickpick-last-quarter' },
    { label: 'Last Year', value: [lastYearStartDate, lastYearEndDate], formattedStartDate: `${formatDate(lastYearStartDate)}`, formattedEndDate: `${formatDate(lastYearEndDate)}`, id: 'quickpick-last-year' },
  ];

  // Handle customQuickPickDates and override logic
  if (customQuickPickDates && customQuickPickDates.dates && customQuickPickDates.dates.length > 0) {
    const customOptions = customQuickPickDates.dates.map(createOptionFromCustomDate);
    
    if (customQuickPickDates.override === false) {
      return [...defaultOptions, ...customOptions];
    }
    
    return customOptions;
  }

  return defaultOptions;
};

export default getQuickPickOptions
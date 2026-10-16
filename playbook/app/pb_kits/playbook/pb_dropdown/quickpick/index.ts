// QuickPick default options for Dropdown
// This provides date range options similar to the DatePicker QuickPick functionality

import DateTime from '../../pb_kit/dateTime';
import {
  endOfDay,
  parseQuickPickDateOnly,
  parseQuickPickDateTime,
  startOfDay,
  stringHasExplicitTime,
} from '../utilities/quickpickDateSync';

type QuickPickOption = {
  label: string;
  value: Date[];
  formattedStartDate?: string;
  formattedEndDate?: string;
  id?: string;
};

type CustomQuickPickDate = {
  label: string;
  value: Array<Date | string> | { timePeriod: string; amount: number };
};

type CustomQuickPickDates = {
  override?: boolean;
  dates: CustomQuickPickDate[];
};

const toQuickPickRange = (start: Date, end: Date): Date[] => [
  startOfDay(start),
  endOfDay(end),
];

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
  return toQuickPickRange(startDate, endDate);
};

// Helper to format date for display
const formatDate = (date: Date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
};

// Date objects keep their authored time (including midnight / 23:59:00).
// Date-only strings get SOD/EOD; timed strings keep their parsed time.
const parseCustomDateBoundary = (value: Date | string): Date => {
  if (value instanceof Date) return value;
  if (stringHasExplicitTime(value)) {
    return parseQuickPickDateTime(value) ?? new Date(value);
  }
  return parseQuickPickDateOnly(value) ?? new Date(value);
};

const boundaryHasExplicitTime = (value: Date | string): boolean =>
  value instanceof Date || stringHasExplicitTime(value);

// Helper to create a QuickPickOption from a custom date
const createOptionFromCustomDate = (customDate: CustomQuickPickDate): QuickPickOption => {
  let dateRange: Date[];

  if (Array.isArray(customDate.value)) {
    const startRaw = parseCustomDateBoundary(customDate.value[0]);
    const endRaw = parseCustomDateBoundary(customDate.value[1]);
    const startHasTime = boundaryHasExplicitTime(customDate.value[0]);
    const endHasTime = boundaryHasExplicitTime(customDate.value[1]);
    dateRange = [
      startHasTime ? startRaw : startOfDay(startRaw),
      endHasTime ? endRaw : endOfDay(endRaw),
    ];
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

const option = (label: string, start: Date, end: Date, id: string): QuickPickOption => {
  const value = toQuickPickRange(start, end);
  return {
    label,
    value,
    formattedStartDate: formatDate(value[0]),
    formattedEndDate: formatDate(value[1]),
    id,
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
    option('Today', today, today, 'quickpick-today'),
    option('Yesterday', yesterday, yesterday, 'quickpick-yesterday'),
    option('This Week', thisWeekStartDate, thisWeekEndDate, 'quickpick-this-week'),
    option('This Month', thisMonthStartDate, thisMonthEndDate, 'quickpick-this-month'),
    option('This Quarter', thisQuarterStartDate, thisQuarterEndDate, 'quickpick-this-quarter'),
    option('This Year', thisYearStartDate, thisYearEndDate, 'quickpick-this-year'),
    option('Last Week', lastWeekStartDate, lastWeekEndDate, 'quickpick-last-week'),
    option('Last Month', lastMonthStartDate, lastMonthEndDate, 'quickpick-last-month'),
    option('Last Quarter', lastQuarterStartDate, lastQuarterEndDate, 'quickpick-last-quarter'),
    option('Last Year', lastYearStartDate, lastYearEndDate, 'quickpick-last-year'),
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

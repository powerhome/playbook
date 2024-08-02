const ABBR_DAYS = ['SU', 'M', 'T', 'W', 'TH', 'F', 'S'];
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const formatDate = (newDate) => {
    const isTimelessStringDate = typeof newDate === "string" && !newDate.includes("T");
    if (isTimelessStringDate) {
        const unhyphenatedDate = new Date(newDate.replace(/-/g, "/"));
        return unhyphenatedDate;
    }
    return new Date(newDate);
};
export const toMinute = (newDate, timeZone) => {
    const date = formatDate(newDate);
    if (timeZone) {
        return date.toLocaleTimeString("en-US", { timeZone, hour: "2-digit", minute: "2-digit" }).slice(3, 5);
    }
    else {
        return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }).slice(3, 5);
    }
};
export const toHour = (newDate, timeZone) => {
    const date = formatDate(newDate);
    if (timeZone) {
        return date.toLocaleTimeString("en-US", { timeZone, hour: "numeric" }).split(' ')[0];
    }
    else {
        return date.toLocaleTimeString("en-US", { hour: "numeric" }).split(' ')[0];
    }
};
export const toDay = (newDate, timeZone) => {
    if (timeZone) {
        const date = new Date(formatDate(newDate).toLocaleString("en-US", { timeZone }));
        return date.getDate();
    }
    else {
        const date = formatDate(newDate);
        return date.getDate();
    }
};
export const toDayAbbr = (newDate) => {
    const date = formatDate(newDate);
    return ABBR_DAYS[date.getDay()];
};
export const toWeekday = (newDate) => {
    const date = formatDate(newDate);
    return days[date.getDay()];
};
export const toMonth = (newDate, timeZone) => {
    if (timeZone) {
        const date = new Date(formatDate(newDate).toLocaleString("en-US", { timeZone }));
        return months[date.getMonth()];
    }
    else {
        const date = formatDate(newDate);
        return months[date.getMonth()];
    }
};
export const toMonthNum = (newDate) => {
    const date = formatDate(newDate);
    return date.getMonth() + 1;
};
export const toYear = (newDate, timeZone) => {
    if (timeZone) {
        const date = new Date(formatDate(newDate).toLocaleString("en-US", { timeZone }));
        return date.getFullYear();
    }
    else {
        const date = formatDate(newDate);
        return date.getFullYear();
    }
};
export const toTime = (newDate, timeZone) => {
    const date = formatDate(newDate);
    if (timeZone) {
        return date.toLocaleTimeString("en-US", { timeZone, timeStyle: "short" }).split(' ')[0];
    }
    else {
        return date.toLocaleTimeString("en-US", { timeStyle: "short" }).split(' ')[0];
    }
};
export const toMeridiem = (newDate, timeZone) => {
    const date = formatDate(newDate);
    if (timeZone) {
        return date.toLocaleString("en-US", { timeZone, hour12: true }).slice(-2).charAt(0).toLocaleLowerCase();
    }
    else {
        return date.toLocaleString("en-US", { hour12: true }).slice(-2).charAt(0).toLocaleLowerCase();
    }
};
export const toTimeZone = (newDate, timeZone) => {
    const date = formatDate(newDate);
    if (timeZone) {
        return date.toLocaleString("en-US", { timeZone, timeZoneName: "short" }).split(' ')[3];
    }
    else {
        return date.toLocaleString("en-US", { timeZoneName: "short" }).split(' ')[3];
    }
};
export const toTimeWithMeridiem = (newDate, timeZone) => {
    const date = formatDate(newDate);
    return `${toTime(date, timeZone)}${toMeridiem(date, timeZone)}`;
};
export const toIso = (newDate) => {
    const date = formatDate(newDate);
    return date.toISOString();
};
export const fromNow = (newDate) => {
    const today = new Date();
    const formattedDate = formatDate(newDate);
    const startDate = formattedDate.getTime();
    const endDate = today.getTime();
    const elapsedTime = endDate - startDate;
    // For years/months, don't use elapsedTime due to rounding
    const differenceInYears = today.getFullYear() - formattedDate.getFullYear();
    const differenceInMonths = () => {
        let months = differenceInYears * 12;
        months -= formattedDate.getMonth();
        months += today.getMonth();
        return months;
    };
    const FORTY_FIVE_SECONDS = 45000;
    const NINETY_SECONDS = 90000;
    const FORTY_FIVE_MINUTES = 2670000;
    const NINETY_MINUTES = 5400000;
    const TWENTY_TWO_HOURS = 77400000;
    const THIRTY_SIX_HOURS = 129600000;
    const TWENTY_SIX_DAYS = 2203200000;
    const FORTY_FIVE_DAYS = 3888000000;
    const TEN_AND_A_HALF_MONTHS = 27560000000;
    const MILLISECONDS_IN_A_MINUTE = 60000;
    const MILLISECONDS_IN_A_HOUR = 3600000;
    const MILLISECONDS_IN_A_DAY = 86400000;
    let elapsedTimeString = differenceInYears === 1 ? `${differenceInYears} year ago` : `${differenceInYears} years ago`; // 320 days to 1+ year: "x year(s) ago"
    // Inspiration: https://momentjs.com/docs/#/displaying/fromnow/
    const intervals = [
        { min: 0, max: FORTY_FIVE_SECONDS, value: "a few seconds ago" }, // 0-44.99 seconds
        { min: FORTY_FIVE_SECONDS, max: NINETY_SECONDS, value: "a minute ago" }, // 45-89.99 seconds
        { min: NINETY_SECONDS, max: FORTY_FIVE_MINUTES, value: `${Math.round(elapsedTime / MILLISECONDS_IN_A_MINUTE)} minutes ago` }, // 90s-44.49 minutes: "2 minutes ago ... 44 minutes ago"
        { min: FORTY_FIVE_MINUTES, max: NINETY_MINUTES, value: "an hour ago" }, // 44.5-89.99 minutes
        { min: NINETY_MINUTES, max: TWENTY_TWO_HOURS, value: `${Math.round(elapsedTime / MILLISECONDS_IN_A_HOUR)} hours ago` }, // 90m-21.49 hours: "2 hours ago ... 21 hours ago"
        { min: TWENTY_TWO_HOURS, max: THIRTY_SIX_HOURS, value: "a day ago" }, // 21.5-35.99 hours
        { min: THIRTY_SIX_HOURS, max: TWENTY_SIX_DAYS, value: `${Math.round(elapsedTime / MILLISECONDS_IN_A_DAY)} days ago` }, // 36h-25.49 days: "2 days ago ... 25 days ago"
        { min: TWENTY_SIX_DAYS, max: FORTY_FIVE_DAYS, value: "a month ago" }, // 25.5-44.99 days
        { min: FORTY_FIVE_DAYS, max: TEN_AND_A_HALF_MONTHS, value: `${differenceInMonths()} months ago` }, // 45 days to 319 days: "2 months ago ... 10 months ago"
    ];
    for (const interval of intervals) {
        const { min, max, value } = interval;
        if (elapsedTime >= min && elapsedTime < max) {
            elapsedTimeString = value;
            break;
        }
    }
    return elapsedTimeString;
};
export const toCustomFormat = (newDate, format = 'month_day') => {
    const date = formatDate(newDate);
    if (format == "month_day") {
        return `${toMonthNum(date)}/${toDay(date)}`;
    }
    else {
        return `${date.toLocaleString("en-US", { month: "short" })} ${toDay(date)}`;
    }
};
// For quickPick.tsx
// Yesterday
export const getYesterdayDate = (newDate) => {
    const today = formatDate(newDate);
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    return yesterday;
};
// Weeks
export const getFirstDayOfWeek = (newDate) => {
    const today = formatDate(newDate);
    const dayOfWeek = today.getDay();
    // Replicate Moment.js: Start of week (Monday) has a time of 00:00:00
    const firstDayOfWeek = new Date(today.setHours(0, 0, 0));
    const isSunday = dayOfWeek === 0;
    const daysToSubtract = isSunday ? 6 : (dayOfWeek - 1);
    firstDayOfWeek.setDate(today.getDate() - daysToSubtract);
    return firstDayOfWeek;
};
export const getLastDayOfWeek = (newDate) => {
    const today = formatDate(newDate);
    const dayOfWeek = today.getDay();
    // Replicate Moment.js: End of week (Sunday) has a time of 23:59:59
    const lastDayOfWeek = new Date(today.setHours(23, 59, 59, 0));
    const isSunday = dayOfWeek === 0;
    const daysToAdd = isSunday ? 0 : (7 - dayOfWeek);
    lastDayOfWeek.setDate(today.getDate() + daysToAdd);
    return lastDayOfWeek;
};
export const getPreviousWeekStartDate = (newDate) => {
    const firstDayOfWeek = getFirstDayOfWeek(newDate);
    const firstDayOfPreviousWeek = new Date(firstDayOfWeek.getFullYear(), firstDayOfWeek.getMonth(), firstDayOfWeek.getDate() - 7);
    return firstDayOfPreviousWeek;
};
export const getPreviousWeekEndDate = (newDate) => {
    const lastDayOfWeek = getLastDayOfWeek(newDate);
    const lastDayOfPreviousWeek = new Date(lastDayOfWeek.getFullYear(), lastDayOfWeek.getMonth(), lastDayOfWeek.getDate() - 7, lastDayOfWeek.getHours(), lastDayOfWeek.getMinutes(), lastDayOfWeek.getSeconds());
    return lastDayOfPreviousWeek;
};
// Months
export const getMonthStartDate = (newDate) => {
    const date = formatDate(newDate);
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    return firstDayOfMonth;
};
export const getMonthEndDate = (newDate) => {
    const date = formatDate(newDate);
    // Replicate Moment.js: End of month has a time of 23:59:59
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59);
    return lastDayOfMonth;
};
export const getPreviousMonthStartDate = (newDate) => {
    const firstDayOfMonth = getMonthStartDate(newDate);
    const firstDayOfPreviousMonth = new Date(firstDayOfMonth.getFullYear(), firstDayOfMonth.getMonth() - 1, firstDayOfMonth.getDate());
    return firstDayOfPreviousMonth;
};
export const getPreviousMonthEndDate = (newDate) => {
    const lastDayOfMonth = getMonthEndDate(newDate);
    const lastDayOfPreviousMonth = new Date(lastDayOfMonth.getFullYear(), lastDayOfMonth.getMonth() - 1, lastDayOfMonth.getDate(), lastDayOfMonth.getHours(), lastDayOfMonth.getMinutes(), lastDayOfMonth.getSeconds());
    return lastDayOfPreviousMonth;
};
// Quarters
export const getQuarterStartDate = (newDate) => {
    const date = formatDate(newDate);
    const quarter = Math.floor(date.getMonth() / 3);
    const startOfQuarter = new Date(date.getFullYear(), quarter * 3, 1);
    return startOfQuarter;
};
export const getQuarterEndDate = (newDate) => {
    const date = formatDate(newDate);
    const quarter = Math.floor(date.getMonth() / 3);
    const startOfNextQuarter = new Date(date.getFullYear(), (quarter + 1) * 3, 1);
    // Replicate Moment.js: End of quarter has a time of 23:59:59
    const endOfQuarter = new Date(startOfNextQuarter.getTime() - 1);
    return endOfQuarter;
};
export const getPreviousQuarterStartDate = (newDate) => {
    const startOfQuarter = getQuarterStartDate(newDate);
    const firstDayOfPreviousQuarter = new Date(startOfQuarter.getFullYear(), startOfQuarter.getMonth() - 3, startOfQuarter.getDate());
    return firstDayOfPreviousQuarter;
};
export const getPreviousQuarterEndDate = (newDate) => {
    const endOfQuarter = getQuarterEndDate(newDate);
    const lastDayOfPreviousQuarter = new Date(endOfQuarter.getFullYear(), endOfQuarter.getMonth() - 3, endOfQuarter.getDate(), endOfQuarter.getHours(), endOfQuarter.getMinutes(), endOfQuarter.getSeconds());
    return lastDayOfPreviousQuarter;
};
// Years
export const getYearStartDate = (newDate) => {
    const date = formatDate(newDate);
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    return startOfYear;
};
export const getYearEndDate = (newDate) => {
    const date = formatDate(newDate);
    const endOfYear = new Date(date.getFullYear(), 11, 31, 23, 59, 59);
    return endOfYear;
};
export const getPreviousYearStartDate = (newDate) => {
    const startOfYear = getYearStartDate(newDate);
    const firstDayOfPreviousYear = new Date(startOfYear.getFullYear() - 1, startOfYear.getMonth(), startOfYear.getDate());
    return firstDayOfPreviousYear;
};
export const getPreviousYearEndDate = (newDate) => {
    const endOfYear = getYearEndDate(newDate);
    const lastDayOfPreviousYear = new Date(endOfYear.getFullYear() - 1, endOfYear.getMonth(), endOfYear.getDate(), endOfYear.getHours(), endOfYear.getMinutes(), endOfYear.getSeconds());
    return lastDayOfPreviousYear;
};
export default {
    toMinute,
    toHour,
    toDay,
    toDayAbbr,
    toWeekday,
    toMonth,
    toMonthNum,
    toYear,
    toTime,
    toMeridiem,
    toTimeZone,
    toTimeWithMeridiem,
    toIso,
    fromNow,
    toCustomFormat,
    getYesterdayDate,
    getFirstDayOfWeek,
    getLastDayOfWeek,
    getPreviousWeekStartDate,
    getPreviousWeekEndDate,
    getMonthStartDate,
    getMonthEndDate,
    getPreviousMonthStartDate,
    getPreviousMonthEndDate,
    getQuarterStartDate,
    getQuarterEndDate,
    getPreviousQuarterStartDate,
    getPreviousQuarterEndDate,
    getYearStartDate,
    getYearEndDate,
    getPreviousYearStartDate,
    getPreviousYearEndDate
};
//# sourceMappingURL=dateTime.js.map
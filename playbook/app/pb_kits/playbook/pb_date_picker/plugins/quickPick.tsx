import DateTime from '../../pb_kit/dateTime';

type FpTypes = {
  setDate: (arg0: any, arg1: boolean) => void,
  config: { [key: string]: string },
  clear: (arg0: boolean, arg1: boolean) => void,
  close: () => void,
  calendarContainer?: {
    classList: { add: (arg0: string) => void };
    prepend: (arg0: HTMLDivElement) => void;
    append: (arg0: HTMLDivElement) => void;
  },
  loadedPlugins: string[],
};

type pluginDataType = {
  ranges: { [key: string]: Date[] },
  rangesNav: HTMLUListElement,
  rangesButtons: [] | any,
}

type customQuickPickDatesType = {
  override: boolean,
  dates: { label: string, value: string[] | { timePeriod: string, amount: number } }[],
}

let activeLabel = ""

const quickPickPlugin = (thisRangesEndToday: boolean, customQuickPickDates: customQuickPickDatesType | undefined, defaultDate: string, dateDisplay: boolean) => {
  // console.log(thisRangesEndToday)
  return function (fp: FpTypes & any): any {
    const today = new Date()
    const yesterday = DateTime.getYesterdayDate(new Date())

    const thisWeekStartDate = DateTime.getFirstDayOfWeek(new Date())
    const thisWeekEndDate = thisRangesEndToday ? new Date() : DateTime.getLastDayOfWeek(new Date())
    const lastWeekStartDate = DateTime.getPreviousWeekStartDate(new Date())
    const lastWeekEndDate = DateTime.getPreviousWeekEndDate(new Date())

    const thisMonthStartDate = DateTime.getMonthStartDate(new Date())
    const thisMonthEndDate = thisRangesEndToday ? new Date() : DateTime.getMonthEndDate(new Date())
    const lastMonthStartDate = DateTime.getPreviousMonthStartDate(new Date())
    const lastMonthEndDate = DateTime.getPreviousMonthEndDate(new Date())

    const thisQuarterStartDate = DateTime.getQuarterStartDate(new Date())
    const thisQuarterEndDate = thisRangesEndToday ? new Date() : DateTime.getQuarterEndDate(new Date())
    const lastQuarterStartDate = DateTime.getPreviousQuarterStartDate(new Date())
    const lastQuarterEndDate = DateTime.getPreviousQuarterEndDate(new Date())

    const thisYearStartDate = DateTime.getYearStartDate(new Date())
    const thisYearEndDate = thisRangesEndToday ? new Date() : DateTime.getYearEndDate(new Date())
    const lastYearStartDate = DateTime.getPreviousYearStartDate(new Date())
    const lastYearEndDate = DateTime.getPreviousYearEndDate(new Date())

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


    type rangesType = {
      [key: string]: Date[]
    };

    const formatDate = (date: Date): string => {
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const year = date.getFullYear();
      return `${month}/${day}/${year}`;
    };


    let ranges: rangesType = {}

    console.log(dateDisplay)

    if (dateDisplay) {
      ranges = {
        [formatDate(today)]: [today, today],
        [formatDate(yesterday)]: [yesterday, yesterday],
        [`${formatDate(thisWeekStartDate)} to ${formatDate(thisWeekEndDate)}`]: [thisWeekStartDate, thisWeekEndDate],
        [`${formatDate(thisMonthStartDate)} to ${formatDate(thisMonthEndDate)}`]: [thisMonthStartDate, thisMonthEndDate],
        [`${formatDate(thisQuarterStartDate)} to ${formatDate(thisQuarterEndDate)}`]: [thisQuarterStartDate, thisQuarterEndDate],
        [`${formatDate(thisYearStartDate)} to ${formatDate(thisYearEndDate)}`]: [thisYearStartDate, thisYearEndDate],
        [`${formatDate(lastWeekStartDate)} to ${formatDate(lastWeekEndDate)}`]: [lastWeekStartDate, lastWeekEndDate],
        [`${formatDate(lastMonthStartDate)} to ${formatDate(lastMonthEndDate)}`]: [lastMonthStartDate, lastMonthEndDate],
        [`${formatDate(lastQuarterStartDate)} to ${formatDate(lastQuarterEndDate)}`]: [lastQuarterStartDate, lastQuarterEndDate],
        [`${formatDate(lastYearStartDate)} to ${formatDate(lastYearEndDate)}`]: [lastYearStartDate, lastYearEndDate]
      }
    } else {
      ranges = {
        'Today': [today, today],
        'Yesterday': [yesterday, yesterday],
        'This week': [thisWeekStartDate, thisWeekEndDate],
        'This month': [thisMonthStartDate, thisMonthEndDate],
        'This quarter': [thisQuarterStartDate, thisQuarterEndDate],
        'This year': [thisYearStartDate, thisYearEndDate],
        'Last week': [lastWeekStartDate, lastWeekEndDate],
        'Last month': [lastMonthStartDate, lastMonthEndDate],
        'Last quarter': [lastQuarterStartDate, lastQuarterEndDate],
        'Last year': [lastYearStartDate, lastYearEndDate]
      }
    }

    if (customQuickPickDates && Object.keys(customQuickPickDates).length !== 0) {
      if (customQuickPickDates.dates.length && customQuickPickDates.override === false) {
        customQuickPickDates.dates.forEach((item) => {
          if (Array.isArray(item.value)) {
            ranges[item.label] = item.value.map((dateStr: string) => new Date(dateStr));
          } else {
            ranges[item.label] = calculateDateRange(
              item.value.timePeriod,
              item.value.amount
            )
          }
        })
      } else if (customQuickPickDates.dates.length && customQuickPickDates.override !== false) {
        ranges = {}
        customQuickPickDates.dates.forEach((item) => {
          if (Array.isArray(item.value)) {
            ranges[item.label] = item.value.map((dateStr: string) => new Date(dateStr));
          } else {
            ranges[item.label] = calculateDateRange(
              item.value.timePeriod,
              item.value.amount
            )
          }
        })
      }
    }


    // creating the ul element for the nav dropdown and giving it classnames
    const rangesNav = document.createElement('ul');


    // creating the pluginData object that will hold the properties of this plugin
    const pluginData: pluginDataType = {
      ranges: ranges,
      rangesNav: rangesNav,
      rangesButtons: [],

    };

    /**
      * @param {string} label
      * @returns HTML Element
      */

    // function for creating the range buttons in the nav
    const addRangeButton = (label: string) => {

      // creating new elements to mimick selectable card component
      const div2 = document.createElement('div');
      div2.className = "nav-item-link"
      div2.innerHTML = label;

      pluginData.rangesButtons[label] = div2;

      // create li elements inside the dropdown
      const item = document.createElement('li');
      item.className = "nav-item";

      // append those nav items to the li items
      item.appendChild(pluginData.rangesButtons[label]);

      // append the li item to the ul rangeNav prop
      pluginData.rangesNav.appendChild(item);

      // return the ranges button prop
      return pluginData.rangesButtons[label];
    };

    const selectActiveRangeButton = (selectedDates: Array<Date>) => {
      const current = pluginData.rangesNav.querySelector('.active');

      if (current) {
        current.classList.remove('active');
      }

      if (selectedDates.length > 0 && activeLabel) {
        pluginData.rangesButtons[activeLabel].classList.add('active');
      }
    }

    const isLabelMatchingSelectedDates = (selectedDates: Array<Date>) => {
      return activeLabel && selectedDates[0].toDateString() === pluginData.ranges[activeLabel][0].toDateString() &&
        selectedDates[1].toDateString() === pluginData.ranges[activeLabel][1].toDateString()
    }

    return {
      // onReady is a hook from flatpickr that runs when calendar is in a ready state
      onReady(selectedDates: Array<Date>) {
        let defaultDateRange

        // loop through the ranges and create an anchor tag for each range and add an event listener to set the date when user clicks on a date range
        for (const [label, range] of Object.entries(pluginData.ranges)) {
          addRangeButton(label).addEventListener('click', function () {

            const start = new Date(range[0]);
            const end = new Date(range[1]);

            if (!start) {
              fp.clear();
            }
            else {
              activeLabel = label
              fp.setDate([start, end], true);
              fp.close();
            }
          });

          // check if there is a default date and set the default date range and label for quick pick
          if (defaultDate) {
            if (label.toLowerCase() === defaultDate.toLowerCase()) {
              activeLabel = label
              defaultDateRange = range
            }
          }
        }
        // conditional to check if there is a dropdown to add it to the calendar container and get it the classes it needs
        if (pluginData.rangesNav.children.length > 0) {

          fp.calendarContainer.prepend(pluginData.rangesNav);
          pluginData.rangesNav.classList.add('quick-pick-ul')
          fp.calendarContainer.classList.add('quick-pick-drop-down');

          /**
           *
           * @param {Array} selectedDates
           */
          // function to give the active button the active class
          selectActiveRangeButton(selectedDates);
        }

        // set the default date range if there is one and select the active button
        if (defaultDateRange) {
          fp.setDate(defaultDateRange, false);
          selectActiveRangeButton(defaultDateRange);
        }
      },
      onValueUpdate(selectedDates: Array<Date>) {
        selectActiveRangeButton(selectedDates)
      },

      onClose(selectedDates: Array<Date>) {
        // Patch .clear() to also remove active state if cleared
        const originalClear = fp.clear;
        fp.clear = function (...args: any) {
          const current = pluginData.rangesNav.querySelector('.active');
          if (current) {
            current.classList.remove('active');
          }
          activeLabel = "";
          return originalClear.apply(this, args);
        };
        // remove the active class from the button if the selected dates don't match the label
        if (!isLabelMatchingSelectedDates(selectedDates)) {
          pluginData.rangesButtons[activeLabel]?.classList.remove('active');
          activeLabel = ""
        }

        // set the date to the first date in the array if the user types only one date
        if (selectedDates.length === 1) {
          fp.setDate([selectedDates[0], selectedDates[0]], true);
        }

        // set the input value to the selected dates when the dropdown is closed
        if (selectedDates.length < 2 && selectedDates.length > 0) {
          fp.input.placeholder = fp.formatDate(this.selectedDates[0], fp.config.dateFormat);
        }
      }
    };
  };
}

export default quickPickPlugin;

import moment from 'moment'

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

let activeLabel = ""

const quickPickPlugin = (thisRangesEndToday: boolean) => {
  return function (fp: FpTypes & any): any {
    const thisWeekEndDate = thisRangesEndToday ? new Date() : moment().endOf('isoWeek').toDate()
    const thisMonthEndDate = thisRangesEndToday ? new Date() : moment().endOf('month').toDate()
    const thisQuarterEndDate = thisRangesEndToday ? new Date() : moment().endOf('quarter').toDate()
    const thisYearEndDate = thisRangesEndToday ? new Date() : moment().endOf('year').toDate()

    // variable that holds the ranges available
    const ranges = {
      'Today': [new Date(), new Date()],
      'Yesterday': [moment().subtract(1, 'days').toDate(), moment().subtract(1, 'days').toDate()],
      'This week': [moment().startOf('isoWeek').toDate(), thisWeekEndDate],
      'This month': [moment().startOf('month').toDate(), thisMonthEndDate],
      'This quarter': [moment().startOf('quarter').toDate(), thisQuarterEndDate],
      'This year': [moment().startOf('year').toDate(), thisYearEndDate],
      'Last week': [
        moment().subtract(1, 'week').startOf('isoWeek').toDate(),
        moment().subtract(1, 'week').endOf('isoWeek').toDate()
      ],
      'Last month': [
        moment().subtract(1, 'month').startOf('month').toDate(),
        moment().subtract(1, 'month').endOf('month').toDate()
      ],
      'Last quarter': [
        moment().subtract(1, 'quarter').startOf('quarter').toDate(),
        moment().subtract(1, 'quarter').endOf('quarter').toDate()
      ],
      'Last year': [
        moment().subtract(1, 'year').startOf('year').toDate(),
        moment().subtract(1, 'year').endOf('year').toDate()
      ]
    }
    //creating the ul element for the nav dropdown and giving it classnames
    const rangesNav = document.createElement('ul');

    // creating the pluginData object that will hold the properties of this plugin
    const pluginData: pluginDataType = {
      ranges: ranges,
      rangesNav: rangesNav,
      rangesButtons: [],
    };

    /**
   *    @param {string} label
   *    @returns HTML Element
   */

    //function for creating the range buttons in the nav
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

      // return the ranges buton prop
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
      // onReady is a hook from flatpickr that runs when calender is in a ready state
      onReady(selectedDates: Array<Date>) {
        // loop through the ranges and create an anchor tag for each range and add an event listener to set the date when user clicks on a date range
        for (const [label, range] of Object.entries(pluginData.ranges)) {
          addRangeButton(label).addEventListener('click', function () {

            const start = moment(range[0]).toDate();
            const end = moment(range[1]).toDate();

            if (!start) {
              fp.clear();
            }
            else {
              activeLabel = label
              fp.setDate([start, end], true);
              fp.close();
            }
          });
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
      },
      onValueUpdate(selectedDates: Array<Date>) {
        selectActiveRangeButton(selectedDates)
      },

      onClose(selectedDates: Array<Date>) {
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
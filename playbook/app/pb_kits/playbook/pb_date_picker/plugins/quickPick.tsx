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

const quickPickPlugin = () => {
  return function (fp: FpTypes & any): any {

    let activeLabel = ""

  // variable that holds the ranges available
  const ranges = {
      'Today': [new Date(), new Date()],
      'Yesterday': [moment().subtract(1, 'days').toDate(), moment().subtract(1, 'days').toDate()],
      'This week': [moment().startOf('week').toDate(), moment().endOf('week').toDate()],
      'This month': [moment().startOf('month').toDate(), new Date()],
      'This quarter': [moment().startOf('quarter').toDate(), new Date()],
      'This year': [moment().startOf('year').toDate(), new Date()],
      'Last week': [
          moment().subtract(1, 'week').startOf('week').toDate(),
          moment().subtract(1, 'week').endOf('week').toDate()
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

  //funciton for creating the range buttons in the nav
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

  const selectActiveRangeButton = (selectedDates: Array<string>) => {
    const current = pluginData.rangesNav.querySelector('.active');

    if (current) {
      current.classList.remove('active');
    }
    /** conditional statment to extract start and end dates from selectedDates,
    *   then loop through ranges prop in pluginData
    *   and check if chosen dates equal to a date in the ranges prop
    *   if they are equal, add the active class
    */
    if (selectedDates.length > 0) {
      pluginData.rangesButtons[activeLabel].classList.add('active');
    }
  }


    return {
      // onReady is a hook from flatpickr that runs when calender is in a ready state
      onReady(selectedDates: Array<string>) {
        // loop through the ranges and create an anchor tag for each range and add an event listiner to set the date when user clicks on a date range
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

        // conditional to check if there is a dropdown to add it to the calendar container and git it the classes it needs
        if (pluginData.rangesNav.children.length > 0) {

          fp.calendarContainer.prepend(pluginData.rangesNav);
          pluginData.rangesNav.classList.add('quick-pick-ul')
          fp.calendarContainer.classList.add('quick-pick-drop-down');

        /**
         *
         * @param {Array} selectedDates
         */

          // function to give the active butto the active class
          selectActiveRangeButton(selectedDates);
        }

      },
      onValueUpdate(selectedDates: Array<string>) {
        selectActiveRangeButton(selectedDates);
      },

      // onClose(selectedDates: Array<string>) {
      //   // set the input value to the selected dates when the dropdown is closed
      //   // if (!selectedDates[1]) {
      //   //   fp.input.value = fp.formatDate(this.selectedDates[0], fp.config.dateFormat) + ' → ' + fp.formatDate(this.selectedDates[1], fp.config.dateFormat);
      //   // }
      // }
    };
  };
}

export default quickPickPlugin;
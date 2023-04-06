import moment from 'moment'

type FpTypes = {
  selectedDates: string | any[];
  setDate: (arg0: any, arg1: boolean) => void;
  config: { [key: string]: string };
  clear: (arg0: boolean, arg1: boolean) => void;
  close: () => void;
  calendarContainer?: {
    classList: { add: (arg0: string) => void };
    prepend: (arg0: HTMLDivElement) => void;
    append: (arg0: HTMLDivElement) => void;
  };
  loadedPlugins: string[];
};

type pluginDataType = {
  ranges: { [key: string]: Date[] };
  rangesNav: HTMLUListElement;
  rangesButtons: [] | any;
}

const quickPickPlugin = () => {
  // console.log("quickpick")
  return function (fp: FpTypes & any): any {

  // variable that holds the ranges available
  const ranges = {
      'Today': [new Date(), new Date()],
      'Yesterday': [moment().subtract(1, 'days').toDate(), moment().subtract(1, 'days').toDate()],
      'Last 30 Days': [moment().subtract(29, 'days').toDate(), new Date()],
      'This Month': [moment().startOf('month').toDate(), moment().endOf('month').toDate()],
      'Last Month': [
          moment().subtract(1, 'month').startOf('month').toDate(),
          moment().subtract(1, 'month').endOf('month').toDate()
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

    // create the button element and add class and text
    const button = document.createElement('a');
    button.className = "nav-item-link";
    const itemLabel = document.createElement('span')
    itemLabel.className = "nav-item-text"
    itemLabel.innerHTML = label;

    // create li elements inside the dropdown
    const item = document.createElement('li');
    item.className = "nav-item";

    pluginData.rangesButtons[label] = button;

    // append span text to anchor tag
    pluginData.rangesButtons[label].appendChild(itemLabel)

    // append those anchor tags to the li items
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
      /** conditionaly statment to extract start and end dates from selectedDates, 
        *   then loop through ranges prop in pluginData
        *   and check if chosen dates equal to a date in the ranges prop
        *   if they are equal, add the active class
        */
    if (selectedDates.length > 0) {

      const startDate = moment(selectedDates[0]);
      const endDate = selectedDates.length > 1 ? moment(selectedDates[1]) : startDate;

      for (const [label, range] of Object.entries(pluginData.ranges)) {
        if (startDate.isSame(moment(range[0]), 'day') && endDate.isSame(moment(range[1]), 'day')) {
          pluginData.rangesButtons[label].classList.add('active');
          break;
        }
      }
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
                fp.setDate([start, end], true);
              }

              fp.close();
            });
        }

        // conditional to check if there is a dropdown to add it to the calendar container and git it the classes it needs
        if (pluginData.rangesNav.children.length > 0) {

          fp.calendarContainer.prepend(pluginData.rangesNav);
          pluginData.rangesNav.classList.add('quick-pick-ul')
          fp.calendarContainer.classList.add('quick-pick-drop-down');
          // funciton to give the active butto the active class
          selectActiveRangeButton(selectedDates);
        }


        /**
         *
         * @param {Array} selectedDates
         */
        
      },
      onValueUpdate(selectedDates: Array<string>) {
        selectActiveRangeButton(selectedDates);
      }
    };
  };
}

export default quickPickPlugin;
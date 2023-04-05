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
      // rangesOnly: typeof fp.config.rangesOnly === 'undefined' || fp.config.rangesOnly,
      // rangesAllowCustom: typeof fp.config.rangesAllowCustom === 'undefined' || fp.config.rangesAllowCustom,
      // rangesCustomLabel: typeof fp.config.rangesCustomLabel !== 'undefined' ? fp.config.rangesCustomLabel : 'Custom Range',
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
    const button = document.createElement('button');
    button.type = "button";
    button.className = "nav-link btn btn-link";
    button.innerText = label;

    // create li elements inside the dropdown
    const item = document.createElement('li');
    item.className = "nav-item d-grid";

    pluginData.rangesButtons[label] = button;

    // append those buttons to the item
    item.appendChild(pluginData.rangesButtons[label]);

    // append the item to the rangeNav prop
    pluginData.rangesNav.appendChild(item);

    // return the ranges buton prop
    return pluginData.rangesButtons[label];
  };

  const selectActiveRangeButton = (selectedDates: Array<string>) => {
    console.log(selectedDates)
    let isPredefinedRange = false;
    const current = pluginData.rangesNav.querySelector('.active');

    if (current) {
      current.classList.remove('active');
    }
  }

    
    return {
      onReady(selectedDates: Array<string>) {
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

        if (pluginData.rangesNav.children.length > 0) {
          // if (pluginData.rangesOnly && pluginData.rangesAllowCustom) {
          //   const customButton = addRangeButton(pluginData.rangesCustomLabel);
          //   // set custom range button to acti
          //   customButton.addEventListener('click', function () {
          //       const current = pluginData.rangesNav.querySelector('.active');
          //       if (current) {
          //         current.classList.remove('active');
          //       }
          //       customButton.classList.add('active');
          //       fp.calendarContainer.classList.remove('flatpickr-predefined-ranges-only');
          //     });
          // }
          fp.calendarContainer.prepend(pluginData.rangesNav);
          fp.calendarContainer.classList.add('flatpickr-has-predefined-ranges');
          // make sure the right range button is active for the default value
          selectActiveRangeButton(selectedDates);
        }


        /**
         * Make sure the right range button is active when a value is manually entered
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
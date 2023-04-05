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

const quickPickPlugin = function () {
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
    const pluginData = {
      ranges: ranges,
      // rangesOnly: typeof fp.config.rangesOnly === 'undefined' || fp.config.rangesOnly,
      // rangesAllowCustom: typeof fp.config.rangesAllowCustom === 'undefined' || fp.config.rangesAllowCustom,
      // rangesCustomLabel: typeof fp.config.rangesCustomLabel !== 'undefined' ? fp.config.rangesCustomLabel : 'Custom Range',
      rangesNav: rangesNav,
      rangesButtons: {},
    };

  /**
 *    @param {string} label
 *    @returns HTML Element
 */

  //funciton for creating the range buttons in the nav
  const addRangeButton = function (label: string) {

    // create the button element and add class and text
    const button = document.createElement('button');
    button.type = "button";
    button.className = "nav-link btn btn-link";
    button.innerText = label;

    // create li elements inside the dropdown
    const item = document.createElement('li');
    item.className = "nav-item d-grid";

    // append those buttons to the item
    item.appendChild(button);

    // append the item to the rangeNav prop
    pluginData.rangesNav.appendChild(item);

    // return the ranges buton prop
    return button;
  };

    
    return {
      onReady() {
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

      fp.calendarContainer.prepend(pluginData.rangesNav);
      },
    };
  };
}

export default quickPickPlugin;
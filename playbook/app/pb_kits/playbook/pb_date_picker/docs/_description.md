Playbook's date picker is built using [flatpickr](https://flatpickr.js.org/), a vanilla js library.  Common date picker use cases and features have been adapted into simple prop based configuration detailed in the docs below.  You can implement additional features and functionality by accessing a flatpickr instance directly (demonstrated in the 'flatpickr methods' example below).  This is done with the following code.

`const fpInstance = document.querySelector('#pickerId')._flatpickr`

`pickerId` is a prop passed to the date picker kit.  Flatpickr uses this id to target an input and attach a flatpickr instance to that input.

To learn more [visit flatpickr's docs](https://flatpickr.js.org/instance-methods-properties-elements/) or see the hook doc section below for an applied example.

The Date Picker works best with Javascript Date Objects or ISO Date strings.  If you're programming in js use Date Objects.  If you're using rails convert your date object (with timezone) to UTC and then to an ISO Date string.  For example, `DateTime.now.utc.iso8601`.  This ensures that the string passed to the Date Picker kit behaves as expected.

The Date Picker expects a date format of `MM/DD/YYYY` by default. If a different date format (e.g. `DD/MM/YYYY`, `m/d/y`, etc.) is used, the component will not know how to handle it and use a default date instead. To change the date format used, read more [here](#format).

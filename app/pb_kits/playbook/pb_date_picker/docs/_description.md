Playbook's date picker is built using [flatpickr](https://flatpickr.js.org/), a vanilla js library.  Common date picker use cases and features have been adapted into simple prop based configuration detailed in the docs below.  You can implement additional features and functionality by accessing a flatpickr instance directly.  This is done with the following code.

`const fpInstance = document.querySelector('#pickerId')._flatpickr`

`pickerId` is a prop passed to the date picker kit.  Flatpickr uses this id to target an input and attach a flatpickr instance to that input.

To learn more [visit flatpickr's docs](https://flatpickr.js.org/instance-methods-properties-elements/) or see the hook doc section below for an applied example.
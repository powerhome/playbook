Datepicker supports `position` options from [Flatpickr Options Documentation](https://flatpickr.js.org/options/). There are multiple positioning options to choose from.

**Note:** In order for the above prop to work properly, you must also send `staticPosition={false}` to your Datepicker kit instance.
If you are using the Datepicker within a Dialog, you cannot use the `staticPosition`/`static_position` prop.

#### Affix Datepicker Upon Scrolling

Upon adding `static={false}` to the date picker, you will notice that the date picker detaches from the input field while scrolling. This is a known Flatpickr nuance. By adding the `scrollContainer` prop, you can tell the date picker which DOM container it should watch for scroll events. In this example, you can see that `scrollContainer=".pb--page--content--main"` is being passed in order to keep the date picker correctly positioned on page scroll.

**Useage:** `scrollContainer: .validQuerySelectorHere`
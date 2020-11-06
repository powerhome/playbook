Your change handler function has access to two arguments: `dateStr` and `selectedDates`.

The first, `dateStr`, is a string of the chosen date.  The second, `selectedDates`, is an array of selected date objects. In many use cases `selectedDates` will have only one value but you'll still need to access it from index 0.
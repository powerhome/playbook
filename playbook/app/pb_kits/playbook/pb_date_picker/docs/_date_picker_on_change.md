Your change handler function has access to two arguments: `dateStr` and `selectedDates`.

The first, `dateStr`, is a string of the chosen date.  The second, `selectedDates`, is an array of selected date objects. In many use cases `selectedDates` will have only one value but you'll still need to access it from index 0.

NOTE: On Change does not account for manual input by users, so if your date picker sets `allowInput`, you should use the `onClose` method instead.
The customQuickPickDates/custom_quick_pick_dates prop allows for the user/dev to define their own quick pick dates. 
The prop accepts an object with two key/value pairs: dates & override (separate doc example below).

The dates property accepts an array of objects. Each object in the array has label and value properties. The label is what will be displayed in the UI of the dropdown menu. The value property is just the date that is going to be passed to the datepicker. The value property can be an array of two strings that represent a range, allowing for the dev to be extremely specific. Additionally, the dates array allows for a clean, simple API under that automatically converts dates in a common vernacular. 

The timePeriod property accepts "days", "weeks", "months", "quarters" or "years", representing past time periods. 
The amount property accepts any number.
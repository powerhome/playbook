Depending on the data you send to the `date` prop you might have unexpected results due to ruby `Date` and `DateTime` classes.

Don't care about timezones? Use `Date`.

If you need a date that recognizes a timezone, especially when paired with the [Time kit](/kits/time), leverage `DateTime`.


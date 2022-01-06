The `defaultDate`/`default_date` prop has a null or empty string value by default.  You can pass an ISO date string (preferred rails method) or date object (preferred JS method) if you want a default value on page load.  Use Ruby UTC DateTime objects and convert them to ISO date strings with `DateTime.now.utc.iso8601`.  

If you use a Date object without UTC time standardization the Date Picker kit may misinterpret that date as yesterdays date (consequence of timezone differentials and the Javascript Date Object constructor).  See [this GitHub issue for more information](https://github.com/powerhome/playbook/issues/1167) and the anti-pattern examples below.



Use to display the date. Year will not display if it is the current year.

`DateTime` defaults to the "America/New_York" timezone. `Date` ignores timezone.

**Please note**: this kit could potentially change the dates on you!

This is because the Javascript `Date` class does not have the concept of a date without time. If you pass a Ruby `Date` string to JavaScript, you will receive a date *and* a time which makes use of the timezone it infers from your browser based on your virtual geolocation or custom browser settings.

For example, if you pass a date like "7/2/2022" and your browser is on London time, Javascript will convert this to "7/2/2022 at 0:00 BST".

Subsequently, if you have not passed in a timezone to this kit, it will convert that time into US Eastern Time (default), making the resulting date and time "7/1/2022 at 19:00 EST". In this case the expected July 2 date will now be presented as July 1.

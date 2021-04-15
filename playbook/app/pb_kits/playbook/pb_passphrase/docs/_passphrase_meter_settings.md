By default, the minimum length is 12 and the strength meter will show a strength of 1 if not met. Notice the bar won't change from red until the minimum is met
Use the `minLength` prop to adjust.


The meter also response to `averageThreshold` and `strongTreshold` props. `averageThresold` defaults to 2, and `strongThreshold` defaults to 3.
This means that the bar will turn yellow when the strength of the passphrase is calculated to be 2 on a 0-4 scale, and green when 3.

Adjust these props to tune the sensitivity of the bar.
Note: minimum length trumps strength and will set the bar to a red color, despite whatever strength is calculated.
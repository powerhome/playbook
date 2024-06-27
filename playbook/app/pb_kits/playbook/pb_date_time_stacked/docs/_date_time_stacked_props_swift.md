### Props
| Name | Type | Description | Default | Values |
| --- | ----------- | --------- | --------- | --------- |
| **dateTime** | `Date` | Takes a date type to calculate the current date | `Date()` |  |
| **timeDate** | `Date` | Takes a date type to calculate the current time | `Date()` |  |
| **timeZoneIdentifier** | `String` | A string value that is used in a function to get the correct time in the corrresponding time zone. This value is also used to display the time zone next to the time |  |  |
| **isYearDisplayed** | `Bool` | Determines whether or not the year is displayed with the month and day | `false` | `true` `false` |
| **isLowercase** | `Bool` | Determines whether or not am/pm is capitalized | `false` | `true` `false` |
| **isMonthStacked** | `Bool` | Determines whether or not the value for month is stacked over the date | `false` | `true` `false` |
| **isMonthBold** | `Bool` | Determines whether or not the month is in bold | `false` | `true` `false` |
| **isYearBold** | `Bool` | Determines whether or not the year is in bold | `false` | `true` `false` |
| **dateAlignment** | `HorizontalAlignment` | Sets alignment of date | `.trailing` | `leading` `center` `trailing` |
| **timeAlignment** | `HorizontalAlignment` | Sets alignment of the time zone | `.leading` | `leading` `center` `trailing` |
| **dateVariant** | `Variant` | Allows user to choose the style in which the date is displayed | `.short(showIcon: false)` | `.short(showIcon: false)` `.dayDate(showYear: false)` `.standard` ` .withIcon(isStandard: true)` `.withIcon(isStandard: false)` |
| **timeVariant** | `Variant` | Allows user to choose the style in which the time is displayed | `.time` | `.time` `.iconTimeZone` `.withTimeZoneHeader` |
| **dateSize** | `String` | Allows user to choose the size of the date that is being displayed  | `.title4` | `title4` `body` `caption` `large` `subcaption` |
| **timeStyle** | `PBFont` | Allows user to choose the size of the time that is being displayed | `.caption` | `body` `caption` `large` `subcaption`|
| **timeZoneStyle** | `PBFont` | Allows user to choose the size of the time zone that is being displayed | `.caption` | `body` `caption` `large` `subcaption`|

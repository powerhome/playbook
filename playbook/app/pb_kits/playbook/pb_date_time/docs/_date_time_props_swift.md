### Props
| Name | Type | Description | Default | Values |
| --- | ----------- | --------- | --------- | --------- |
| **dateTime** | `Date` | Sets current date. | | |
| **iconSize** | `PBIcon.IconSize` | Allows user to change the size of the clock icon. | `.x3` | `.small` `.medium` `.large` |
| **dateVariant** | `PBDate.Variant` | Allows user to choose how they would like the date to be displayed | `.dayDate(showYear: false)` | `.short` `.dayDate(showYear: false)` `.standard` `.withIcon(isStandard: true)` `.withIcon(isStandard: false)` |
| **timeVariant** | `PBTime.Variant` | Allows user to choose how they would like the time to be displayed | `.time` | `.time` `.clockIcon` `.timeZone` `.iconTimeZone` `.withTimeZoneHeader` |
| **fontSize** | `PBFont` | Allows user to change the size of the text | `.caption` | `.subcaption` `.caption` `.body` |
| **isLowercase** | `Bool` | Determines whether or not am/pm is capitalized | `false` | `true` `false` |
| **isTimeBold** | `Bool` | Determines whether or not the time is bold | `false` | `true` `false` |
| **isTimeZoneBold** | `Bool` | Determines whether or not the time zone is bold | `false` | `true` `false` |
| **zone** | `PBTime.Zones` | Allows the user to set the time zone | `.east` | `.east` `.central` `.mountain` `.pacific` `.gmt` |
| **showTimeZone** | `Bool` | Determines whether or not the time zone is displayed | `false` | `true` `false` |
| **timeZoneIdentifier** | `String` | String that the time kit utilizes to calculate the current time and time zone | | |
| **showIcon** | `Bool` | Determines whether or not the clock icon is displayed | `false` | `true` `false` |

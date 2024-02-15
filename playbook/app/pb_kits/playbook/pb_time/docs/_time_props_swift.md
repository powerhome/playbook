### Props
| Name | Type | Description | Default | Values |
| --- | ----------- | --------- | --------- | --------- |
| **date** | `Date` | Calculates current date | |  |
| **showTimeZone** | `Bool` | Determines whether or not the time zone is displayed | `false` | `true` `false` |
| **showIcon** | `Bool` | Determines whether or not the clock icon is displayed | `false` | `true` `false` |
| **iconSize** | `PBIcon.IconSize` | Allows user to change the size of the icon | `.small` | `.xSmall` `.small` `.large` |
| **variant** | `Variant` | Allows user to choose how they would like the time to be displayed | `.time` | `.time` `.iconTimeZone` `.withTimeZoneHeader` |
| **isLowercase** | `Bool` | Determines whether or not am/pm is capitalized | `false` | `true` `false` |
| **header** | `String` | A string value for the header variant |  | |
| **isBold** | `Bool` | Determines whether or not the time is bold | `false` | `true` `false` |
| **alignment** | `Alignment` | Sets alignment of content | `.leading` | `leading` `center` `trailing` |
| **isIconBold** | `Bool` | Determines whether or not the clock icon is bold | `false` | `true` `false` |
| **zone** | `Zones` | An enum value for the different time zones | `.east` | `east` `central` `mountain` `pacific` `gmt` |
| **isTimeZoneBold** | `Bool` | Determines whether or not the time zone is bold | `false` | `true` `false` |
| **unstyled** | `PBFont` | Allows user to choose the size of the time that is being displayed | `.caption` | `body` `caption` `large` `subcaption`|
| **timeIdentifier** | `String` | A string value that is used in a function to get the correct time in the corrresponding time zone. This value is also used to display the time zone next to the time |  |  |

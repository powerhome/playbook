### Props
| Name | Type | Description | Default | Values |
| --- | ----------- | --------- | --------- | --------- |
| **date** | `Date` | Sets the date | `Date()` |  |
| **size** | `PBFont` | Sets the font size | `.body` |  `.body` `.caption` `.subcaption` |
| **iconSize** | `PBIcon.IconSize` | Sets the icon size | `.xSmall` | `xSmall` `small` `large` `x1` |
| **startDate** | `String` | Takes a string value to set the starting date range value | |  |
| **endDate** | `String` | Takes a string value to set the ending date range value | |  |
| **startVariant** | `PBDate.Variant` | Changes the style of the starting date | `.standard` | `.short(showIcon: false)` `.dayDate` `.standard` `.withIcon(isStandard: true)` `withIcon(isStandard: false)` |
| **endVariant** | `PBDate.Variant` | Changes the style of the ending date | `.standard` | `.short(showIcon: false)` `.dayDate` `.standard` `.withIcon(isStandard: true)` `withIcon(isStandard: false)` |
| **isArrowIconBold** | `Bool` | Determines if the date range arrow is bold | `false` | `true` `false` |

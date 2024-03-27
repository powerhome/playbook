### Props
| Name | Type | Description | Default | Values |
| --- | ----------- | --------- | --------- | --------- |
| **startDate** | `Date()` | Takes a string value to set the starting date range value | `Date()` |  |
| **endDate** | `Date()` | Takes a string value to set the ending date range value |  `Date()` |  |
| **startAlignment** | `Alignment` | Changes the alignment of the starting date | `.leading` | `.leading` `.trailing` |
| **endAlignment** | `Alignment` | Changes the alignment of the ending date | `.leading` | `.leading` `.trailing` |
| **startVariant** | `PBDate.Variant` | Changes the style of the starting date | `.short(showIcon: false)` | `.short(showIcon: false)` `.dayDate` `.standard` `.withIcon(isStandard: true)` `withIcon(isStandard: false)` |
| **endVariant** | `PBDate.Variant` | Changes the style of the ending date | `.short(showIcon: false)` | `.short(showIcon: false)` `.dayDate` `.standard` `.withIcon(isStandard: true)` `withIcon(isStandard: false)` |

### Props
| Name | Type | Description | Default | Values |
| --- | ----------- | --------- | --------- | --------- |
| **Avatar** | `AnyView` | Sets avatar image | `nil` |  |
| **Label** | `String` | Sets the name of the sender | `""` |  |
| **Message** | `String` | Sets the message text | `nil` |  |
| **Timestamp** | `Date` | Adds a date |  | `nil` |
| **Timestamp Alignment** | `TimestampAlignment` | Changes the style of the timestamp | `.trailing` | `.leading` `.trailing` |
| **Change TimeStamp On Hover** | `Bool` | Changes the timestamp hover functionality | `false` | `true` `false` |
| **Vertical Padding** | `CGFloat` | Changes vertical padding | `Spacing.xSmall` | `Spacing.none` `Spacing.xxSmall` `Spacing.xSmall` `Spacing.small` `Spacing.medium` `Spacing.large` `Spacing.xLarge` |
| **Horizontal Padding** | `CGFloat` | Changes horizontal padding | `Spacing.xSmall` | `Spacing.none` `Spacing.xxSmall` `Spacing.xSmall` `Spacing.small` `Spacing.medium` `Spacing.large` `Spacing.xLarge` |
| **Timestamp Variant** | `PBTimestamp.Variant` | Changes the style of the Message | `.standard` | `.standard` `.hideUserElapsed` |
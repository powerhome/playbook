### Props
| Name | Type | Description | Default | Values |
| --- | ----------- | --------- | --------- | --------- |
| **text** | `String` |`Value for the toast message` | `nil` |   |
| **variant** | `Variant` | `Determines the type pf toast message being displayed` | `.custom()` |  `error`, `success`, 
`neutral`, `custom()` |
| **actionView** | `dismissAction` | Dismisses the toast message | `.default` | `default` `custom()` `withTimer()` |
| **dismissAction** | `(() -> Void)` | `Triggers the dismiss action` |  |  |

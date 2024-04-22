### Props
| Name | Type | Description | Default | Values |
| --- | ----------- | --------- | --------- | --------- |
| **content** | `Content` | Sets the View content |  |  |
| **title** | `String` | Sets title for dialog header |  |  |
| **message** | `String` | Sets dialog message|  |  |
| **variant** | `DialogVariant` | Changes variant of dialog | `.default` | `.default` `.status()` |
| **isStacked** | `isStacked` | Changes whether the dialog buttons are stacked or inline | `false` | `true` `false`  |
| **cancelButton** | `Action` | Dismisses the dialog |  |  |
| **confirmButton** | `Action` | Confirms dialog message was received |  |  |
| **onClose** | `Action` | Starts action when dialog is closed |  | |
| **size** | `DialogSize` | Determines size of dialog |  `.medium`| `.small` `.medium` `large` |
| **shouldCloseOnOverlay** | `Bool` | Determines if overlay should close | `false` | `true` `false`  |

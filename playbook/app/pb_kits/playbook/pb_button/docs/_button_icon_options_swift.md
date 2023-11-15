![button-icon-positions](https://github.com/powerhome/playbook/assets/92755007/c0b257c5-ca29-4ecb-83f8-85d631bb8613)

```swift
VStack(alignment: .leading, spacing: Spacing.small) {
  PBButton(
    title: "Button with Icon on Left",
    icon: PBIcon.fontAwesome(.user, size: .x1),
    action: {}
  )
  PBButton(
    title: "Button with Icon on Right",
    icon: PBIcon.fontAwesome(.user, size: .x1),
    iconPosition: .right,
    action: {}
  )
 }
```

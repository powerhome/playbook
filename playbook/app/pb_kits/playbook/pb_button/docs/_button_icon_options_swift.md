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
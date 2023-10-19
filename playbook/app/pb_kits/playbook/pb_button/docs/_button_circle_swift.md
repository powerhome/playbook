```swift
VStack(alignment: .leading, spacing: Spacing.small) {
    PBButton(
      shape: .circle,
      icon: PBIcon.fontAwesome(.plus, size: .x1),
      action: {}
    )
    PBButton(
      variant: .secondary,
      shape: .circle,
      icon: PBIcon.fontAwesome(.pen, size: .x1),
      action: {}
    )
    PBButton(
      variant: .disabled,
      shape: .circle,
      icon: PBIcon.fontAwesome(.times, size: .x1)
    )
    PBButton(
      variant: .link,
      shape: .circle,
      icon: PBIcon.fontAwesome(.user, size: .x1),
      action: {}
    )
 }
```
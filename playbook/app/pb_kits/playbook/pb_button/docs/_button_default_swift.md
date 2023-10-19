```swift
VStack(alignment: .leading, spacing: Spacing.small) {
   PBButton(
      title: "Button Primary",
      action: {}
    )
    PBButton(
      variant: .secondary,
      title: "Button Secondary",
      action: {})
    PBButton(
      variant: .link,
      title: "Button Link",
      action: {}
    )
    PBButton(
      variant: .disabled,
      title: "Button Disabled"
    )
 }

```
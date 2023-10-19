![button-default](https://github.com/powerhome/playbook/assets/92755007/28a19644-8963-4b13-9eb7-c8fef8a047cc)

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

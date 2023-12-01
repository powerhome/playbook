![text-input-add-on](https://github.com/powerhome/playbook/assets/92755007/65a28e6a-9e65-4ca1-af8d-91dae6eac4f5)

```swift

PBTextInput(
  "ADD ON WITH DEFAULTS",
  text: $textAddOn,
  style: .rightIcon(.user, divider: true)
)

PBTextInput(
  "RIGHT-ALIGNED ADD ON WITH BORDER",
  text: $textAddOnRight,
  style: .rightIcon(.user, divider: true)
)

PBTextInput(
  "RIGHT-ALIGNED ADD ON WITH NO BORDER",
  text: $textAddOnRightNoBorder,
  style: .rightIcon(.user, divider: false)
)

PBTextInput(
  "LEFT-ALIGNED ADD ON WITH NO BORDER",
  text: $textAddOnLeft,
  style: .leftIcon(.user, divider: false)
)

PBTextInput(
  "LEFT-ALIGNED ADD ON WITH BORDER",
  text: $textAddOnLeftNoBorder,
  style: .leftIcon(.user, divider: true)
)

```

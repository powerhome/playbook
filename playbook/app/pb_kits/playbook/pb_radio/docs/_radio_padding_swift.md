![radio-padding](https://github.com/powerhome/playbook/assets/92755007/5cb123fb-791b-43f7-a57e-336f93c1bb3a)

```swift
VStack(alignment: .leading) {
  PBRadio(
    items: [
      PBRadioItem("Small")
    ],
    orientation: .vertical,
    padding: Spacing.small,
    selected: $selectedPadding
  )
  PBRadio(
    items: [
      PBRadioItem("Medium")
    ],
    orientation: .vertical,
    padding: Spacing.medium,
    selected: $selectedPadding
  )
  PBRadio(
    items: [
      PBRadioItem("Large")
    ],
    orientation: .vertical,
    padding: Spacing.large,
    selected: $selectedPadding
  )
}

```
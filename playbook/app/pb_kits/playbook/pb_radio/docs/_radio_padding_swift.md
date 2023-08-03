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
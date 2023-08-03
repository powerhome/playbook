<img width="1326" alt="Radio (Spacing)" src="https://github.com/powerhome/playbook/assets/92755007/58d1bf02-0c79-4526-9e5c-ba2f631d1dfe">

```swift
HStack(alignment: .top) {
  PBRadio(
    items: [
      PBRadioItem("Small"),
      .init("Small Spacing"),
      .init("Small Power")
    ],
    orientation: .vertical,
    spacing: Spacing.small,
    selected: $selectedSpacing
  )
  PBRadio(
    items: [
      PBRadioItem("Medium"),
      .init("Medium Spacing"),
      .init("Medium Power")
    ],
    orientation: .vertical,
    spacing: Spacing.medium,
    selected: $selectedSpacing
  )
  PBRadio(
    items: [
      PBRadioItem("Large"),
      .init("Large Spacing"),
      .init("Large Power")
    ],
    orientation: .vertical,
    spacing: Spacing.large,
    selected: $selectedSpacing
  )
}
```

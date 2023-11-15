![radio-orientation](https://github.com/powerhome/playbook/assets/92755007/f1f8dac7-a7d5-43cf-ba93-92bd624a1016)

```swift
VStack(alignment: .leading) {
  PBRadio(
    items: [
      PBRadioItem("Power"),
      .init("Nitro"),
      .init("Google")
    ],
    orientation: .horizontal,
    selected: $selectedOrientation
  )
}
```

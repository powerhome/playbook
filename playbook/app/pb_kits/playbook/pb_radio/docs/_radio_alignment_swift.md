```swift
VStack(alignment: .leading) {
  PBRadio(
    items: [
      PBRadioItem("Power"),
      .init("Nitro"),
      .init("Google")
    ],
    orientation: .horizontal,
    textAlignment: .vertical,
    selected: $selectedAlignment
  )
}
```
```swift
VStack(alignment: .leading) {
  PBRadio(
    items: [
      PBRadioItem("Power")
    ],
    orientation: .vertical,
    selected: $selectedError,
    errorState: true
  )
}
```
```swift
VStack(alignment: .leading) {
  PBRadio(
    items: [
      PBRadioItem("Power", subtitle: "subtitle")
    ],
    selected: $selectedSubtitle
  )
}

```
```swift
 VStack(alignment: .leading) {
      if let selectedCustom = selectedCustom {
        Text("Your choice is: \(selectedCustom.title)")
      }
      PBRadio(
        items: [
          PBRadioItem("Custom Power"),
          .init("Custom Nitro"),
          .init("Custom Google")
        ],
        orientation: .vertical,
        selected: $selectedCustom
      )
    }
```
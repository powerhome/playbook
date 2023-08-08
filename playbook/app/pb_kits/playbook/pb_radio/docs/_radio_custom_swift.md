![radio-custom](https://github.com/powerhome/playbook/assets/92755007/3eab180b-0550-4d7e-b562-84a007690218)

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
<img width="1326" alt="Radio (Custom)" src="https://github.com/powerhome/playbook/assets/92755007/9918c800-c28b-4d9e-911d-19a1d7edab64">

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

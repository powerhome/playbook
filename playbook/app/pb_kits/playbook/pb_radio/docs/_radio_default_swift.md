![radio-default](https://github.com/powerhome/playbook/assets/92755007/be32852e-de70-4ae0-b8bb-c091f8cfa34b)

```swift
VStack(alignment: .leading) {
  PBRadio(
    items: [
      PBRadioItem("Power"),
      .init("Nitro"),
      .init("Google")
    ],
    orientation: .vertical,
    selected: $selectedDefault
  )
}
```
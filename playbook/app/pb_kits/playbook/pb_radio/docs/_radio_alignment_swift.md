![radio-alignment](https://github.com/powerhome/playbook/assets/92755007/04b84035-8391-4de1-a33e-8964999d5c0f)

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
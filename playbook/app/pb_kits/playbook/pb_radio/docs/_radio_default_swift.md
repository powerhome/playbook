<img width="1326" alt="Radio (Default)" src="https://github.com/powerhome/playbook/assets/92755007/fd85d33f-8a03-45c4-a5d7-de55ead55b58">

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

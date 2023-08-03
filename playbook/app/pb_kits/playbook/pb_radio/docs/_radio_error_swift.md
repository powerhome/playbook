<img width="1326" alt="Radio (Error)" src="https://github.com/powerhome/playbook/assets/92755007/e4bfc914-90fd-4066-b0a7-4208a5dc0e38">

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

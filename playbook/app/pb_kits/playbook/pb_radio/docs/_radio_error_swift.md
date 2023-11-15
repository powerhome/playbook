![radio-error](https://github.com/powerhome/playbook/assets/92755007/425f499b-4daf-4093-82a7-230b01723287)

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

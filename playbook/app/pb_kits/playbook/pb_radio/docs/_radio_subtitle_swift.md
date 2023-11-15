![radio-subtitle](https://github.com/powerhome/playbook/assets/92755007/1244f4d4-0e87-4b5a-9b20-ac2223866321)

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

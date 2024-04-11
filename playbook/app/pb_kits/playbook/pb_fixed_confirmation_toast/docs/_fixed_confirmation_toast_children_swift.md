![Children-Toast](https://github.com/powerhome/playbook/assets/54749071/fdda74d2-fb4c-44d6-b7cc-188959f5ef7e)

```swift
VStack(alignment: .leading) {
  PBToast(
    text: message,
    variant: .success,
    actionView: .custom(AnyView(Text("Undo").pbFont(.title4, color: .white))),
    dismissAction: closeToast
  )
  PBToast(
    variant: .custom(nil, .pbPrimary),
    actionView: .custom(
    AnyView(
      HStack {
        Text("Undo action").pbFont(.caption, color: .white)
        PBButton(variant: .primary, title: "Undo").disabled(true)
      }
    )),
    dismissAction: closeToast
  )
}
```

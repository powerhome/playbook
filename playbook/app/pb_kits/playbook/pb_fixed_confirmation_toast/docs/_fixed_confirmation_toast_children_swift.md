![Children-Toast](https://github.com/powerhome/playbook-swift/assets/54749071/55aebd12-43c4-4061-92d3-6aebb07ff349)

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

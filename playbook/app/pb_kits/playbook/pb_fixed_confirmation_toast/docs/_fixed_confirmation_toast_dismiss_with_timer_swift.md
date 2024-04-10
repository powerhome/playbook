```swift
HStack {
  PBButton(variant: .secondary, title: "Top Center") {
    position = .top
    toastView = PBToast(
    text: "Top Center",
    variant: .neutral,
    actionView: .withTimer(3),
    dismissAction: closeToast
    )
  }
  PBButton(variant: .secondary, title: "Bottom Center") {
    position = .bottom
    toastView = PBToast(
    text: "Bottom Center",
    variant: .neutral,
    actionView: .withTimer(2),
    dismissAction: closeToast
    )
  }
}
```

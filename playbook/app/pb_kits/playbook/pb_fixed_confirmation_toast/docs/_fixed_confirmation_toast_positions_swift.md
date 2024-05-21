```swift
GridRow {
  PBButton(variant: .secondary, title: "Top Left") {
    position = .topLeft
    toastView = PBToast(
    text: "Top Left",
    variant: .neutral,
    actionView: .default,
    dismissAction: closeToast
    )
  }
  PBButton(variant: .secondary, title: "Top Right") {
    position = .topRight
    toastView = PBToast(
    text: "Top Right",
    variant: .neutral,
    actionView: .default,
    dismissAction: closeToast
    )
  }
}
GridRow {
  PBButton(variant: .secondary, title: "Top Center") {
    position = .top
    toastView = PBToast(
    text: "Top Center",
    variant: .neutral,
    actionView: .default,
    dismissAction: closeToast
    )
  }
  PBButton(variant: .secondary, title: "Bottom Center") {
    position = .bottom
    toastView = PBToast(
    text: "Bottom Center",
    variant: .custom(.user, .status(.neutral)),
    actionView: .default,
    dismissAction: closeToast
    )
  }
}
GridRow {
  PBButton(variant: .secondary, title: "Bottom Left") {
    position = .bottomLeft
    toastView = PBToast(
    text: "Bottom Left",
    variant: .custom(.user, .status(.neutral)),
    actionView: .default,
    dismissAction: closeToast
    )
  }
  PBButton(variant: .secondary, title: "Bottom Right") {
    position = .bottomRight
    toastView = PBToast(
    text: "Bottom Right",
    variant: .custom(.user, .status(.neutral)),
    actionView: .default,
    dismissAction: closeToast
    )
  }
}
```

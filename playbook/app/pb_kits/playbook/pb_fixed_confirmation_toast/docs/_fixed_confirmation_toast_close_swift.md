```swift
VStack(alignment: .leading) {
  PBToast(text: "Error Message", variant: .error, actionView: .default, dismissAction: closeToast)
  PBToast(text: "Items Successfully Moved", variant: .success, actionView: .default, dismissAction: closeToast)
  PBToast(text: "Scan to Assign Selected Items", variant: .neutral, actionView: .default, dismissAction: closeToast)
}
```

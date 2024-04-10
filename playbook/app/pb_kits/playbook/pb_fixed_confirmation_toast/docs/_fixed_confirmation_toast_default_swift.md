```swift
VStack(alignment: .leading) {
  PBToast(text: "Error Message", variant: .error, dismissAction: closeToast)
  PBToast(text: "Items Successfully Moved", variant: .success, dismissAction: closeToast)
  PBToast(text: "Scan to Assign Selected Items", variant: .neutral, dismissAction: closeToast)
}
```

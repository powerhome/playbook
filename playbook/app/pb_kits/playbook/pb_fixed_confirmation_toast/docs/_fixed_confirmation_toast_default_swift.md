![Default-Toast](https://github.com/powerhome/playbook-swift/assets/54749071/cc465b1b-85ba-4492-a832-b06b842a1555)

```swift
VStack(alignment: .leading) {
  PBToast(text: "Error Message", variant: .error, dismissAction: closeToast)
  PBToast(text: "Items Successfully Moved", variant: .success, dismissAction: closeToast)
  PBToast(text: "Scan to Assign Selected Items", variant: .neutral, dismissAction: closeToast)
}
```

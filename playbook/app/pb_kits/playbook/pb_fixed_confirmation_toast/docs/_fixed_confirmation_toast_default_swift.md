![Default-Toast](https://github.com/powerhome/playbook/assets/54749071/81db49f3-67b0-4ce2-99cd-7b71140ef0ef)

```swift
VStack(alignment: .leading) {
  PBToast(text: "Error Message", variant: .error, dismissAction: closeToast)
  PBToast(text: "Items Successfully Moved", variant: .success, dismissAction: closeToast)
  PBToast(text: "Scan to Assign Selected Items", variant: .neutral, dismissAction: closeToast)
}
```

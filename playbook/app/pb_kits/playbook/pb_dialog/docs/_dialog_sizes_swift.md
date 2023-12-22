![dialog-large](https://github.com/powerhome/playbook/assets/54749071/41ea273d-3f85-4514-88d7-21f49499f9a2)

```swift
    @State private var presentSmallDialog: Bool = false
    @State private var presentMediumDialog: Bool = false
    @State private var presentLargeDialog: Bool = false
    let infoMessage = "This is a message for informational purposes only and requires no action."

     PBDialog(
            title: "Large",
            message: infoMessage,
            variant: .default,
            isStacked: false,
            cancelButton: ("Cancel", {}),
            confirmButton: ("Okay", {}),
            size: .large
          )
```

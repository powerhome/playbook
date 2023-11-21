![text-input-error](https://github.com/powerhome/playbook/assets/92755007/7c664f75-1d7a-4a94-bc59-6f845a68ce19)


```swift

@State private var textError: String = ""
@State private var textConfirmError: String = ""

PBTextInput(
  "Email address",
  text: $textError,
  placeholder: "Enter email address",
  error: (true, "Insert a valid email"),
  style: .leftIcon(.user, divider: true)
)

PBTextInput(
  "Confirm email address",
  text: $textConfirmError,
  placeholder: "Confirm email address",
  style: .leftIcon(.user, divider: true)
)

```

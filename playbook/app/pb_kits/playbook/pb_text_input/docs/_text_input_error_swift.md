

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
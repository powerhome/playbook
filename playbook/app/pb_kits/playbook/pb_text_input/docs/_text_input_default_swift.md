![text-input-default](https://github.com/powerhome/playbook/assets/92755007/625a246e-9d5c-42ea-8c6e-7afcf0984c9a)


```swift

@State private var textFirstName: String = ""
@State private var textLastName: String = ""
@State private var textPhone: String = ""

PBTextInput(
  "First name",
  text: $textFirstName,
  placeholder: "Enter first name"
)

PBTextInput(
  "Last name",
  text: $textLastName,
  placeholder: "Enter last name"
)

PBTextInput(
  "Phone number",
  text: $textPhone,
  placeholder: "Enter phone number",
  keyboardType: .phonePad
)

```

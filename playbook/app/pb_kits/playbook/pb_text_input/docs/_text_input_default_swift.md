

```swift

@State private var textFirstName: String = ""
@State private var textLastName: String = ""
@State private var textPhone: String = ""
@State private var textEmail: String = ""
@State private var textZip: String = ""

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

PBTextInput(
  "Email",
  text: $textEmail,
  placeholder: "Enter email address",
  keyboardType: .emailAddress
)

PBTextInput(
  "Zip code",
  text: $textZip,
  placeholder: "Enter zip code",
  keyboardType: .numberPad
)


```
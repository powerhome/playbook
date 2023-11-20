![textarea-default](https://github.com/powerhome/playbook/assets/92755007/40eec958-63d7-4840-bf5c-f8d1e34c911a)

```swift

@State var defaultText = ""
@State var placeholderText = ""
@State var customText = "Default value text"

VStack(alignment: .leading, spacing: Spacing.small) {
  PBTextArea(
    "Label",
    text: $defaultText
  )

  PBTextArea(
    "Label",
    text: $placeholderText,
    placeholder: "Placeholder with text"
  )

  PBTextArea(
    "Label",
    text: $customText
  )
}

```

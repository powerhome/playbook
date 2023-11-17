

```swift

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
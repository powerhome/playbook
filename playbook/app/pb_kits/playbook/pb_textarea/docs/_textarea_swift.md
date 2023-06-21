<img width="300" alt="Screenshot 2023-06-14 at 1 50 02 PM" src="https://github.com/powerhome/playbook/assets/73671109/aeb5750e-6d20-4c3a-8c3c-700c3fe559b9" style="border: 6px solid  black; border-radius: 40px;">

#### Default
<img width="300" alt="Screenshot 2023-06-14 at 1 50 02 PM" src="https://github.com/powerhome/playbook/assets/73671109/a6daed20-d4e2-4013-bd9d-81cee9fabf9e" style="border: 6px solid  black; border-radius: 40px;">
```swift
  PBTextArea(
    "Label",
    text: $defaultText
  )
```

#### Error
<img width="300" alt="Screenshot 2023-06-14 at 1 50 02 PM" src="https://github.com/powerhome/playbook/assets/73671109/d2f987f2-f7ad-44ec-9d92-97a2d8ca78d8" style="border: 6px solid  black; border-radius: 40px;">
```swift
  PBTextArea(
    "Label",
    text: $errorText,
    error: "This field has an error!"
  )
```
#### Max Characters W/ Blocker
<img width="300" alt="Screenshot 2023-06-14 at 1 50 02 PM" src="https://github.com/powerhome/playbook/assets/73671109/e0ca659c-38d2-4bf7-8da7-780f1678410c" style="border: 6px solid  black; border-radius: 40px;">
```swift
  PBTextArea(
    "Max Characters W/ Blocker",
    text: $maxBlockerText,
    characterCount: .maxCharacterCountBlock(100)
  )
```

### Do's and Don'ts

| Do | Don't |
| --- | ---- |
| - For long answers from users | - For short answers from users, you can use a Text Input instead |

### Props
| Name | Type | Description | Default | Values |
| --- | ----------- | --------- | --------- | --------- |
| **characterCount** | `CharacterCount` | Displays the character counter on the bottom right of the Textarea and its different variants | `.noCount` | `.noCount` `.count` `.maxCharacterCount(Int)` `.maxCharacterCountBlock(Int)` `.maxCharacterCountError(Int, String)`
| **error** | `String` | Displays error text on the bottom left of the Textarea and changes border to error status color | `nil` | |
| **inline** | `Bool` | Displays inline variant | `false` | |
| **label** | `String` | The label for the TextArea | | |
| **placeholder** | `String` | The placeholder of the Textarea | `nil` | |
| **text** | `String` | Specifies the value of the Textarea | | |

# Textarea
Enables users to add longer text to a form

## When to Use
* For long answers from users

## When not to Use
* for short answers from users, you can use a Text Input instead

## How to use
```swift
@State var defaultText = ""

   PBTextArea(
     "Label",
     text: $defaultText,
     placeholder: "Placeholder with text"
   )
```

![Textarea screenshot](https://github.com/powerhome/PlaybookSwift/assets/73671109/091f0274-81be-4cd7-9d14-ec23a371607f)

## Props
| Name | Type | Default |
| --- | ----------- | --------- |
| characterCount | Enum | Displays the character counter on the bottom right of the Textarea and its different variants |
| error | String | Displays error text on the bottom left of the Textarea and changes border to error status color |
| inline | Bool | Displays inline variant |
| label | String | The label for the TextArea |
| placeholder | String | The placeholder of the Textarea |
| text | String | Specifies the value of the Textarea |
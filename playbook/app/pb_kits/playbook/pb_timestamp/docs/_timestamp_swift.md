### When to Use
- For low profile time display
- When displaying an event that occured or will occur

### When not to Use
- For displaying the Date or the Time, for that use one of our other Date/Time kits

### How to use
| <img width="500" alt="Screenshot 2023-06-14 at 1 50 02 PM" src="https://github.com/powerhome/playbook/assets/73671109/82e86b1f-474e-450a-92a0-56f3d09c3618"> | <img width="300" alt="Screenshot 2023-06-14 at 1 54 05 PM" src="https://github.com/powerhome/playbook/assets/73671109/4bfaf465-1b8a-4abd-a465-97dea5a9771a"> |
| ----------------- | ---------------------- |
| <img width="500" alt="Screenshot 2023-06-14 at 1 56 01 PM" src="https://github.com/powerhome/playbook/assets/73671109/4b391c95-d22d-4894-ba73-91a8211e301e"> | <img width="550" alt="Screenshot 2023-06-14 at 1 54 05 PM" src="https://github.com/powerhome/playbook/assets/73671109/7233dfeb-2b83-4513-b689-5cac0f607f89"> |
| <img width="500" alt="Screenshot 2023-06-14 at 1 57 45 PM" src="https://github.com/powerhome/playbook/assets/73671109/7a9bbe64-c22b-4909-918b-9bb9005440e0"> | <img width="550" alt="Screenshot 2023-06-14 at 1 54 15 PM" src="https://github.com/powerhome/playbook/assets/73671109/fa710373-8be1-4d60-a81e-dda2b7817c78"> |

### Props
| Name | Type | Description | Default | Values |
| --- | ----------- | --------- | --------- | --------- |
| **amPmStyle** | `AmPmStyle` | Displays the character counter on the bottom right of the Textarea and its different variants | `.short` | `.short` `.full`|
| **showDate** | `Bool` | Displays error text on the bottom left of the Textarea and changes border to error status color | `true` | |
| **showTimeZone** | `Bool` | Displays inline variant | `false` | |
| **showUser** | `String` | The label for the TextArea | `false` | |
| **text** | `String` | The placeholder of the Textarea | `nil` | |
| **timeStamp** | `Date` | Specifies the value of the Textarea | | |
| **timeZone** | `String` | Specifies the value of the Textarea | `nil` | |
| **variant** | `Variant` | Specifies the value of the Textarea | `.standard` | `.elapsed` `.standard` `.updated` `.hideUserElapsed` |
### When to Use
- For low profile time display
- When displaying an event that occured or will occur

### When not to Use
- For displaying the Date or the Time, for that use one of our other Date/Time kits

### How to use
| <img width="500" alt="Screenshot 2023-06-14 at 1 50 02 PM" src="https://github.com/powerhome/playbook/assets/73671109/42084be1-84f1-4195-8257-a1cc09bec056"> | <img width="550" alt="2023-06-14 at 2 28 18 PM" src="https://github.com/powerhome/playbook/assets/73671109/0a044a93-2661-4acb-a977-a968a9a9355c"> |
| ----------------- | ---------------------- |
| <img width="500" alt="Screenshot 2023-06-14 at 1 56 01 PM" src="https://github.com/powerhome/playbook/assets/73671109/3db63263-ee41-437c-9440-c33191620994"> | <img width="550" alt="Screenshot 2023-06-14 at 1 54 05 PM" src="https://github.com/powerhome/playbook/assets/73671109/d4eb3d2b-7d36-45e9-880b-0996c087efa2"> |
| <img width="500" alt="Screenshot 2023-06-14 at 1 57 45 PM" src="https://github.com/powerhome/playbook/assets/73671109/950f5704-d2ed-43c4-8081-baa372c53d56"> | <img width="550" alt="Screenshot 2023-06-14 at 1 54 15 PM" src="https://github.com/powerhome/playbook/assets/73671109/150db1ed-0971-4dff-be7f-1a809c0f6ad7"> |

### Props
| Name | Type | Description | Default Value | Values |
| --- | ----------- | --------- | --------- | --------- |
| **amPmStyle** | `AmPmStyle` | Displays the character counter on the bottom right of the Textarea and its different variants | `.short` | `.short` `.full`|
| **showDate** | `Bool` | Displays error text on the bottom left of the Textarea and changes border to error status color | `true` | |
| **showTimeZone** | `Bool` | Displays inline variant | `false` | |
| **showUser** | `String` | The label for the TextArea | `false` | |
| **text** | `String` | The placeholder of the Textarea | `nil` | |
| **timeStamp** | `Date` | Specifies the value of the Textarea | | |
| **timeZone** | `String` | Specifies the value of the Textarea | `nil` | |
| **variant** | `Variant` | Specifies the value of the Textarea | `.standard` | `.elapsed` `.standard` `.updated` `.hideUserElapsed` |



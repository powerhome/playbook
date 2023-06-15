### Description
Card component can easily wrap custom content using the same Playbook pattern.

### When to Use
- Render content with same visual style and pattern
- Organize content with Playbook separator style 
- Render content with Playbook background colors

### When not to Use
- To execute actions, try to use buttons instead.

### How to use
swift
 PBCard {
    Content()
 }


### Props
| Name | Type | Description | 
| --- | ----------- | --------- |
| alignment | Enum | Displays the character counter on the bottom right of the Textarea and its different variants | 
| backgroundColor | String | Displays error text on the bottom left of the Textarea and changes border to error status color | 
| border | Bool | Displays inline variant | 
| borderRadius | String | The label for the TextArea |
| highlight | String | Specifies the value of the Textarea |  
| padding | String | The placeholder of the Textarea | 
| style | String | The placeholder of the Textarea | 
| shadow | String | The placeholder of the Textarea | 
| width | String | The placeholder of the Textarea | 
| content | String | The placeholder of the Textarea |
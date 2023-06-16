### Description
Card component can easily wrap custom content using the same Playbook pattern.

### When to Use
- Render content with same visual style and pattern
- Organize content with Playbook separator style 
- Render content with Playbook background colors

### When not to Use
- To execute actions and for tappble areas, try to use buttons instead.

### How to use
swift
 PBCard {
    Content()
 }


### Props
| Name | Type | Description |  Default Value | Values |
| --------- | --------- | --------- | --------- | --------- |
| alignment | Alignment | Set Card content alignment | .leading | 
| backgroundColor | Color | Set Card background color | .card |
| border | Bool | Show card default border | true |
| borderRadius | CGFloat | Display card border radius | BorderRadius.medium |
| highlight | Highlight | Specifies the card edge that can be highlighted and set its color | .none |  
| padding | CGFloat | Specifies the space between the content and the card edge | Spacing.medium | 
| style | PBCardStyle | Set de card style | .default |
| shadow | Shadow? | Set card shadow with Playboook Shadow tokens | nil | 
| width | CGFloat? | Set car width | .infinity |
| content | Content | Display a generic content that conforms to a View | - |
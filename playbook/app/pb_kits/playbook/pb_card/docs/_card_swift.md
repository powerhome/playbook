### Description
Card component can easily wrap custom content using the same Playbook pattern.

### When to Use
- Render content with same visual style and pattern
- Organize content with Playbook separator style 
- Render content with Playbook background colors

### When not to Use
- To execute actions and for tappble areas, try to use buttons instead.

### How to use
| Code | Component |
| --------- | --------- |
| <img width="401" alt="Screenshot 2023-06-15 at 21 16 28" src="https://github.com/powerhome/playbook/assets/60269827/def5e7ac-4482-4847-89a9-98c5cb182620"> | <img width="401" alt="Screenshot 2023-06-15 at 21 15 04" src="https://github.com/powerhome/playbook/assets/60269827/36977781-0dfa-4928-9d2d-63851e8e09bd"> |
| <img width="921" alt="Screenshot 2023-06-15 at 21 18 05" src="https://github.com/powerhome/playbook/assets/60269827/71a20320-be17-49eb-b85e-f0de2b1ade7e"> | <img width="425" alt="Screenshot 2023-06-15 at 21 19 19" src="https://github.com/powerhome/playbook/assets/60269827/93cdb1d7-01fe-48d4-a503-988361492fca"> |

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

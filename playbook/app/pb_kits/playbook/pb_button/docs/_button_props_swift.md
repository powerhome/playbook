### Props
| Name | Type | Description | Default | Values |
| --- | ----------- | --------- | --------- | --------- |
| **Full Width** | `Bool` | Sets Button to full width | `false` | `true` `false` |
| **Variant** | `PBButtonVariant` | Changes the color of the Button | ` .primary` | `.primary` `.secondary` `.link` `.disabled` |
| **Size** | `Size` | Adjusts Button size | `.medium` | `.small` `.medium` `.large` |
| **Shape** | `Shape` | Changes the shape of the Button  | `.primary` | `.primary` `.circle` |
| **Title** | `String` | Sets Button text | `nil` |  |
| **Icon** | `PBIcon` | Adds an icon to the Button | `nil` |  |
| **Icon Position** | `IconPosition` | Adjusts the icon's position | `.left` | `.left` `.right` |
| **Action** | `(() -> Void)` | Adds an action for the Button to perform | `{}` |  |

### Reaction Button Props
| Name | Type | Description | Default | Values |
| --- | ----------- | --------- | --------- | --------- |
| **count** | `Int` | Tracks number of times a reaction button has been pressed | `0` |  |
| **isHighlighted** | `Bool` | Boolean for whether or not a reaction button has a highlight | ` false` | `true` `false` |
| **isHovering** | `Bool` | Boolean for whether or not a mouse is hovering over the reaction button | `false` | `true` `false` |
| **icon** | `String` | Allows user to use a unicode string for an emoji reaction button |  |  |
| **pbIcon** | `PBIcon` | A PlayBook Icon option for reaction button | |  |
| **isInteractive** | `Bool` | Boolean for whether or not a reaction button is interactive | `false` | `true` `false` |


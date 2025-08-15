### Props
| Name | Type | Description | Default | Values |
| --- | ----------- | --------- | --------- | --------- |
| **name** | `String` | Sets the User's name | `""` |  |
| **nameFont** | `Typography` | Font styling for the user's name | `.init(font: .title4, variant: .bold)` |  |
| **image** | `Image?` | Sets image for the avatar | `nil` |  |
| **orientation** | `Orientation` | Changes the orientation of the User | `.horizontal` | `.horizontal` `.vertical` |
| **size** | `Size` | Changes the size of the User | `.medium` | `.xxSmall` `.xSmall` `.small` `.medium` `.large` `.xLarge` |
| **territory** | `String?` | Adds the User's territory | `nil` |  |
| **title** | `String?` | Adds a title | `nil` |  |
| **subtitle** | `AnyView?` | Adds a subtitle view | `nil` |  |
| **status** | `PBOnlineStatus.Status?` | An indicator for the current status of the user | `nil` | `.online` `.away` `.offline` |
| **displayAvatar** | `Bool` | Displays the User's avatar | `true` | `true` `false` |
| **territoryTitleFont** | `PBFont` | Font for territory and title text | `.subcaption` | `.title1` `.body` `.caption` `.subcaption` `.badgeText` `.title4` |
| **isActive** | `Bool` | Sets whether the user is active | `true` | `true` `false` |
| **hasInactiveBadge** | `Bool` | Shows inactive badge when user is not active | `false` | `true` `false` |
| **spacing** | `CGFloat` | Controls spacing between elements | `Spacing.small` | `.none` `.xxSmall` `.xSmall` `.small` `.medium` `.large` `.xLarge` |


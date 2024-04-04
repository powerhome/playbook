### Props
| Name | Type | Description | Default | Values |
| --- | ----------- | --------- | --------- | --------- |
| **name** | `String` | Sets the User's name |  |  |
| **displayAvatar** | `Bool` | Displays the User's avatar | `true` | `true` `false` |
| **image** | `Image` | Sets image for the avatar |  |  |
| **orientation** | `Orientation` | Changes the orientation of the User | `.horizontal` | `.horizontal` `.verticle` |
| **size** | `UserAvatarSize` | Changes the size of the User | `.medium` | `.small` `.medium` `.large` |
| **territory** | `String` | Adds the User's territory |  |  |
| **title** | `String` | Adds a title |  |  |
| **status** | `PBAvatar.PresenceStatus?` | An idicator for the current status of the user | `.none` | `.online` `.away` `.offline` |

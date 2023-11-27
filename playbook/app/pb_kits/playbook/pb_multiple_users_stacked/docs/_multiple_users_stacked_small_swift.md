![mulitple-users-stacked-small](https://github.com/powerhome/playbook/assets/92755007/277fd685-6302-462e-a02a-18a8fcb57715)

```swift

let oneUser = [andrew]
let twoUsers = [andrew, picAndrew]
let multipleUsers = [andrew, picAndrew, andrew, andrew]

HStack(spacing: Spacing.xSmall) {
  PBMultipleUsersStacked(users: oneUser)
  PBMultipleUsersStacked(users: twoUsers)
  PBMultipleUsersStacked(users: multipleUsers)
}

```

![mulitple-users-stacked-default](https://github.com/powerhome/playbook/assets/92755007/180e1275-3eb6-4b28-b1ef-bdde45ab3c2e)

```swift

let oneUser = [andrew]
let twoUsers = [andrew, picAndrew]
let multipleUsers = [andrew, picAndrew, andrew, andrew]

HStack(spacing: Spacing.xSmall) {
  PBMultipleUsersStacked(users: oneUser, size: .default)
  PBMultipleUsersStacked(users: twoUsers, size: .default)
  PBMultipleUsersStacked(users: multipleUsers, size: .default)
}

```

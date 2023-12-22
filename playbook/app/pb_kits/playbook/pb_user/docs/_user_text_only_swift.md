![user-text-only](https://github.com/powerhome/playbook/assets/54749071/75a5d516-2912-4cbb-b059-1929c979c4ac)


```swift

let img = Image("andrew", bundle: .module)
let name = "Andrew K"
let title = "Rebels Developer"

VStack(spacing: Spacing.small) {
  PBUser(
    name: name,
    displayAvatar: false,
    size: .large,
    territory: "PHL",
    title: title
  )

  PBUser(
    name: name,
    displayAvatar: false,
    territory: "PHL",
    title: title
  )
}

```

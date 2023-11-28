![user-text-only](https://github.com/powerhome/playbook/assets/92755007/823da524-9387-4a85-80f7-ff937f9e8bf2)

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

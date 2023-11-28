

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
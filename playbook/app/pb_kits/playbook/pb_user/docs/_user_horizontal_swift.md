

```swift

let img = Image("andrew", bundle: .module)
let name = "Andrew K"
let title = "Rebels Developer"

VStack(alignment: .leading, spacing: Spacing.small) {
  PBUser(
    name: name,
    image: img,
    territory: "PHL",
    title: title
  )

  PBUser(
    name: name,
    territory: "PHL",
    title: title
  )

  PBUser(
    name: name,
    image: img,
    size: .small,
    title: title
  )

  PBUser(
    name: name,
    image: img,
    size: .small
  )
}

```
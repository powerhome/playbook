![user-size](https://github.com/powerhome/playbook/assets/92755007/4f463f27-028f-4d90-9d79-5f39caacc7a9)

```swift

let img = Image("andrew", bundle: .module)
let name = "Andrew K"
let title = "Rebels Developer"

VStack(alignment: .leading, spacing: Spacing.small) {
  PBUser(
    name: name,
    image: img,
    size: .small,
    territory: "PHL",
    title: title
  )

  PBUser(
    name: name,
    image: img,
    territory: "PHL",
    title: title
  )

  PBUser(
    name: name,
    image: img,
    size: .large,
    territory: "PHL",
    title: title
  )
}

```

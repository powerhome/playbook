![user-verticle-size](https://github.com/powerhome/playbook/assets/92755007/d5c3ad50-e144-47de-8c41-07b279d4875a)

```swift

let img = Image("andrew", bundle: .module)
let name = "Andrew K"
let title = "Rebels Developer"

VStack(alignment: .leading, spacing: Spacing.small) {
  PBUser(
    name: name,
    image: img,
    orientation: .vertical,
    size: .small,
    title: title
  )

  PBUser(
    name: name,
    image: img,
    orientation: .vertical,
    title: title
  )

  PBUser(
    name: name,
    image: img,
    orientation: .vertical,
    size: .large,
    title: title
  )
}

```

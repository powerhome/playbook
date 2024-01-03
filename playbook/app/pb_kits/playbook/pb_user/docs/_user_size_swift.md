![user-size](https://github.com/powerhome/playbook/assets/54749071/ed012a15-64a1-4c13-a0bc-7457660992f6)


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

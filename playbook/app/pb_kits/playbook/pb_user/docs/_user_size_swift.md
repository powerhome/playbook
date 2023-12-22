![user-size](https://github.com/powerhome/playbook/assets/54749071/31f6ee0a-cf15-444f-9815-a9d47e07414f)


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

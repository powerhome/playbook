![user-verticle-size](https://github.com/powerhome/playbook/assets/54749071/e99b4c9b-0752-467e-971e-a6a5f520009e)


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

![user-text-only](https://github.com/powerhome/playbook/assets/54749071/ba04df54-6590-4db6-ad32-38932a08aced)


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

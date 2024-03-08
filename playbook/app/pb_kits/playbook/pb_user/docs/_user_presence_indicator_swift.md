![user-presence-indicator)](https://github.com/powerhome/playbook/assets/112719604/96ee8408-2e21-4aaf-ae65-9f023515cf8d)

```swift
VStack(alignment: .leading, spacing: Spacing.small) {
  PBUser(
    name: name,

    image: img,
    size: .small,
    territory: "PHL",
    title: title,
    status: .online
  )
  PBUser(
    name: name,
    image: img,
    territory: "PHL",
    title: title,
    status: .away
  )
  PBUser(
    name: name,
    image: img,
    size: .large,
    territory: "PHL",
    title: title,
    status: .offline
  )
}
```

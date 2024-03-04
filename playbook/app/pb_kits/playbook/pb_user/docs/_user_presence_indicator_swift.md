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

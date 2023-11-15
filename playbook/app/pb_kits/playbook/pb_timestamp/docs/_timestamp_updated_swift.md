![timestamp-updated](https://github.com/powerhome/playbook/assets/92755007/14717880-c584-4413-9d9b-c569392595b7)

```swift
VStack(alignment: .leading, spacing: Spacing.small) {
  PBTimestamp(
    Date().addingTimeInterval(-12),
    showUser: true,
    text: "Maricris Nanota",
    variant: .updated
  )
  .frame(minWidth: minWidth, maxWidth: .infinity, alignment: .leading)

  PBTimestamp(
    Date().addingTimeInterval(-12),
    variant: .updated
  )
  .frame(minWidth: minWidth, maxWidth: .infinity, alignment: .leading)
}
```

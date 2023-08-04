<img width="1326" alt="Timestamp (Time Ago)" src="https://github.com/powerhome/playbook/assets/92755007/bb10a951-b536-41cc-aa6c-b343e826af20">

```swift
VStack(alignment: .leading, spacing: Spacing.small) {
  PBTimestamp(
    Date().addingTimeInterval(-10),
    showUser: true,
    text: "Maricris Nanota",
        variant: .elapsed
  )
  .frame(minWidth: minWidth, maxWidth: .infinity, alignment: .leading)

  PBTimestamp(
    Date().addingTimeInterval(-36000),
        variant: .elapsed
  )
  .frame(minWidth: minWidth, maxWidth: .infinity, alignment: .leading)

  PBTimestamp(
    Date().addingTimeInterval(-36000),
        variant: .hideUserElapsed
  )
  .frame(minWidth: minWidth, maxWidth: .infinity, alignment: .leading)
}
```

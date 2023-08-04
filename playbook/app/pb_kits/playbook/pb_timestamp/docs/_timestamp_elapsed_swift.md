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
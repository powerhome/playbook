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
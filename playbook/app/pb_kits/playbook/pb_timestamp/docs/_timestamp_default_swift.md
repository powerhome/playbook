```swift
VStack(alignment: .leading, spacing: Spacing.small) {
  PBTimestamp(
    Date(),
    showDate: false
  )
  .frame(minWidth: minWidth, maxWidth: .infinity, alignment: .leading)

  PBTimestamp(
    Date()
  )
  .frame(minWidth: minWidth, maxWidth: .infinity, alignment: .leading)

  PBTimestamp(
    Date().addingTimeInterval(addThreeYear)
  )
  .frame(minWidth: minWidth, maxWidth: .infinity, alignment: .leading)

  PBTimestamp(
    Date().addingTimeInterval(subOneYear)
  )
  .frame(minWidth: minWidth, maxWidth: .infinity, alignment: .leading)
}
```
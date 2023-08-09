![timestamp-default](https://github.com/powerhome/playbook/assets/92755007/064c6a98-4bdd-4160-8f4b-589233762c80)

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
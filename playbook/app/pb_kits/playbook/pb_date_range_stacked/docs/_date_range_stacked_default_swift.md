![Date-Range-Stacked-Default](https://github.com/powerhome/playbook-swift/assets/54749071/ccb85e5d-0f6d-4ced-8154-aa9dfa72a131)

```swift
VStack(alignment: .leading, spacing: Spacing.small) {
  PBDateRangeStacked(
    startDate: Date().makeDate(year: 2019, month: 6, day: 18),
    endDate: Date().makeDate(year: 2020, month: 3, day: 20),
    startAlignment: .trailing,
    endAlignment: .leading,
    startVariant: .short(showIcon: false),
    endVariant: .short(showIcon: false)
  )
}
```

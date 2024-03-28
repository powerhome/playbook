```swift
VStack(alignment: .leading, spacing: Spacing.small) {
  PBDateStacked(
    alignment: .leading,
    date: Date().makeDate(year: 2018, month: 3, day: 20),
    variant: .standard,
    dateSize: .title4,
    isStandardStacked: true
  )
  PBDateStacked(
    alignment: .leading,
    date: Date().makeDate(year: 2018, month: 3, day: 20),
    variant: .standard,
    dateSize: .title3,
    isStandardStacked: true
  )
}
```

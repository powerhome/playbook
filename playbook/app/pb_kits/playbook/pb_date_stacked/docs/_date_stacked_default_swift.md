```swift
VStack(alignment: .leading, spacing: Spacing.small) {
  PBDateStacked(
    date: Date(),
    variant: .short(showIcon: false),
    dateSize: .title4,
    isMonthStacked: true
  )
  PBDateStacked(
    date: Date(),
    variant: .short(showIcon: false),
    dateSize: .title3,
    isMonthStacked: true
  )
}
```

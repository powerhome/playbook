```swift
VStack(alignment: .leading, spacing: Spacing.small) {
  PBDateStacked(
    alignment: .leading,
    date: Date(),
    variant: .short(showIcon: false),
    dateSize: .title4,
    isMonthStacked: true,
    isMonthBold: true
  )
  PBDateStacked(
    alignment: .center,
    date: Date().makeDate(year: 2018, month: 3, day: 20),
    variant: .standard,
    dateSize: .title4,
    isStandardStacked: true,
    isYearBold: true,
    isMonthBold: true
  )
  .frame(maxWidth: .infinity, alignment: .center)
  PBDateStacked(
    alignment: .trailing, 
    date: Date(),
    variant: .short(showIcon: false),
    dateSize: .title4,
    isMonthStacked: true,
    isMonthBold: true
  )
  .frame(maxWidth: .infinity, alignment: .trailing)
}
```

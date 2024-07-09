![Date-Stacked-Not-Current-Year](https://github.com/powerhome/playbook-swift/assets/54749071/f778f10f-21c3-42b9-b660-9def6c75ecf3)
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

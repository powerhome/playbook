![Date-Stacked-Default](https://github.com/powerhome/playbook-swift/assets/54749071/5185a6b6-534a-43c0-8c87-abecf770b8f5)
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

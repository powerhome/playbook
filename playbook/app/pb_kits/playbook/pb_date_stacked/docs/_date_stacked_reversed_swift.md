![Date-Stacked-Reversed](https://github.com/powerhome/playbook-swift/assets/54749071/4dc3ff84-3a0d-4d9b-a363-5d649a3bdae6)
```swift
VStack(alignment: .leading, spacing: Spacing.small) {
  PBDateStacked(
    date: Date(),
    variant: .short(showIcon: false),
    dateSize: .title4,
    isReversed: true
  )
  PBDateStacked(
    date: Date(),
    variant: .short(showIcon: false),
    dateSize: .title3,
    isReversed: true
  )
}
```

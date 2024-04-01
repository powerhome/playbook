```swift
VStack(alignment: .leading, spacing: Spacing.small) {
  PBDateYearStacked(
    date: Date(),
    alignment: .leading
  )
  .frame(maxWidth: .infinity, alignment: .leading)
  PBDateYearStacked(
    date: Date(),
    alignment: .center
  )
  .frame(maxWidth: .infinity, alignment: .center)
  PBDateYearStacked(
    date: Date(),
    alignment: .trailing
  )
  .frame(maxWidth: .infinity, alignment: .trailing)
}
```

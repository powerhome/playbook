![Date-Year-Stacked-Default](https://github.com/powerhome/playbook-swift/assets/54749071/997c9389-669a-42d4-b4af-661d546024b9)
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

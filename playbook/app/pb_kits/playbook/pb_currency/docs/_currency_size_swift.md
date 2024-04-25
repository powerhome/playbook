```swift
VStack(alignment: .leading, spacing: Spacing.small) {
  PBCurrency(
    amount: "2,000",
    decimalAmount: ".50",
    label: "small",
    size: .title4,
    symbol: "en_US",
    isEmphasized: true
  )
  PBCurrency(
    amount: "342",
    decimalAmount: ".00",
    label: "medium",
    size: .title3,
    symbol: "en_EU",
    isEmphasized: true
  )
  PBCurrency(
    amount: "45",
    label: "large",
    size: .title1,
    symbol: "en_US",
    unit: "/mo",
    isEmphasized: true,
    hasUnit: true
  )
}
```

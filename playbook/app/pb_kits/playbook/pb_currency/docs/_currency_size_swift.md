![Currency-Size](https://github.com/powerhome/playbook-swift/assets/54749071/bf3810f9-6dd2-4bdd-b32a-14109f3a0b9a)

```swift
VStack(alignment: .leading, spacing: Spacing.small) {
  PBCurrency(
    dollarAmount: "2,000",
    decimalAmount: ".50",
    label: "small",
    size: .title4,
    symbol: "en_US",
    isEmphasized: true
  )
}
```


[!Currency-Alignment](https://github.com/powerhome/playbook/assets/112719604/b4e2b69e-b132-44c5-a68e-c330b3e94718)

```swift
VStack(alignment: .leading, spacing: Spacing.small) {
  HStack {
    PBCurrency(
      amount: "2,000",
      decimalAmount: ".50",
      label: "left",
      size: .title4,
      symbol: "en_US",
      isEmphasized: true,
      alignment: .leading
    )
  }
  .frame(maxWidth: .infinity, alignment: .leading)
  HStack {
    PBCurrency(
      amount: "342",
      decimalAmount: ".00",
      label: "center",
      size: .title4,
      symbol: "en_EU",
      isEmphasized: true,
      alignment: .center
    )
  }
  .frame(maxWidth: .infinity, alignment: .center)
  HStack {
    PBCurrency(
      amount: "45",
      label: "right",
      size: .title4,
      symbol: "en_US",
      unit: "/mo",
      isEmphasized: true,
      hasUnit: true,
      alignment: .trailing
    )
  }
  .frame(maxWidth: .infinity, alignment: .trailing)
}
```

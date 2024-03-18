![date-alignment](https://github.com/powerhome/playbook/assets/92755007/094761cb-5151-4de5-a8e1-f905455c2aca)

```swift
 VStack(spacing: Spacing.small) {
  HStack {
    PBDate(
      Date().makeDate(year: 1995, month: 12, day: 25),
      variant: .standard,
      typography: .title4
    )
  }
  .frame(maxWidth: .infinity, alignment: .leading)
  HStack {
    PBDate(
      Date().makeDate(year: 2020, month: 12, day: 25),
      variant: .withIcon(isStandard: true),
      typography: .title4,
      iconSize: .x1
    )
  }
  .frame(maxWidth: .infinity, alignment: .center)
  HStack {
    PBDate(
    Date(),
    variant: .short,
    typography: .title4
   )
  }
  .frame(maxWidth: .infinity, alignment: .trailing)
}
```

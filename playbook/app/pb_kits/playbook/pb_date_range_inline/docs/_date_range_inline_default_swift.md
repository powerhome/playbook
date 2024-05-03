![Date-Range-Inline-Default](https://github.com/powerhome/playbook-swift/assets/54749071/793dc133-b2a8-4283-96e1-c8b19065392d)

```swift
VStack(alignment: .leading, spacing: Spacing.large) {
  VStack(alignment: .leading, spacing: Spacing.small) {
    PBDateRangeInline(
      size: .caption,
      iconSize: .xSmall,
      startDate: "18 Jun 2013",
      endDate: "20 Mar 2015",
      startVariant: .standard
    )
    PBDateRangeInline(
      size: .body, 
      iconSize: .x1,
      startDate: "18 Jun 2013",
      endDate: "20 Mar 2015",
      startVariant: .standard
    )
  }
  .frame(maxWidth: .infinity, alignment: .leading)
  VStack(alignment: .center, spacing: Spacing.small) {
    PBDateRangeInline(
      size: .caption, 
      iconSize: .xSmall,
      startDate: "15 Jan 2013",
      endDate: "15 Aug 2015",
      startVariant: .short(showIcon: true),
      endVariant: .short(showIcon: false)
    )
    PBDateRangeInline(
      size: .body, 
      iconSize: .x1,
      startDate: "15 Jan 2013",
      endDate: "15 Aug 2015",
      startVariant: .short(showIcon: true),
      endVariant: .short(showIcon: false)
    )
  }
  .frame(maxWidth: .infinity, alignment: .center)
  VStack(alignment: .trailing, spacing: Spacing.small) {
    PBDateRangeInline(
      size: .caption, 
      iconSize: .xSmall,
      startDate: "15 Jan 2013",
      endDate: "15 Aug 2015",
      startVariant: .short(showIcon: true),
      endVariant: .short(showIcon: false)
    )
    PBDateRangeInline(
      size: .body, 
      iconSize: .x1,
      startDate: "15 Jan 2013",
      endDate: "15 Aug 2015",
      startVariant: .short(showIcon: true),
      endVariant: .short(showIcon: false)
    )
  }
  .frame(maxWidth: .infinity, alignment: .trailing)
}
```



```swift

VStack(alignment: .leading, spacing: Spacing.small) {
  PBDate(Date(), variant: .withIcon(isStandard: true), typography: .caption, iconSize: .xSmall)
  PBDate(Date(), variant: .standard, typography: .title4)
  PBDate(Date(), variant: .withIcon(isStandard: true), typography: .title4, iconSize: .x1)
  PBDate(Date(), variant: .dayDate, typography: .title4)
  PBDate(Date(), variant: .withIcon(isStandard: false), typography: .title4, iconSize: .x1)
}

```
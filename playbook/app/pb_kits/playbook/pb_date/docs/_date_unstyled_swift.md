

```swift

VStack(alignment: .leading, spacing: Spacing.small) {
  PBDate(Date(), variant: .short, typography: .body)
  PBDate(Date(), variant: .standard, typography: .title1)
  PBDate(Date(), variant: .withIcon(isStandard: false), typography: .subcaption, iconSize: .xSmall)
}

```
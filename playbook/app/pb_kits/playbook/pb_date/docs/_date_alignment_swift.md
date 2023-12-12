

```swift

VStack(spacing: Spacing.small) {
  PBDate(Date(), variant: .standard, typography: .title4, alignment: .leading)
  PBDate(Date(), variant: .withIcon(isStandard: true), typography: .title4, iconSize: .x1, alignment: .center)
  PBDate(Date(), variant: .short, typography: .title4, alignment: .trailing)
}

```
![date-unstyled](https://github.com/powerhome/playbook/assets/92755007/dc0ab7cf-0d97-407c-9aac-f53645eb6ee2)

```swift

VStack(alignment: .leading, spacing: Spacing.small) {
  PBDate(Date(), variant: .short, typography: .body)
  PBDate(Date(), variant: .standard, typography: .title1)
  PBDate(Date(), variant: .withIcon(isStandard: false), typography: .subcaption, iconSize: .xSmall)
}

```

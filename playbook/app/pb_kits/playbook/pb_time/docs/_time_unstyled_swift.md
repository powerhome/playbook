```swift
 VStack(spacing: Spacing.small) {
      PBTime(
        variant: .iconTimeZone,
        isLowercase: true,
        isBold: true,
        isIconBold: true,
        isTimeZoneBold: true,
        unstyled: .body
      )
      PBTime(
        iconSize: .x3,
        variant: .iconTimeZone,
        isLowercase: true,
        isBold: true,
        isIconBold: true,
        isTimeZoneBold: true,
        unstyled: .title1
      )
      PBTime(
        iconSize: .xSmall,
        variant: .iconTimeZone,
        isLowercase: true,
        unstyled: .subcaption
      )
    }
```

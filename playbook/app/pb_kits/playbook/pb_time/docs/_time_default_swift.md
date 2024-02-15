```swift
VStack(alignment: .leading, spacing: Spacing.small) {
      PBTime(variant: .time)
      PBTime(showTimeZone: true,
             variant: .iconTimeZone
      )
      PBTime(showIcon: true,
             variant: .iconTimeZone
      )
      PBTime(variant: .iconTimeZone)
      Spacer()
      PBTime(variant: .time,
             isLowercase: true,
             isBold: true,
             unstyled: .body

      )
      PBTime(showTimeZone: true,
             variant: .iconTimeZone,
             isLowercase: true,
             isBold: true,
             unstyled: .body
      )
      PBTime(showIcon: true,
             variant: .iconTimeZone,
             isLowercase: true,
             isBold: true
      )
      PBTime(variant: .iconTimeZone,
             isLowercase: true,
             isBold: true,
             unstyled: .body
      )
     
    }
```

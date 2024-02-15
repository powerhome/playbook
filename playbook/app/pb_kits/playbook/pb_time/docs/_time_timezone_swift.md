```swift
    VStack(alignment: .leading, spacing: Spacing.small) {
      PBTime(showTimeZone: true, 
             variant: .withTimeZoneHeader,
             isLowercase: true,
             header: "East Coast",
             isBold: true,
             unstyled: .body
      )
      PBTime(showTimeZone: true, 
             variant: .withTimeZoneHeader,
             header: "Central",
             zone: .central,
             timeIdentifier: "CST"
      )
      PBTime(showTimeZone: true,
             variant: .withTimeZoneHeader,
             header: "Mountain",
             zone: .mountain,
             timeIdentifier: "MST"
      )
      PBTime(showTimeZone: true,
             variant: .withTimeZoneHeader,
             header: "West Coast",
             zone: .pacific,
             timeIdentifier: "PST"
      )
      PBTime(showTimeZone: true,
             variant: .withTimeZoneHeader,
             header: "Tokyo, Japan",
             zone: .gmt,
             timeIdentifier: "GMT"
      )
    }
```

```swift
VStack(spacing: Spacing.small) {
  HStack {
    PBDateTime(
      dateVariant: .short(showIcon: false),
      timeVariant: .iconTimeZone,
      isLowercase: true,
      isTimeBold: true,
      zone: .utc,
      showTimeZone: true,
      timeZoneIdentifier: "2012-08-02T17:49:29Z"
    )
  }
  .frame(maxWidth: .infinity, alignment: .leading)
    PBDateTime(
        dateVariant: .short(showIcon: false),
        timeVariant: .iconTimeZone,
        isLowercase: true,
        isTimeBold: true,
        zone: .utc,
        showTimeZone: true,
        timeZoneIdentifier: "2012-08-02T17:49:29Z"
      )
  HStack {
    PBDateTime(
      dateVariant: .short(showIcon: false),
      timeVariant: .iconTimeZone,
      isLowercase: true,
      isTimeBold: true,
      zone: .utc,
      showTimeZone: true,
      timeZoneIdentifier: "2012-08-02T17:49:29Z"
    )
  }
  .frame(maxWidth: .infinity, alignment: .trailing)
}
```

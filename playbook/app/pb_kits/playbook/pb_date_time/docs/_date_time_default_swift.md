```swift
VStack(alignment: .leading, spacing: Spacing.small) {
  PBDateTime(
    dateVariant: .dayDate(showYear: true),
    timeVariant: .iconTimeZone,
    isLowercase: true,
    isTimeBold: true,
    timeZoneIdentifier: "EST"
  )
  PBDateTime(
    dateVariant: .dayDate(showYear: false),
    timeVariant: .iconTimeZone,
    isLowercase: true,
    isTimeBold: true,
    zone: .utc,
    showTimeZone: true,
    timeZoneIdentifier: "2012-08-02T17:49:29Z"
  )
  PBDateTime(
    dateVariant: .short(showIcon: false),
    timeVariant: .iconTimeZone,
    isLowercase: true,
    isTimeBold: true,
    zone: .utc,
    showTimeZone: true,
    timeZoneIdentifier: "2012-08-02T17:49:29Z",
    showIcon: true
  )
  PBDateTime(
    dateVariant: .standard,
    timeVariant: .iconTimeZone,
    isLowercase: true,
    isTimeBold: true,
    showTimeZone: true,
    timeZoneIdentifier: "GMT+9"
  )
}
```

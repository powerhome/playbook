```swift
VStack(alignment: .leading, spacing: Spacing.xSmall) {
  PBDateTime(
    dateVariant: .dayDate(showYear: false), 
    timeVariant: .iconTimeZone,
    fontSize: .caption,
    zone: .utc,
    showTimeZone: true,
    timeZoneIdentifier: "2012-08-02T17:49:29Z",
    showIcon: true
  )
  PBDateTime(
    dateVariant: .dayDate(showYear: false),
    timeVariant: .iconTimeZone,
    fontSize: .caption,
    zone: .utc,
    showTimeZone: true,
    timeZoneIdentifier: "2012-08-02T17:49:29Z"
  )
  PBDateTime(
    dateVariant: .short(showIcon: false),
    timeVariant: .iconTimeZone,
    fontSize: .caption,
    zone: .utc,
    showTimeZone: true,
    timeZoneIdentifier: "2012-08-02T17:49:29Z",
    showIcon: true
  )
  PBDateTime(
    dateVariant: .short(showIcon: false),
    timeVariant: .iconTimeZone,
    fontSize: .caption,
    zone: .utc,
    showTimeZone: true,
    timeZoneIdentifier: "2012-08-02T17:49:29Z"
  )
  Spacer()
  PBDateTime(
    dateVariant: .dayDate(showYear: false),
    timeVariant: .iconTimeZone,
    isLowercase: true,
    isTimeBold: true,
    zone: .utc,
    showTimeZone: true,
    timeZoneIdentifier: "2012-08-02T17:49:29Z",
    showIcon: true
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
    dateVariant: .short(showIcon: false),
    timeVariant: .iconTimeZone,
    isLowercase: true,
    isTimeBold: true,
    zone: .utc,
    showTimeZone: true,
    timeZoneIdentifier: "2012-08-02T17:49:29Z"
  )
}
```

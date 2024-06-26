![Date-Time-Sizes](https://github.com/powerhome/playbook-swift/assets/54749071/59b2394d-cf25-46b5-a634-ca0721a7b3b0)
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

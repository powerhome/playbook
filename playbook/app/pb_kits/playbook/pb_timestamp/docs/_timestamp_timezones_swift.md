```swift
VStack(alignment: .leading, spacing: Spacing.small) {
  Group {
    PBTimestamp(
      Date(),
      showDate: false,
      showTimeZone: true,
      timeZone: "America/New_York"
    )
    .frame(minWidth: minWidth, maxWidth: .infinity, alignment: .leading)

    PBTimestamp(
      Date(),
      showTimeZone: true,
      timeZone: "America/New_York"
    )
    .frame(minWidth: minWidth, maxWidth: .infinity, alignment: .leading)

    PBTimestamp(
      Date().addingTimeInterval(addThreeYear),
      showTimeZone: true,
      timeZone: "America/New_York"
    )
    .frame(minWidth: minWidth, maxWidth: .infinity, alignment: .leading)

    PBTimestamp(
      Date().addingTimeInterval(subOneYear),
      showTimeZone: true,
      timeZone: "America/New_York"
    )
    .frame(minWidth: minWidth, maxWidth: .infinity, alignment: .leading)
  }

  Group {
    PBTimestamp(
      Date(),
      showDate: false,
      showTimeZone: true,
      timeZone: "Asia/Hong_Kong"
    )
    .frame(minWidth: minWidth, maxWidth: .infinity, alignment: .leading)

    PBTimestamp(
      Date(),
      showTimeZone: true,
      timeZone: "Asia/Hong_Kong"
    )
    .frame(minWidth: minWidth, maxWidth: .infinity, alignment: .leading)

    PBTimestamp(
      Date().addingTimeInterval(addThreeYear),
      showTimeZone: true,
      timeZone: "Asia/Hong_Kong"
    )
    .frame(minWidth: minWidth, maxWidth: .infinity, alignment: .leading)

    PBTimestamp(
      Date().addingTimeInterval(subOneYear),
      showTimeZone: true,
      timeZone: "Asia/Hong_Kong"
    )
    .frame(minWidth: minWidth, maxWidth: .infinity, alignment: .leading)
  }
}
```
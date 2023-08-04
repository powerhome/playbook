<img width="1326" alt="Timestamp (Last Updated)" src="https://github.com/powerhome/playbook/assets/92755007/ccc2b3c7-d7c3-40a0-ac24-d433bd3e054a">

```swift
VStack(alignment: .leading, spacing: Spacing.small) {
  Group {
    PBTimestamp(
      Date(),
      showDate: false
    )
    .frame(minWidth: minWidth, maxWidth: .infinity, alignment: .leading)

    PBTimestamp(Date())
      .frame(minWidth: minWidth, maxWidth: .infinity, alignment: .leading)

    PBTimestamp(Date().addingTimeInterval(addThreeYear))
      .frame(minWidth: minWidth, maxWidth: .infinity, alignment: .leading)

    PBTimestamp(Date().addingTimeInterval(subOneYear))
      .frame(minWidth: minWidth, maxWidth: .infinity, alignment: .leading)
  }

  Group {
    PBTimestamp(
      Date(),
      showDate: false
    )
      .frame(minWidth: minWidth, maxWidth: .infinity, alignment: .center)

    PBTimestamp(Date())
      .frame(minWidth: minWidth, maxWidth: .infinity, alignment: .center)

    PBTimestamp(Date().addingTimeInterval(addThreeYear))
      .frame(minWidth: minWidth, maxWidth: .infinity, alignment: .center)

    PBTimestamp(Date().addingTimeInterval(subOneYear))
      .frame(minWidth: minWidth, maxWidth: .infinity, alignment: .center)
  }

  Group {
    PBTimestamp(
      Date(),
      showDate: false
    )
    .frame(minWidth: minWidth, maxWidth: .infinity, alignment: .trailing)

    PBTimestamp(Date())
      .frame(minWidth: minWidth, maxWidth: .infinity, alignment: .trailing)

    PBTimestamp(Date().addingTimeInterval(addThreeYear))
      .frame(minWidth: minWidth, maxWidth: .infinity, alignment: .trailing)

    PBTimestamp(Date().addingTimeInterval(subOneYear))
      .frame(minWidth: minWidth, maxWidth: .infinity, alignment: .trailing)
  }
}
```

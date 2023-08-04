![timestamp-align](https://github.com/powerhome/playbook/assets/92755007/9107e699-218e-4a15-a0f9-b1a8f4710c37)

```swiftå
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

![date-default](https://github.com/powerhome/playbook/assets/92755007/0d9f151d-2a18-445c-add3-8194c343bfea)


```swift

VStack(alignment: .leading, spacing: Spacing.small) {
  PBDate(Date(), variant: .short)
  PBDate(Date(), variant: .dayDate)
  PBDate(Date(), variant: .standard)
  Spacer()
  PBDate(Date(), variant: .short, typography: .title4)
  PBDate(Date(), variant: .dayDate, typography: .title4)
  PBDate(Date(), variant: .standard, typography: .title4)
}

```

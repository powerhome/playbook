![date-default](https://github.com/powerhome/playbook/assets/92755007/0d9f151d-2a18-445c-add3-8194c343bfea)


```swift
VStack(alignment: .leading, spacing: Spacing.small) {
  PBDate(
    Date(),
    variant: .short
  )
  PBDate(
    Date().makeDate(year: 2012, month: 8, day: 3),
    variant: .standard
  )
  PBDate(
    Date().makeDate(year: 2017, month: 12, day: 3),
    variant: .dayDate(showYear: true)
  )
  Spacer()
  PBDate(
    Date(),
    variant: .short, 
    typography: .title4
  )
  PBDate(
    Date().makeDate(year: 2012, month: 8, day: 3),
    variant: .standard, 
    typography: .title4
  )
  PBDate(
    Date().makeDate(year: 2017, month: 12, day: 3),
    variant: .dayDate(showYear: true),
    typography: .title4
  )
}
```

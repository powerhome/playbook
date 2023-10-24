```swift
VStack(alignment: .leading, spacing: Spacing.small) {
  Text("Default").pbFont(.detail(true), color: .text(.default))
  PBCard {
    Text(text).pbFont(.body)
  }

  Text("Selected").pbFont(.detail(true), color: .text(.default))
  PBCard(style: .selected()) {
    Text(text).pbFont(.body)
  }
  
  Text("Error").pbFont(.detail(true), color: .text(.default))
  PBCard(style: .error) {
    Text(text).pbFont(.body)
  }
 }
```
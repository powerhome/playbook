![card-styles](https://github.com/powerhome/playbook/assets/92755007/b6ea347b-6a7b-46e8-b4ce-213727587499)

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

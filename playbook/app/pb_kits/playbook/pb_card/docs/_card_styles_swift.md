![card-styles](https://github.com/powerhome/playbook/assets/92755007/b6ea347b-6a7b-46e8-b4ce-213727587499)

```swift
VStack(alignment: .leading, spacing: Spacing.small) {
  PBCard {
    Text("Card Context").pbFont(.body)
  }

  PBCard(style: .selected()) {
    Text("Card Context").pbFont(.body)
  }
  
  PBCard(style: .error) {
    Text("Card Context").pbFont(.body)
  }
 }
```

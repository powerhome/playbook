![card-highlight](https://github.com/powerhome/playbook/assets/92755007/aba8c811-e21a-4aee-8d2d-64789989875d)

```swift
VStack(spacing: Spacing.small) {
  PBCard(highlight: .side(.product(.product6, category: .highlight))) {
    Text("Side Position & Product 6 Highlight Color").pbFont(.body)
  }

  PBCard(highlight: .top(.status(.warning))) {
    Text("Top Position & Warning Color").pbFont(.body)
  }

  PBCard(highlight: .side(.category(.category2))) {
    Text("Side Position & Category 2 Color").pbFont(.body)
  }
 }
```

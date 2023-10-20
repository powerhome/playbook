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
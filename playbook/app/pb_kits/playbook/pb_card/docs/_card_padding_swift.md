```swift
VStack(spacing: Spacing.small) {
  PBCard(padding: Spacing.none) {
    Text("None").pbFont(.body)
  }

  PBCard(padding: Spacing.xxSmall) {
    Text("XX Small").pbFont(.body)
  }

  PBCard(padding: Spacing.xSmall) {
    Text("X Small").pbFont(.body)
  }

  PBCard(padding: Spacing.small) {
    Text("Small").pbFont(.body)
  }

  PBCard(padding: Spacing.medium) {
    Text("Medium").pbFont(.body)
  }

  PBCard(padding: Spacing.large) {
    Text("Large").pbFont(.body)
  }

  PBCard(padding: Spacing.xLarge) {
    Text("X Large").pbFont(.body)
  }
 }
```
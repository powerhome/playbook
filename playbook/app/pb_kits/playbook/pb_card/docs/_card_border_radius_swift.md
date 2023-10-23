```swift
VStack(spacing: Spacing.small) {
  PBCard(borderRadius: BorderRadius.none) {
    Text("None").pbFont(.body)
  }

  PBCard(borderRadius: BorderRadius.xSmall) {
    Text("X Small").pbFont(.body)
  }

  PBCard(borderRadius: BorderRadius.small) {
    Text("Small").pbFont(.body)
  }

  PBCard(borderRadius: BorderRadius.medium) {
    Text("Medium").pbFont(.body)
  }

  PBCard(borderRadius: BorderRadius.large) {
    Text("Large").pbFont(.body)
  }

   PBCard(borderRadius: BorderRadius.xLarge) {
    Text("X Large").pbFont(.body)
  }
 }
 ``````
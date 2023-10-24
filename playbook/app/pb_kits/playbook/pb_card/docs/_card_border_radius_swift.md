![card-border-radius](https://github.com/powerhome/playbook/assets/92755007/c2c0965f-7c4f-4e7b-8c94-f187c724939d)

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

   PBCard(borderRadius: BorderRadius.rounded) {
    Text("Rounded").pbFont(.body)
  }
 }
 ``````

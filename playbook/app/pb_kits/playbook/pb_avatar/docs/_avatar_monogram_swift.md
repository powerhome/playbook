![avatar-monogram](https://github.com/powerhome/playbook/assets/92755007/c7fd747d-46a9-4da0-8d89-dfa3647ea572)

```swift
  VStack(alignment: .leading, spacing: Spacing.small) {
      PBAvatar(image: Image("andrew", bundle: .module), size: .xxSmall, status: .online)
      PBAvatar(image: Image("andrew", bundle: .module), size: .xSmall, status: .away)
      PBAvatar(image: Image("andrew", bundle: .module), size: .small, status: .online)
      PBAvatar(image: Image("andrew", bundle: .module), size: .medium, status: .away)
      PBAvatar(image: Image("andrew", bundle: .module), size: .large, status: .online)
      PBAvatar(image: Image("andrew", bundle: .module), size: .xLarge, status: .offline)
    }
```
![avatar-default](https://github.com/powerhome/playbook/assets/92755007/b1bed6d5-56b4-40e2-96c3-6090642fc89f)

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
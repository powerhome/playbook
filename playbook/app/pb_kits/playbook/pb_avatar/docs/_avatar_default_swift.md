![avatar-default](https://github.com/powerhome/playbook/assets/92755007/b1bed6d5-56b4-40e2-96c3-6090642fc89f)

```swift
VStack(alignment: .leading, spacing: Spacing.small) {
  PBAvatar(name: "Tim Wenhold", size: .xxSmall, status: .online)
  PBAvatar(name: "Tim Wenhold", size: .xSmall, status: .away)
  PBAvatar(name: "Tim Wenhold", size: .small, status: .online)
  PBAvatar(name: "Tim Wenhold", size: .medium, status: .away)
  PBAvatar(name: "Tim Wenhold", size: .large, status: .online)
  PBAvatar(name: "Tim", size: .xLarge, status: .offline)
}
```
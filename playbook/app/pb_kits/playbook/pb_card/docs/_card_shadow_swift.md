![card-shadow](https://github.com/powerhome/playbook/assets/92755007/7dd7edc1-a2b1-4e91-b271-9c897c9ededd)

```swift
VStack(spacing: Spacing.small) {
  PBCard(shadow: Shadow.deep) {
    Text("Deep").pbFont(.body)
  }

  PBCard(shadow: Shadow.deeper) {
    Text("Deeper").pbFont(.body)
  }

  PBCard(shadow: Shadow.deepest) {
    Text("Deepest").pbFont(.body)
  }

  PBCard(shadow: Shadow.none) {
    Text("None").pbFont(.body)
  }
 }
```

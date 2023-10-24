![card-header](https://github.com/powerhome/playbook/assets/92755007/a8fd21a1-89cb-4ec2-97f6-d6427f1264c2)

```swift
Stack(spacing: Spacing.small) {
  PBCard(padding: Spacing.none) {
    PBCardHeader(color: .category(.category1)) {
      Text("Category 1").pbFont(.body, color: .white).padding(Spacing.small)
    }
      Text("Body").pbFont(.body, color: .text(.default)).padding(Spacing.small)
  }

  PBCard(padding: Spacing.none) {
    PBCardHeader(color: .category(.category3)) {
      Text("Category 3").pbFont(.body, color: .black).padding(Spacing.small)
    }
    Text("Body").pbFont(.body, color: .text(.default)).padding(Spacing.small)
  }

  PBCard(padding: Spacing.none) {
    PBCardHeader(color: .product(.product2, category: .background)) {
      Text("Product 2 Background").pbFont(.body, color: .white).padding(Spacing.small)
    }
      Text("Body").pbFont(.body, color: .text(.default)).padding(Spacing.small)
  }

  PBCard(padding: Spacing.none) {
    PBCardHeader(color: .product(.product6, category: .background)) {
      Text("Product 6 Background").pbFont(.body, color: .white).padding(Spacing.small)
    }
      Text("Body").pbFont(.body, color: .text(.default)).padding(Spacing.small)
  }
}
```

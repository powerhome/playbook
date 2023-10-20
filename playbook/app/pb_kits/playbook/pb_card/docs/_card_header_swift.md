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
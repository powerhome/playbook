```swift
VStack(alignment: .leading, spacing: Spacing.small) {
  PBCard {
    Text(text).pbFont(.body)
  }

  PBCard(backgroundColor: .background(.light)) {
    Text("Light").pbFont(.body, color: .text(.light))
  }
        
  PBCard(backgroundColor: .background(.dark)) {
    Text("Dark").pbFont(.body, color: .text(.light))
  }

  PBCard(backgroundColor: .product(.product1, category: .background)) {
    Text("Product 1 Background").pbFont(.body, color: .white)
  }

  PBCard(backgroundColor: .product(.product7, category: .highlight)) {
    Text("Product 7 Highlight").pbFont(.body, color: .white)
  }

  PBCard(backgroundColor: .product(.product2, category: .highlight)) {
    Text("Product 2 Highlight").pbFont(.body, color: .white)
  }
 }
```
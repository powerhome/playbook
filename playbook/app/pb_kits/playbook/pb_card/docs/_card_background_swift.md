![card-background-colors](https://github.com/powerhome/playbook/assets/92755007/9b9a6519-0f79-4d8c-a58a-ea5799f9e679)

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

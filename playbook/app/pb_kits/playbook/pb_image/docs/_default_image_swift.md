```swift

VStack(alignment: .leading) {
  Text("None").pbFont(.detail(true), color: .text(.default))
  PBImage(
    image: nil,
    placeholder: Image("Forest", bundle: .module),
    size: .none,
    rounded: .sharp
  )
}

```
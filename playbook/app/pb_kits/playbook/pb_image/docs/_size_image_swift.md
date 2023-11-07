```swift

VStack(alignment: .leading, spacing: Spacing.small) {
  Text("xSmall").pbFont(.detail(true), color: .text(.default))
  PBImage(
    image: nil,
    placeholder: Image("Forest", bundle: .module),
    size: .xSmall,
    rounded: .sharp
  )

  Text("small").pbFont(.detail(true), color: .text(.default))
  PBImage(
    image: nil,
    placeholder: Image("Forest", bundle: .module),
    size: .small,
    rounded: .sharp
  )

  Text("medium").pbFont(.detail(true), color: .text(.default))
  PBImage(
    image: nil,
    placeholder: Image("Forest", bundle: .module),
    size: .medium,
    rounded: .sharp
  )

  Text("large").pbFont(.detail(true), color: .text(.default))
  PBImage(
    image: nil,
    placeholder: Image("Forest", bundle: .module),
    size: .large,
    rounded: .sharp
  )

  Text("xLarge").pbFont(.detail(true), color: .text(.default))
  PBImage(
    image: nil,
    placeholder: Image("Forest", bundle: .module),
    size: .xLarge,
    rounded: .sharp
  )
}

```
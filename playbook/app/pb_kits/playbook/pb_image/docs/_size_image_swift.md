![image-size](https://github.com/powerhome/playbook/assets/92755007/261600b9-b49c-4f5b-8c80-9ecc65dc424a)

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

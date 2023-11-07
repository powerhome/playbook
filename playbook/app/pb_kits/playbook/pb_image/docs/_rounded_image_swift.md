![image-rounded](https://github.com/powerhome/playbook/assets/92755007/ee2cff73-2702-4a09-b654-f151bbdf90f2)

```swift

VStack(alignment: .leading, spacing: Spacing.small) {
  Text("xSmall").pbFont(.detail(true), color: .text(.default))
  PBImage(
    image: nil,
    placeholder: Image("Forest", bundle: .module),
    size: .xSmall,
    rounded: .rounded
  )

  Text("small").pbFont(.detail(true), color: .text(.default))
  PBImage(
    image: nil,
    placeholder: Image("Forest", bundle: .module),
    size: .small,
    rounded: .rounded
  )

  Text("medium").pbFont(.detail(true), color: .text(.default))
  PBImage(
    image: nil,
    placeholder: Image("Forest", bundle: .module),
    size: .medium,
    rounded: .rounded
  )

  Text("large").pbFont(.detail(true), color: .text(.default))
  PBImage(
    image: nil,
    placeholder: Image("Forest", bundle: .module),
    size: .large,
    rounded: .rounded
  )

  Text("xLarge").pbFont(.detail(true), color: .text(.default))
  PBImage(
    image: nil,
    placeholder: Image("Forest", bundle: .module),
    size: .xLarge,
    rounded: .rounded
  )
}

```

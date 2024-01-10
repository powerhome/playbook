![nav-horizontal-default](https://github.com/powerhome/playbook/assets/54749071/8731ad83-322f-43f8-8459-76bc425ba30f)

```swift
 @State private var selectedHDefault: Int = 1

 PBNav(
          selected: $selectedHDefault,
          variant: .normal,
          orientation: .horizontal
        ) {
          PBNavItem("Photos")
          PBNavItem("Music")
          PBNavItem("Video")
          PBNavItem("Files")
        }

```

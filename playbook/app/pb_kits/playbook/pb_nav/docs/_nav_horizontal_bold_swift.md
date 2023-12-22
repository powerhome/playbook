![nav-horizontal-bold](https://github.com/powerhome/playbook/assets/54749071/f55f31c5-dbf9-40e2-9f08-6a075c7cb56b)

```swift
@State private var selectedHBold: Int = 1

PBNav(
        selected: $selectedHBold,
        variant: .bold,
        orientation: .horizontal,
        borders: false
      ) {
        PBNavItem("Photos")
        PBNavItem("Music")
        PBNavItem("Video")
        PBNavItem("Files")
      }
```

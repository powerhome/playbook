![nav-vertical-bold](https://github.com/powerhome/playbook/assets/54749071/4d9ea3b7-c2e8-4703-80e3-54e4cee8dbfc)

```swift
 @State private var selectedVBold: Int = 1

PBNav(
        selected: $selectedVBold,
        variant: .bold,
        orientation: .vertical,
        borders: false
      ) {
        PBNavItem("Photos")
        PBNavItem("Music")
        PBNavItem("Video")
        PBNavItem("Files")
      }

```

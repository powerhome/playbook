![nav-vertical-default](https://github.com/powerhome/playbook/assets/54749071/ddbf0c77-4d98-483e-9f12-561ac169e6a9)

```swift
@State private var selectedVDefault: Int = 1

PBNav(
        selected: $selectedVDefault,
        variant: .normal,
        orientation: .vertical,
        title: "Menu"
      ) {
        PBNavItem("Photos")
        PBNavItem("Music")
        PBNavItem("Video")
        PBNavItem("Files")
      }

```

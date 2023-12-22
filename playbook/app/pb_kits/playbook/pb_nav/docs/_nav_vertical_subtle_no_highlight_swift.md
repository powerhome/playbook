![nav-vertical-subtle_no-highlight](https://github.com/powerhome/playbook/assets/54749071/3f6d5773-6aa4-4ea1-a0b2-948e4325a311)

```swift
@State private var selectedVSubtleNoHighlight: Int = 1

PBNav(
        selected: $selectedVSubtleNoHighlight,
        variant: .subtle,
        orientation: .vertical,
        borders: false,
        highlight: false
      ) {
        PBNavItem("Photos")
        PBNavItem("Music")
        PBNavItem("Video")
        PBNavItem("Files")
      }

```

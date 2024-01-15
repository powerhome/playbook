![nav-vertical-subtle](https://github.com/powerhome/playbook/assets/54749071/06a30a15-661a-4779-a674-7b4e6cded472)

```swift
@State private var selectedVSubtle: Int = 1

PBNav(
        selected: $selectedVSubtle,
        variant: .subtle,
        orientation: .vertical,
        borders: false
      ) {
        PBNavItem("Photos")
        PBNavItem("Music")
        PBNavItem("Video")
        PBNavItem("Files")
      }
```

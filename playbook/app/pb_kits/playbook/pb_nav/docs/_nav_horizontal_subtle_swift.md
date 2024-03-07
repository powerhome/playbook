![nav-horizontal-subtle](https://github.com/powerhome/playbook/assets/54749071/e595cf20-f145-4e47-bb9a-d8dcdc217af7)

```swift
@State private var selectedHSubtle: Int = 1

PBNav(
        selected: $selectedHSubtle,
        variant: .subtle,
        orientation: .horizontal,
        borders: false
      ) {
        PBNavItem("Photos")
        PBNavItem("Music")
        PBNavItem("Video")
        PBNavItem("Files")
      }

```

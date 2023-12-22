![nav-horizontal-subtle-no-highlight](https://github.com/powerhome/playbook/assets/54749071/ee79fb55-8d5b-46b0-89aa-a310bf48dd19)

```swift
@State private var selectedHSubtleNoHighlight: Int = 1

 PBNav(
        selected: $selectedHSubtleNoHighlight,
        variant: .subtle,
        orientation: .horizontal,
        borders: false,
        highlight: false
      ) {
        PBNavItem("Photos")
        PBNavItem("Music")
        PBNavItem("Video")
        PBNavItem("Files")
      }
```

![button-reaction](https://github.com/powerhome/playbook/assets/54749071/10d21ee2-4faf-4c18-ab72-242df8f837c4)

```swift
@State private var count: Int = 153
@State private var count1: Int = 5

HStack(alignment: .center, spacing: 12) {
            PBReactionButton(
              count: $count,
              icon: "\u{1F389}",
              isInteractive: true
            )
            PBReactionButton(
              count: $count1,
              icon: "1️⃣",
              isInteractive: false
            )
            PBReactionButton(
              isInteractive: false
            )
            PBReactionButton(
              pbIcon: PBIcon(FontAwesome.user),
              isInteractive: false
            )
}
```

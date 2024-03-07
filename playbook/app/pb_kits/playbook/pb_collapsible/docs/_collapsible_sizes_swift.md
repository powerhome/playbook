![collapsible-sizes](https://github.com/powerhome/playbook/assets/54749071/557bfe16-26e4-4966-9f1c-689a2dc44412)

```swift
let iconSize: PBIcon.IconSize
let iconColor: CollapsibleIconColor
let text: String
@State private var isCollapsed = true
let lorem =
      "
      Group members... Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel erat sed purus hendrerit vive.
      Etiam nunc massa, pharetra vel quam id, posuere rhoncus quam. Quisque imperdiet arcu enim, nec aliquet justo.
      Praesent lorem arcu. Vivamus suscipit, libero eu fringilla egestas, orci urna commodo arcu, vel gravida turpis.
      "

PBCollapsible(isCollapsed: $isCollapsed, iconSize: iconSize, iconColor: iconColor) {
      VStack(spacing: Spacing.medium) {
            CollapsibleDoc(iconSize: .xSmall, text: "Extra Small Section")
            CollapsibleDoc(iconSize: .small, text: "Small Section")
            CollapsibleDoc(text: "Default Section")
            CollapsibleDoc(iconSize: .large, text: "Large Section")
          }
      } content: {
       Text(lorem).pbFont(.body)
      }

```

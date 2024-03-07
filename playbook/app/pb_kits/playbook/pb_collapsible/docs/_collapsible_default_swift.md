![collapsible-default](https://github.com/powerhome/playbook/assets/54749071/3e97095b-f6bb-45b7-bd33-99ebde0d40fd)


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
        CollapsibleDoc(text: "Main Section")
      } content: {
        Text(lorem).pbFont(.body)
      }

```

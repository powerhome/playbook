![collapsible-colors](https://github.com/powerhome/playbook/assets/54749071/daafd129-fd0a-4992-8fee-bfa55aed8a23)

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
            CollapsibleDoc(iconColor: .default, text: "Default Section")
            CollapsibleDoc(iconColor: .light, text: "Light Section")
            CollapsibleDoc(iconColor: .lighter, text: "Lighter Section")
            CollapsibleDoc(iconColor: .link, text: "Link Section")
            CollapsibleDoc(iconColor: .error, text: "Error Section")
            CollapsibleDoc(iconColor: .success, text: "Success Section")
          }
      } content: {
       Text(lorem).pbFont(.body)
      }

```

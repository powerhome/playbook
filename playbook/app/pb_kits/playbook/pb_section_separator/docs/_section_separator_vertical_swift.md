![section-separator-verticle](https://github.com/powerhome/playbook/assets/92755007/21ca54a5-6b8a-459f-91ad-4e9b68258f68)

```swift

let loremIpsum: some View = Text(
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididt labore et dolore"
)

HStack(spacing: Spacing.none) {
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididt labore et dolore"
  PBSectionSeparator(orientation: .vertical)
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididt labore et dolore"
}
.frame(maxWidth: .infinity)
.frame(height: 120, alignment: .center)
.listRowSeparator(.hidden)

```

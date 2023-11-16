

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
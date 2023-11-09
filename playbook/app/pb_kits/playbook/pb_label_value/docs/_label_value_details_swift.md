![label-value-details](https://github.com/powerhome/playbook/assets/92755007/bc1628f8-8698-4ac2-a236-d93687e6f165)

```swift

VStack(alignment: .leading, spacing: Spacing.small) {
  PBLabelValue(
    "Installer",
    variant: .details,
    icon: FontAwesome.truck,
    title: "JD Installations LLC"
  )

  PBLabelValue(
    "Project",
    variant: .details,
    icon: FontAwesome.home,
    description: "33-12345",
    title: "Jefferson-Smith"
  )

  PBLabelValue(
    "Project",
    variant: .details,
    icon: FontAwesome.home,
    description: "33-12345",
    title: "Jefferson-Smith",
    date: Date()
  )

  PBLabelValue(
    "Project",
    variant: .details,
    icon: FontAwesome.home,
    description: "33-12345",
    title: "Jefferson-Smith",
    date: Date(),
    active: true
  )
}

```

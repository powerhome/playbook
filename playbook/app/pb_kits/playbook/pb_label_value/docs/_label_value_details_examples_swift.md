![label-value-details](https://github.com/powerhome/playbook/assets/92755007/bc1628f8-8698-4ac2-a236-d93687e6f165)

```swift

VStack(alignment: .leading, spacing: Spacing.small) {
  Text("Patient Profile")
  .pbFont(.title4)
  .padding(.bottom, Spacing.xSmall)

  PBLabelValue(
    "Age",
    variant: .details,
    icon: FontAwesome.user,
    title: "24 yrs old"
  )

  PBLabelValue(
    "Blood",
    variant: .details,
    icon: FontAwesome.tint,
    title: "A +"
  )

  PBLabelValue(
    "Weight",
    variant: .details,
    icon: FontAwesome.weight,
    title: "91 kg"
  )

  PBLabelValue(
    "Height",
    variant: .details,
    icon: FontAwesome.arrowsAltV,
    title: "187 cm"
  )

  Text("Workout Schedule")
  .pbFont(.title4)
  .padding(.top, Spacing.large)
  .padding(.bottom, Spacing.xSmall)

  PBLabelValue(
    "Chest",
    variant: .details,
    icon: FontAwesome.dumbbell,
    description: "6 sets • 8 reps • 40-100 kg",
    title: "Bench Press",
    active: true
  )

  PBLabelValue(
    "Biceps",
    variant: .details,
    icon: FontAwesome.dumbbell,
    description: "5 sets • 12 reps • 20-40 kg",
    title: "Barbell Curl",
    active: true
  )

  PBLabelValue(
    "Back",
    variant: .details,
    icon: FontAwesome.dumbbell,
    description: "8 sets • 8 reps • 40-120 kg",
    title: "Back Squat",
    active: true
  )
}

```

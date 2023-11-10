```swift

VStack(alignment: .leading, spacing: Spacing.small) {
  PBMessage(
    avatar: AnyView(picAnna),
    label: "Anna Black",
    message: "How can we assist you today?",
    timestamp: Date().addingTimeInterval(-20)
  )

  PBMessage(
    avatar: AnyView(picPatric),
    label: "Patrick Welch",
    message: "We will escalate this issue to a Senior Support agent.",
    timestamp: Date().addingTimeInterval(-540),
    timestampAlignment: .leading
  )

  PBMessage(
    avatar: AnyView(picLuccile),
    label: "Lucille Sanchez",
    message: "Application for Kate Smith is waiting for your approval",
    timestamp: Date().addingTimeInterval(-200000)
  )

  PBMessage(
    avatar: AnyView(PBAvatar(name: "Beverly Reyes", size: .xSmall)),
    label: "Beverly Reyes",
    message: "We are so sorry you had a bad experience!",
    timestamp: Date().addingTimeInterval(-200000)
  )

  PBMessage(
    label: "Keith Craig",
    message: "Please hold for one moment, I will check with my manager.",
    timestamp: Date().addingTimeInterval(-200000)
  ) {}

  PBMessage(
    label: "Keith Craig",
    timestamp: Date().addingTimeInterval(-200000)
  ) {
    Image("Forest", bundle: .module).resizable().frame(width: 240, height: 240)
  }

  PBMessage(
    label: "Keith Craig",
    message: "Please hold for one moment, I will check with my manager.",
    timestamp: Date().addingTimeInterval(-200000)
  ) {
    Image("Forest", bundle: .module).resizable().frame(width: 240, height: 240)
  }
}

```
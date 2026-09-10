---
title: Swift Setup
icon: mobile
description: Finally a Design System built for SwiftUI. Get cross device consistency by using Playbook for SwiftUI.
---

Integrate Playbook's design system into your Swift app with the Playbook Swift package.

## Playbook Swift

Playbook Swift is the SwiftUI version of [Playbook](https://playbook.powerapp.cloud/), bringing Playbook designs to iOS and macOS. It is maintained in a [separate repository](https://github.com/powerhome/playbook-swift).

Built and maintained by the User Experience Team at [Power Home Remodeling](https://www.techatpower.com/).

## Installation

Follow the canonical steps in the upstream [Installation guide](https://github.com/powerhome/playbook-swift/blob/main/Installation.md). Summary:

### Prerequisites

- [Xcode 15](https://developer.apple.com/xcode/)
- [Homebrew](https://brew.sh/) (for contributor tooling such as pre-commit)

### Add via Swift Package Manager

1. In Xcode, add a package and search for: `git@github.com:powerhome/playbook-swift.git`
2. Choose **Add Package**
3. Choose **Packages > Resolve Package Versions**
4. In your Swift view file:

```swift
import Playbook
```

5. Build the project

You may also declare the package in a YAML packages configuration — see the [Installation guide](https://github.com/powerhome/playbook-swift/blob/main/Installation.md) for the exact snippet.

## Component examples

The Playbook Swift repo includes the `PlaybookShowcase` app with interactive examples of each component.

## Contributing

See the [contribution docs](https://github.com/powerhome/playbook-swift/blob/main/Contribution.md) in the Playbook Swift repository.

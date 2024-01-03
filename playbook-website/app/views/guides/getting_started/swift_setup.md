---
title: Swift Setup
icon: mobile
description: Finally a Design System built for SwiftUI. Get cross device consistency by using Playbook for SwiftUI.
---

Integrate Playbook's design system seamlessly into your Swift app with the Playbook Swift Package. Get started today with our easy-to-follow tutorial.

# Playbook Swift Design System 📱

Playbook Swift is the SwiftUI version of [Playbook](https://playbook.powerapp.cloud/), optimizing Playbook's designs for iOS & macOS apps. With Playbook Swift, all of Playbook's design components are now replicated for Apple's devices.

Built and maintained by the User Experience Team at [Power Home Remodeling](https://www.techatpower.com/).

## Installation

### Prerequisites

- [Xcode 15](https://developer.apple.com/xcode/)
- [Homebrew](https://brew.sh/)

### Playbook Swift can be added via the Swift Package Manager

1. Search for: `git@github.com:powerhome/PlaybookSwift.git`
1. Choose `Add Package`
2. Choose `Packages > Resolve Package Versions`
3. In your Swift view file:
    ```swift
    import Playbook
    ```
5. Build the project

### Install [`pre-commit`](https://pre-commit.com/#install) via `brew install pre-commit`
  1. In the Playbook Swift root directory, run `pre-commit install` to set up the git hook scripts

# Code Format & Linting

See the [Editing Linting, Formatting, and Auto Correction](LINTING.md) doc for more information.

## Component Examples via PlaybookShowcase

Playbook Swift contains the app named `PlaybookShowcase`; providing examples of each component. PlaybookShowcase can be launched within the XCode simulator, side-loaded, or downloaded to your device.

# Note: YAML Configuration Files

- You may need to add the package like so:

```yaml
packages:
  Playbook:
    url: git@github.com:powerhome/PlaybookSwift.git
    version x.x.x // Where x.x.x is the desired version
```
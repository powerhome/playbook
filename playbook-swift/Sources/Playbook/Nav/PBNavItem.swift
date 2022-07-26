//
//  File.swift
//  
//
//  Created by Lucas C. Feijo on 30/07/21.
//

import SwiftUI

public struct PBNavItem: View {

  @Environment(\.selected) var isSelected: Bool
  @Environment(\.hovering) var isHovering: Bool
  @Environment(\.variant) var variant: PBNav.Variant
  @Environment(\.orientation) var orientation: Orientation
  @Environment(\.highlight) var highlight: Bool

  // MARK: -

  var name: String
  var icon: PBIcon?
  var accessory: PBIcon?

  // MARK: -

  var hoverBackgroundColor: Color {
    if variant == .normal && orientation == .horizontal {
      return .clear
    }
    return .pbPrimary
  }

  var selectionIndicatorAlignment: Alignment {
    if orientation == .vertical {
      return .leading
    }
    return .bottom
  }

  var iconForegroundColor: Color {

    if variant == .normal && orientation == .horizontal {
      if isHovering {
        return .pbPrimary
      }
      return .pbTextDefault
    }

    if isSelected || isHovering {
      return .pbPrimary
    }
    return .pbTextLighter
  }

  var captionForegroundColor: Color {

    if variant == .normal && orientation == .horizontal {
      if isHovering {
        return .pbPrimary
      }
      return .pbTextDefault
    }

    if isSelected || isHovering {
      return .pbPrimary
    }
    return .pbTextDefault
  }

  var font: PBTextStyle {
    if variant == .normal, orientation == .horizontal {
      return selectedFont
    }
    if isSelected, variant == .normal {
      return selectedFont
    }
    return .body
  }

  var selectedFont: PBTextStyle {
    return .title4
  }

  var backgroundColor: Color {
    if isSelected, isHovering, highlight {
      return hoverBackgroundColor.opacity(0.08)
    }
    if (isSelected && orientation == .vertical) || isHovering {
      return hoverBackgroundColor.opacity(0.03)
    }
    return .clear
  }

  var cornerRadius: CGFloat {
    switch variant {
    case .normal:
      return 0
    case .subtle:
      return .pbXsmall
    }
  }

  var padding: CGFloat {
    switch variant {
    case .normal:
      return .pbSmall
    case .subtle:
      return .pbSmall * 0.7
    }
  }

  // MARK: -

  public init(_ name: String,
              icon: PBIcon? = nil,
              accessory: PBIcon? = nil) {
    self.name = name
    self.icon = icon
    self.accessory = accessory
  }

  // MARK: - Views

  var selectionIndicator: some View {
    Group {
      if orientation == .vertical {
        Rectangle()
          .frame(width: variant == .normal ? 3 : 0)
          .foregroundColor(isSelected ? .pbPrimary : .clear)
      } else {
        Rectangle()
          .frame(height: variant == .normal ? 3 : 0)
          .foregroundColor(isSelected ? .pbPrimary : .clear)
      }
    }
  }

  public var body: some View {
    HStack {
      icon
        .foregroundColor(iconForegroundColor)
        .frame(width: 30)
      Text(name)
        .foregroundColor(captionForegroundColor)
        .pbFont(font)

      if orientation == .vertical {
        Spacer()
      }

      accessory
        .foregroundColor(iconForegroundColor)
        .frame(width: 30)
    }
    .padding(padding)
    .background(backgroundColor)
    .cornerRadius(cornerRadius)
    .overlay(selectionIndicator,
             alignment: selectionIndicatorAlignment)
  }
}

private struct PBNavSelection: EnvironmentKey {
  static let defaultValue = false
}
private struct PBNavHovering: EnvironmentKey {
  static let defaultValue = false
}
private struct PBNavVariant: EnvironmentKey {
  static let defaultValue = PBNav.Variant.normal
}
private struct PBNavOrientation: EnvironmentKey {
  static let defaultValue = Orientation.vertical
}
private struct PBNavHighlight: EnvironmentKey {
  static let defaultValue = true
}

extension EnvironmentValues {
  var selected: Bool {
    get { self[PBNavSelection.self] }
    set { self[PBNavSelection.self] = newValue }
  }
  var hovering: Bool {
    get { self[PBNavHovering.self] }
    set { self[PBNavHovering.self] = newValue }
  }
  var variant: PBNav.Variant {
    get { self[PBNavVariant.self] }
    set { self[PBNavVariant.self] = newValue }
  }
  var orientation: Orientation {
    get { self[PBNavOrientation.self] }
    set { self[PBNavOrientation.self] = newValue }
  }
  var highlight: Bool {
    get { self[PBNavHighlight.self] }
    set { self[PBNavHighlight.self] = newValue }
  }
}

struct PBNavItem_Previews: PreviewProvider {
  static var previews: some View {
    registerFonts()

    let item = PBNavItem("Users Item",
                         icon: PBIcon.fontAwesome(.users))

    let allItemCombinations = Group {
      item
        .environment(\.selected, false)
        .environment(\.hovering, false)
      item
        .environment(\.selected, false)
        .environment(\.hovering, true)
      item
        .environment(\.selected, true)
        .environment(\.hovering, false)
      item
        .environment(\.selected, true)
        .environment(\.hovering, true)
    }

    return Group {
      HStack { allItemCombinations }
      .environment(\.variant, .normal)
      .environment(\.orientation, .horizontal)
      .previewDisplayName("Normal Variant Horizontal")

      HStack { allItemCombinations }
      .environment(\.variant, .subtle)
      .environment(\.orientation, .horizontal)
      .previewDisplayName("Subtle Variant Horizontal")

      VStack { allItemCombinations }
      .environment(\.variant, .normal)
      .previewDisplayName("Normal Variant")

      VStack { allItemCombinations }
      .environment(\.variant, .subtle)
      .previewDisplayName("Subtle Variant")
    }
    .frame(width: 500)
    .preferredColorScheme(.light)
    .background(Color.white)
  }
}

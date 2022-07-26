//
//  SwiftUIView.swift
//  
//
//  Created by Alexandre Hauber on 23/07/21.
//

import SwiftUI

public enum PBCardStyle {

  case `default`, selected, error

    var color: Color {
        switch self {
        case .`default`:
            return .pbBorder
        case .selected:
            return .pbPrimary
        case .error:
            return .pbError
        }
    }

    var lineWidth: CGFloat {
        switch self {
        case .`default`:
            return 1
        case .selected:
            return 1.6
        case .error:
            return 1
        }
    }
}

// MARK: -

public struct PBCard<Content: View>: View {

    // MARK: Props
    let content: Content // mandatory

    let alignment: Alignment
    let border: Bool
    let borderRadius: BorderRadius
    let highlight: Highlight
    let highlightColor: Color
    let isHovering: Bool
    let padding: CGFloat
    let style: PBCardStyle
    let shadow: Shadow
    let width: CGFloat? // .none for wrapping content
    //

    public init(alignment: Alignment = .leading, border: Bool = true, borderRadius: BorderRadius = .medium, highlight: Highlight = .none, highlightColor: Color = .pbWindows, isHovering: Bool = false, padding: CGFloat = .pbMedium, style: PBCardStyle = .default, shadow: Shadow = .none, width: CGFloat? = .infinity, @ViewBuilder content: () -> Content) {
        self.content = content()
        self.alignment = alignment
        self.border = border
        self.borderRadius = borderRadius
        self.highlight = highlight
        self.isHovering = isHovering
        self.padding = padding
        self.style = style
        self.shadow = shadow
        self.width = width
        if Color.pbStatusColors.contains(highlightColor) || Color.pbProductColors.contains(highlightColor) || Color.pbCategoryColors.contains(highlightColor) {
            self.highlightColor = highlightColor
        } else {
            self.highlightColor = .white
        }
    }

    public var body: some View {
        VStack(alignment: .leading, spacing: 0, content: {
            if highlight == .none {
                content
                    .padding(padding)
            } else {
                content
                    .padding(padding)
                    .frame(minWidth: 0, maxWidth: .infinity, alignment: alignment)
                    .background(RoundedRectangle(cornerRadius: borderRadius.rawValue)
                                    .stroke(highlightColor, lineWidth: 10)
                                    .padding(.init(top: highlight == .top ? 0 : -10,
                                                   leading: highlight == .side ? 0 : -10,
                                                   bottom: -10,
                                                   trailing: -10))
                    )
            }
        })
        .cornerRadius(borderRadius.rawValue)
        .frame(minWidth: 0, maxWidth: width, alignment: alignment)
        .background(RoundedRectangle(cornerRadius: borderRadius.rawValue, style: .continuous)
                        .fill(Color.pbCard.opacity(isHovering ? 0.4 : 1))
                        .pbShadow(color: shadow.color, radius: shadow.radius, deepest: shadow == .deepest)
        )
        .overlay(
            RoundedRectangle(cornerRadius: borderRadius.rawValue)
              .stroke(style.color,
                      lineWidth: border ? style.lineWidth : 0)
        )

    }
}

extension PBCard {
    public enum BorderRadius: CGFloat {
        case none    = 0
        case xSmall  = 2
        case small   = 4
        case medium  = 6
        case large   = 8
        case xLarge  = 12
        case rounded = 48
    }

    public enum Highlight {
        case none
        case side
        case top
    }

    public enum Shadow {
        case none
        case deep
        case deeper
        case deepest

        var color: Color {
            switch self {
            case .none: return Color.clear
            case .deep: return Color.pbShadow.opacity(0.74)
            default: return Color.pbShadow
            }
        }

        var radius: CGFloat {
            switch self {
            case .deep: return 4
            case .deeper: return 10
            default: return 14
            }
        }
    }
}

extension View {
    func pbShadow(color: Color, radius: CGFloat, deepest: Bool) -> some View {
        if deepest {
            return AnyView(self
                .shadow(color: color, radius: radius, x: 0, y: 10)
                .shadow(color: color, radius: radius, x: 0, y: 10)
            )
        } else {
            return AnyView(self
                .shadow(color: color, radius: radius, x: 0, y: 6))
        }
    }
}

// MARK: Preview
#if DEBUG || TEST
struct PBCard_Previews: PreviewProvider {
    static var previews: some View {
        registerFonts()

        let text = "Card Content"
        let loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec iaculis, risus a fringilla luctus, sapien eros sodales ex, quis molestie est nulla non turpis. Vestibulum aliquet at ipsum eget posuere. Morbi sed laoreet erat. Sed commodo posuere lectus, at porta nulla ornare a. "

        return Group {
            VStack(alignment: .leading, spacing: 8, content: {
                Text("Default").pbFont(.caption)
                PBCard {
                    Text(text).pbFont(.body)
                }
            }).padding().previewDisplayName("Default")

            VStack(alignment: .leading, spacing: 8, content: {
                Text("Highlight").pbFont(.caption)
                PBCard(highlight: .side) {
                    Text(text).pbFont(.body)
                }
                PBCard(highlight: .top, highlightColor: .pbWarning) {
                    Text(text).pbFont(.body)
                }
            }).padding().previewDisplayName("Highlight")

            VStack(alignment: .leading, spacing: 8, content: {
                Text("Header cards").pbFont(.caption)
                PBCard(padding: .pbNone) {
                    PBCardHeader {
                        Text(text).pbFont(.body).padding(.pbSmall)
                    }
                    Text(text).pbFont(.body).padding(.pbSmall)
                }
                PBCard(padding: .pbNone) {
                    PBCardHeader(color: .pbSiding) {
                        Text(text).pbFont(.body).padding(.pbSmall)
                    }
                    Text(text).pbFont(.body).padding(.pbSmall)
                }
            }).padding().previewDisplayName("Header cards")

            VStack(alignment: .leading, spacing: nil, content: {
                Text("Default").pbFont(.caption)
                PBCard {
                    Text(text).pbFont(.body)
                }
              Text("Selected").pbFont(.caption)
                PBCard(style: .selected) {
                    Text(text).pbFont(.body)
                }
              Text("Error").pbFont(.caption)
              PBCard(style: .error) {
                Text(text).pbFont(.body)
              }
            }).padding().previewDisplayName("Styles")

            VStack(alignment: .leading, spacing: 8, content: {
                Text("Padding size").pbFont(.caption)
                PBCard(padding: .pbNone) {
                    Text(text).pbFont(.body)
                }
                PBCard(padding: .pbXsmall) {
                    Text(text).pbFont(.body)
                }
                PBCard(padding: .pbSmall) {
                    Text(text).pbFont(.body)
                }
                PBCard(padding: .pbMedium) {
                    Text(text).pbFont(.body)
                }
                PBCard(padding: .pbLarge) {
                    Text(text).pbFont(.body)
                }
                PBCard(padding: .pbXlarge) {
                    Text(text).pbFont(.body)
                }
            }).padding().previewDisplayName("Padding size")

            VStack(alignment: .leading, spacing: 8, content: {
                Text("Shadow").pbFont(.caption)
                PBCard(shadow: .none) {
                    Text(text).pbFont(.body)
                }
                PBCard(shadow: .deep) {
                    Text(text).pbFont(.body)
                }.padding(.top, 25)
                PBCard(shadow: .deeper) {
                    Text(text).pbFont(.body)
                }.padding(.top, 25)
                PBCard(shadow: .deepest) {
                    Text(text).pbFont(.body)
                }.padding(.top, 25)
            }).padding().previewDisplayName("Shadow")

            VStack(alignment: .leading, spacing: 8, content: {
                Text("Separator & Content").pbFont(.caption)
                PBCard(padding: .pbNone) {
                    Text("Header").pbFont(.body).padding(.pbSmall)
                    PBSectionSeparator()
                    Text(loremIpsum).pbFont(.body).padding(.pbSmall)
                    PBSectionSeparator()
                    Text("Footer").pbFont(.body).padding(.pbSmall)
                }
            }).padding().previewDisplayName("Separator & Content")

            VStack(alignment: .leading, spacing: 8, content: {
                Text("No border & border radius").pbFont(.caption)
                PBCard(border: false) {
                    Text(text).pbFont(.body)
                }

                PBCard(borderRadius: .none) {
                    Text(text).pbFont(.body)
                }
                PBCard(borderRadius: .xSmall) {
                    Text(text).pbFont(.body)
                }
                PBCard(borderRadius: .small) {
                    Text(text).pbFont(.body)
                }
                PBCard(borderRadius: .medium) {
                    Text(text).pbFont(.body)
                }
                PBCard(borderRadius: .large) {
                    Text(text).pbFont(.body)
                }
                PBCard(borderRadius: .xLarge) {
                    Text(text).pbFont(.body)
                }
                PBCard(borderRadius: .rounded) {
                    Text(text).pbFont(.body)
                }
            }).padding().previewDisplayName("No border & border radius")

            VStack(alignment: .leading, spacing: 0, content: {
                PBCard(padding: .pbNone) {
                    PBCardHeader(color: .pbWindows) {
                        Text("Andrew").foregroundColor(.pbTextLighter).pbFont(.body).padding(.pbSmall)
                    }
                    Image("andrew", bundle: .module).resizable().frame(height: 240)
                    Text(loremIpsum).pbFont(.caption).padding(.pbSmall)
                    PBSectionSeparator()
                    Text("A nice guy and great dev").pbFont(.body).padding(.pbSmall)
                }
            }).frame(width: 240).previewDisplayName("Image")
        }
    }
}
#endif

//
//  Typography.swift
//  
//
//  Created by Lucas C. Feijo on 14/07/21.
//

import SwiftUI

public struct Typography: ViewModifier {
    var style: PBTextStyle
    var variant: Variant = .none
    var color: Color = .pbTextDefault

    // if color is not allowed, return the default for the style
    var foregroundColor: Color {
        if !Color.pbTextColors.contains(color) {
            switch style {
            case .title4:
                return variant == .link ? .pbPrimary : .pbTextDefault
            case .subcaption:
                return variant == .link ? .pbPrimary : .pbTextLight
            case .caption, .largeCaption:
                return .pbTextLight
            default:
                return .pbTextDefault
            }
        } else {
            if [.title4, .subcaption].contains(style), variant == .link {
                return .pbPrimary
            } else {
                return color
            }
        }
    }

    // We don't have access to the UIFont.lineHeight here
    // which is needed to calculate the spacing between lines
    // so we tested values that replicate the desired lineHeights.
    var spacing: CGFloat {
        switch style {
        case .title1:           return 3
        case .title2:           return -1
        case .title3, .title4:  return 2
        case .body:             return 0
        default:                return 6
        }
    }

    var casing: Text.Case? {
        switch style {
        case .largeCaption, .caption: return .uppercase
        default: return nil
        }
    }

    public func body(content: Content) -> some View {
        content
            .font(.pb(style))
            .foregroundColor(foregroundColor)
            .lineSpacing(spacing) // Only works between lines in a paragraph.
            .padding(.vertical, spacing) // Adds the space around the text block.
            .textCase(casing)
    }
}

public extension Typography {
    enum Variant {
        case none
        case link
    }
}

public extension View {
    
    func pbFont(_ style: PBTextStyle,
                variant: Typography.Variant = .none,
                color: Color = .pbTextDefault) -> some View {

        self.modifier(Typography(style: style,
                                 variant: variant,
                                 color: color))
    }
}

struct Typography_Previews: PreviewProvider {
    static var previews: some View {
        registerFonts()

        return Group {
            VStack {
                Text("Title 1\nTitle 1")
                    .pbFont(.title1)
                Text("Title 2\nTitle 2")
                    .pbFont(.title2)
                Text("Title 3\nTitle 3")
                    .pbFont(.title3)
                Text("Title 4\nTitle 4")
                    .pbFont(.title4)
                Text("Title 4 Link Variant")
                    .pbFont(.title4, variant: .link)
            }
            VStack {
                Text("Body: The quick brown fox jumps over the lazy dog")
                    .pbFont(.body)
            }
            VStack {
                Text("Button Text")
                    .pbFont(.buttonText)
            }
            VStack {
                Text("Large Caption")
                    .pbFont(.largeCaption)
                Text("Caption")
                    .pbFont(.caption)
                Text("Subcaption")
                    .pbFont(.subcaption)
                Text("Subcaption Link Variant")
                    .pbFont(.subcaption, variant: .link)
            }
//            .environment(\.sizeCategory, .accessibilityExtraExtraExtraLarge)

        }
    }
}

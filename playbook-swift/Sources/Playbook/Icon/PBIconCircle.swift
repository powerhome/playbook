//
//  PBIconCircle.swift
//  
//
//  Created by Alexandre da Silva on 08/12/21.
//

import SwiftUI
// import Playbook

public struct PBIconCircle: View {

    // MARK: Props
    var icon: PlaybookGenericIcon
    var size: PBIcon.Size
    var color: Color

    public init(_ icon: PlaybookGenericIcon, size: PBIcon.Size = .medium, color: Color = .pbPrimary) {
        self.icon = icon
        self.size = size
        self.color = color
    }

    // MARK: View
    public var body: some View {
        ZStack {
            PBIcon(icon, size: size)
                .iconCircle(diameter: size.fontSize * 2.4, color: color)
        }
    }
}

// MARK: ViewModifier
private struct IconCircle: ViewModifier {
    var diameter: CGFloat
    var color: Color

    func body(content: Content) -> some View {
        content
            .foregroundColor(color)
            .frame(width: diameter,
                   height: diameter,
                   alignment: .center)
            .background(color.opacity(0.12))
            .cornerRadius(diameter/2)
    }
}

fileprivate extension View {
    func iconCircle(diameter: CGFloat, color: Color) -> some View {
        self.modifier(IconCircle(diameter: diameter, color: color))
    }
}

// MARK: Preview
#if DEBUG || TEST
struct PBIconCircle_Previews: PreviewProvider {
    static var previews: some View {
        registerFonts()

        return VStack {
            HStack {
                PBIconCircle(FontAwesome.rocket, size: .small)
                PBIconCircle(FontAwesome.rocket, size: .small, color: .pbRed)
                PBIconCircle(FontAwesome.rocket, size: .small, color: .pbYellow)
            }
            HStack {
                PBIconCircle(FontAwesome.rocket)
                PBIconCircle(FontAwesome.rocket, color: .pbRed)
                PBIconCircle(FontAwesome.rocket, color: .pbYellow)
            }
            HStack {
                PBIconCircle(FontAwesome.rocket, size: .large)
                PBIconCircle(FontAwesome.rocket, size: .large, color: .pbRed)
                PBIconCircle(FontAwesome.rocket, size: .large, color: .pbYellow)
            }
            HStack {
                PBIconCircle(FontAwesome.rocket, size: .x3)
                PBIconCircle(FontAwesome.rocket, size: .x3, color: .pbRed)
                PBIconCircle(FontAwesome.rocket, size: .x3, color: .pbYellow)
            }
        }
        .padding()
        .background(Color.pbCard)
        .previewDisplayName("IconCircles")
    }
}
#endif

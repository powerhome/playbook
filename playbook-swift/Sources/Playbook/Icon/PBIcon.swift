//
//  Icon.swift
//
//
//  Created by Lucas C. Feijo on 15/07/21.
//

import SwiftUI

public protocol PlaybookGenericIcon {
    var unicodeString: String { get }
    var fontFamily: String { get }
}

public struct PBIcon: View {

    // MARK: Props
    var icon: PlaybookGenericIcon
    var size: Size
    //

    public init(_ icon: PlaybookGenericIcon,
                size: Size = .medium) {
        self.size = size
        self.icon = icon
    }

    public var body: some View {
        Text(icon.unicodeString)
            .font(Font.custom(icon.fontFamily, size: size.fontSize))
    }
}

extension PBIcon {
    public enum Size {
        /// 16
        case small
        /// 20
        case medium
        /// 24
        case large

        // swiftlint:disable identifier_name
        case x1
        case x2
        case x3
        case x4
        case x5
        case x6
        case x7
        case x8
        case x9
        case x10

        var fontSize: CGFloat {
            let emToPt: CGFloat = 11.955168

            switch self {
            case .small: return 16
            case .medium: return 20
            case .large: return 24

            case .x1: return 1 * emToPt
            case .x2: return 2 * emToPt
            case .x3: return 3 * emToPt
            case .x4: return 4 * emToPt
            case .x5: return 5 * emToPt
            case .x6: return 6 * emToPt
            case .x7: return 7 * emToPt
            case .x8: return 8 * emToPt
            case .x9: return 9 * emToPt
            case .x10: return 10 * emToPt
            }
        }
    }
}

#if DEBUG || TEST
struct PBIcon_Previews: PreviewProvider {
    static var previews: some View {
        registerFonts()

        return Group {
            VStack {
                VStack {
                    PBIcon.fontastic(.smilePlus)
                    PBIcon.fontAwesome(.user)
                    PBIcon(FontAwesome.lock)
                    PBIcon.fontAwesome(.user, size: .large)
                }
                .padding(.bottom, 20)
                VStack {
                    PBIcon.fontAwesome(.user, size: .x1)
                    PBIcon.fontAwesome(.user, size: .x2)
                    PBIcon.fontAwesome(.user, size: .x3)
                    PBIcon.fontAwesome(.user, size: .x4)
                    PBIcon.fontAwesome(.user, size: .x5)
                    PBIcon.fontAwesome(.user, size: .x6)
                    PBIcon.fontAwesome(.user, size: .x7)
                    PBIcon.fontAwesome(.user, size: .x8)
                    PBIcon.fontAwesome(.user, size: .x9)
                    PBIcon.fontAwesome(.user, size: .x10)
                }
            }.previewDisplayName("Icons")
        }
    }
}
#endif
